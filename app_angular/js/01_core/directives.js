(function() {
    angular.module('app.directives', [])
        .directive('headerUser', function() {
            return {

                restrict: 'E',
                link: function(scope, element, attrs) {

                    attrs.$observe('data', function(val) {
                        var data = angular.fromJson(eval(val));
                        scope.data = data;
                    });

                    scope.dashboardItem = attrs["dashboardItem"];

                },
                templateUrl: '/js/01_core/partials/header-user.html?V=' + Math.random()
            };
        })
        .directive('formInforme', function() {
            return {

                restrict: 'E',
                link: function(scope, element, attrs) {


                },
                templateUrl: '/js/01_core/partials/formulario-informe.html?V=' + Math.random()
            };
        })
        .directive('formUsuario', function() {
            return {

                restrict: 'E',
                link: function(scope, element, attrs) {


                },
                templateUrl: '/js/01_core/partials/formulario-usuario.html?V=' + Math.random()
            };
        })
        .directive('widgetCalendario', ['$filter', 'entornoService', function($filter, entornoService) {

            return {

                restrict: 'AE',
                scope: {
                    arrayCalendario: '@data'
                },
                link: function(scope, element, attrs) {

                    var eventDates = {};

                    // Inicalizo calendario
                    $('.ui-datepicker').empty();
                    $('#ui-datepicker-div').remove();
                    var widget = $(element);
                    var calNotes = $(".cal-notes", widget);
                    var calNotesDay = $(".day", calNotes);
                    var calNotesDate = $(".date", calNotes);


                    //Calculate the weekday name
                    var d = new Date();
                    var weekday = new Array(7);
                    weekday[0] = "Domingo";
                    weekday[1] = "Lunes";
                    weekday[2] = "Martes";
                    weekday[3] = "Miércoles";
                    weekday[4] = "Jueves";
                    weekday[5] = "Viernes";
                    weekday[6] = "Sábado";

                    var weekdayName = weekday[d.getDay()];

                    calNotesDay.html(weekdayName);

                    //Calculate the month name
                    var month = new Array();
                    month[0] = "Enero";
                    month[1] = "Febrero";
                    month[2] = "Marzo";
                    month[3] = "Abril";
                    month[4] = "Mayo";
                    month[5] = "Junio";
                    month[6] = "Julio";
                    month[7] = "Agosto";
                    month[8] = "Septiembre";
                    month[9] = "Octubre";
                    month[10] = "Noviembre";
                    month[11] = "Diciembre";

                    var monthName = month[d.getMonth()];
                    var monthDay = d.getDate();

                    calNotesDate.html(monthName + " " + monthDay);

                    if (typeof jQuery.ui != 'undefined') {

                        $(".ui-datepicker").datepicker({

                            dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
                            dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
                            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                                "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                            ],
                            monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
                                "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
                            ],

                            onSelect: function(s, o) {

                                var sd = new Date(s);

                                var weekdayName = weekday[sd.getDay()];
                                var monthName = month[sd.getMonth()];
                                var monthDay = sd.getDate();

                                // Lleno en campos
                                calNotesDay.html(weekdayName);
                                calNotesDate.html(monthName + " " + monthDay);

                                // consulto comunicaciones

                                var arrComunicacione = $filter('filter')((typeof scope.arrayCalendario == "string") ? JSON.parse(scope.arrayCalendario) : scope.arrayCalendario, { 'fechaComunicacion': $filter('date')(sd, 'yyyy-MM-dd') });

                                scope.itemComunicacion = arrComunicacione;
                                scope.$apply();

                            },
                            onChangeMonthYear: function(year, month, widget) {
                                // Decalracion de variables
                                scope.itemComunicacion = {};
                                scope.$apply();

                                var date = new Date();
                                var primerDia = new Date(year, month, 1);
                                var ultimoDia = new Date(year, month + 1, 0)


                                var calendarioDese = year + '-' + month + '-' + primerDia.getDate();
                                var calendarioHast = year + '-' + month + '-' + ultimoDia.getDate();

                                var param = { 'camposFiltro': '{"calendarioSoloFechaDesde":"' + calendarioDese + '","calendarioSoloFechaHasta":"' + calendarioHast + '"}', 'datosPorFecha': 'S', 'datosTexto': 'S' };

                                entornoService.getCalendar(param).then(function(data) {
                                    scope.arrayCalendario = data.data.data;
                                }, function(reason) {
                                    console.log(reason);
                                });
                            }

                        });
                    }

                    scope.$watch('arrayCalendario', function() {
                        // Recorre Subordinados
                        if (scope.arrayCalendario != "") {
                            if (typeof scope.arrayCalendario == "string") {
                                var arrComunicacione = $filter('filter')(JSON.parse(scope.arrayCalendario), { 'fechaComunicacion': $filter('date')(new Date(), 'yyyy-MM-dd') });
                                scope.itemComunicacion = arrComunicacione;

                                angular.forEach((typeof scope.arrayCalendario == "string") ? JSON.parse(scope.arrayCalendario) : scope.arrayCalendario, function(value, key) {
                                    eventDates[new Date($filter('date')(value.fechaComunicacion, 'MM/dd/yyyy'))] = {
                                        'date': new Date($filter('date')(value.fechaComunicacion, 'MM/dd/yyyy')),
                                        'tipo': value.comunicaciones[0].calendarioTipo,
                                        'total': Object.keys(value.comunicaciones).length
                                    };
                                });

                                $(".ui-datepicker").datepicker('option', 'beforeShowDay',
                                    function(date) {
                                        var highlight = eventDates[date];
                                        if (highlight) {

                                            return [true, 'event' + ((eventDates[date].total > 1) ? 'M' : eventDates[date].tipo), ''];
                                        } else {
                                            return [true, ''];
                                        }
                                    }
                                );
                            } else if (typeof scope.arrayCalendario == "object") {
                                angular.forEach((typeof scope.arrayCalendario == "string") ? JSON.parse(scope.arrayCalendario) : scope.arrayCalendario, function(value, key) {
                                    eventDates[new Date($filter('date')(value.fechaComunicacion, 'MM/dd/yyyy'))] = {
                                        'date': new Date($filter('date')(value.fechaComunicacion, 'MM/dd/yyyy')),
                                        'tipo': value.comunicaciones[0].calendarioTipo
                                    };
                                });

                                $(".ui-datepicker").datepicker('refresh');
                            }
                        }
                    });

                    scope.levantaItemCalendar = function(item) {
                        scope.tituloItemCalendar = item.calendarioTitulo;
                        scope.textoItemCalendar = item.calendarioTexto;

                        $("#textInfoCale").empty();
                        $("#textInfoCale").html(scope.textoItemCalendar);

                        $('#info-calendario').niftyModal('show');
                    }
                },
                templateUrl: '/js/01_core/partials/widget-calendario.html?V=' + Math.random()
            };
        }])
        .directive('onFinishRender', ['$timeout', '$parse', function($timeout, $parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function() {
                            scope.$emit('ngRepeatFinished');
                            if (!!attr.onFinishRender) {
                                $parse(attr.onFinishRender)(scope);
                            }
                        });
                    }
                }
            }
        }])
        .directive('afterRender', ['$timeout', function($timeout) {
            var def = {
                restrict: 'A',
                terminal: true,
                transclude: false,
                link: function(scope, element, attrs) {
                    $timeout(scope.$eval(attrs.afterRender), 0); //Calling a scoped method
                }
            };
            return def;
        }])
        .directive('fileModel', ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function() {
                        scope.$apply(function() {
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }])
        .directive('datetimepicker', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    element.datetimepicker({

                        autoclose: true,
                        componentIcon: '.s7-date',
                        navIcons: {
                            rightIcon: 's7-angle-right',
                            leftIcon: 's7-angle-left'
                        }
                        //language: 'sp'
                    }).on('changeDate', function(e) {
                        /* scope.$apply(function (scope) {
                         //scope.onChange(e.date);
                         })*/
                    });

                }
            }
        })
        .directive('wizard', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {



                    if (attrs.show == 'S') {
                        // https://github.com/amoffat/bootstrap-application-wizard/tree/bootstrap-3
                        /*var wizard = $(element).wizard({
                            keyboard: false,
                            contentHeight: 500,
                            contentWidth: "100%",
                            backdrop: 'static',
                            buttons: { nextText: "Siguiente", backText: "Anterior" }
                        });

                        wizard.cards["name"].on("validate", function(card) {

                            return scope.$parent.accion('AU', '1', 'banderaDP');

                        });

                        wizard.cards["group"].on("validate", function(card) {

                            return scope.$parent.accion('AC', '2', 'banderaCF');

                        });

                        wizard.cards["services"].on("validate", function(card) {

                            return scope.$parent.accion('AU', '3', 'banderaCE');

                        });

                        if (scope.$parent.GlbUsuario.usuarioCodigoCampana == 0) {

                            wizard.cards["password"].on("validate", function(card) {

                                return scope.$parent.accion('AU', '4', 'banderaPA');

                            });

                        }

                        wizard.on("submit", function(wizard) {


                            setTimeout(function() {
                                wizard.trigger("success");
                                wizard.hideButtons();
                                wizard._submitting = false;
                                wizard.showSubmitCard("success");
                                wizard.updateProgressBar(0);
                            }, 2000);
                        });*/

                        /*wizard.el.find(".wizard-success .im-done").click(function() {
                            scope.$parent.GlbUsuario.usuarioDebeActualizar = 'N';
                            
                            wizard.hide();

                        });

                        $(".wizard-close").hide()*/

                        var dispositivo = navigator.userAgent.toLowerCase();
                        if (dispositivo.search(/iphone|ipod|ipad|android/) > -1) {

                        } else {
                            //scope.$parent.GlbUsuario.usuarioDebeActualizar = 'S';
                            //wizard.show();

                            $("#satellite-wizard").modal({ keyboard: false });
                            $("#satellite-wizard").modal('show');
                            $('#satellite-wizard').unbind('click');

                        }
                    }

                }
            };
        })
        .directive('hmRead', function() {
            return {
                restrict: 'AE',
                scope: {
                    hmtext: '@',
                    hmlimit: '@',
                    hmfulltext: '@',
                    hmMoreText: '@',
                    hmLessText: '@',
                    hmMoreClass: '@',
                    hmLessClass: '@'
                },
                templateUrl: '/js/01_core/directives/template.html',
                controller: function($scope) {
                    $scope.toggleValue = function() {

                        if ($scope.hmfulltext == true)
                            $scope.hmfulltext = false;
                        else if ($scope.hmfulltext == false)
                            $scope.hmfulltext = true;
                        else
                            $scope.hmfulltext = true;
                    }
                }
            };
        })
        .directive('chartgraf', function() {
            return {
                restrict: 'AC',
                link: function(scope, element, attrs) {

                    var items = ['#800080', '#FF8000', '#008000', '#000080', '#ef6262', '#ffcf66', '#56c3e7'];
                    var item = items[Math.floor(Math.random() * items.length)];

                    var pValKey = attrs.percent;

                    if (isNaN(pValKey)) {
                        var res = pValKey.split(".");

                        if (res.length == 2) {
                            scope.$parent[res[0]].$watch(res[1], function(n, o) {


                                $(element).easyPieChart({
                                    easing: 'easeOutElastic',
                                    delay: 3000,
                                    barColor: (typeof attrs.color == "undefined") ? item : attrs.color,
                                    /*function(percent) {
                                                                         percent /= 100;
                                                                         return "rgb(" + Math.round(255 * (1-percent)) + ", " + Math.round(255 * percent) + ", 0)";
                                                                         },*/
                                    trackColor: '#e0e0e0',
                                    animate: 200,
                                    //scaleColor: false,
                                    lineWidth: (typeof attrs.linewidth == "undefined") ? 8 : attrs.linewidth,
                                    trackWidth: 8,
                                    size: (typeof attrs.size == "undefined") ? 80 : attrs.size
                                }).data('easyPieChart').update(scope.$parent[res[0]][res[1]]);
                            })
                        } else if (res.length == 1) {
                            scope.$watch(scope.$parent[res[0]], function(n, o) {


                                $(element).easyPieChart({
                                    easing: 'easeOutElastic',
                                    delay: 3000,
                                    barColor: (typeof attrs.color == "undefined") ? item : attrs.color,
                                    /*function(percent) {
                                                                         percent /= 100;
                                                                         return "rgb(" + Math.round(255 * (1-percent)) + ", " + Math.round(255 * percent) + ", 0)";
                                                                         },*/
                                    trackColor: '#e0e0e0',
                                    animate: 200,
                                    //scaleColor: false,
                                    lineWidth: (typeof attrs.linewidth == "undefined") ? 8 : attrs.linewidth,
                                    trackWidth: 8,
                                    size: (typeof attrs.size == "undefined") ? 80 : attrs.size
                                }).data('easyPieChart').update(scope.$parent[res[0]]);
                            })
                        }

                    } else {
                        scope.$watch(pValKey, function(n, o) {

                            $(element).easyPieChart({
                                easing: 'easeOutElastic',
                                delay: 3000,
                                barColor: (typeof attrs.color == "undefined") ? item : attrs.color,
                                trackColor: '#e0e0e0',
                                animate: 200,
                                //scaleColor: false,
                                lineWidth: (typeof attrs.linewidth == "undefined") ? 8 : attrs.linewidth,
                                trackWidth: 8,
                                size: (typeof attrs.size == "undefined") ? 80 : attrs.size
                            }).data('easyPieChart').update(pValKey);
                        })

                    }
                }
            };
        }).directive("mwConfirmClick", [
            function() {
                return {
                    priority: -1,
                    restrict: 'A',
                    scope: { confirmFunction: "&mwConfirmClick" },
                    link: function(scope, element, attrs) {
                        element.bind('click', function(e) {
                            // message defaults to "Are you sure?"
                            var message = attrs.mwConfirmClickMessage ? attrs.mwConfirmClickMessage : "Are you sure?";
                            // confirm() requires jQuery
                            if (confirm(message)) {
                                scope.confirmFunction();
                            }
                        });
                    }
                }
            }
        ]).directive('passwordStrength', [
            function() {
                return {
                    require: 'ngModel',
                    restrict: 'E',
                    scope: {
                        password: '=ngModel'
                    },

                    link: function(scope, elem, attrs, ctrl) {
                        scope.$watch('password', function(newVal) {

                            /* scope.strength = isSatisfied(newVal && newVal.length >= 8) +
                                isSatisfied(newVal && /[A-z]/.test(newVal)) +
                                isSatisfied(newVal && /(?=.*\W)/.test(newVal)) +
                                isSatisfied(newVal && /\d/.test(newVal)); */

                            scope.strength = isSatisfied(newVal && newVal.length >= 8) +
                                isSatisfied(newVal && /[A-z]/.test(newVal)) +
                                isSatisfied(newVal && /(?=.*\W)/.test(newVal)) +
                                isSatisfied(newVal && /\d/.test(newVal));

                            function isSatisfied(criteria) {
                                return criteria ? 1 : 0;
                            }
                        }, true);
                    },
                    template: '<div class="progress">' +
                        '<div class="progress-bar progress-bar-danger" style="width: {{strength >= 1 ? 25 : 0}}%"></div>' +
                        '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 2 ? 25 : 0}}%"></div>' +
                        '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 3 ? 25 : 0}}%"></div>' +
                        '<div class="progress-bar progress-bar-success" style="width: {{strength >= 4 ? 25 : 0}}%"></div>' +
                        '</div>'
                }
            }
        ])
        .directive('patternValidator', [
            function() {
                return {
                    require: 'ngModel',
                    restrict: 'A',
                    link: function(scope, elem, attrs, ctrl) {
                        ctrl.$parsers.unshift(function(viewValue) {

                            var patt = new RegExp(attrs.patternValidator);

                            var isValid = patt.test(viewValue);

                            ctrl.$setValidity('passwordPattern', isValid);

                            console.log(isValid, viewValue, attrs.patternValidator);

                            // angular does this with all validators -> return isValid ? viewValue : undefined;
                            // But it means that the ng-model will have a value of undefined
                            // So just return viewValue!
                            return viewValue;

                        });
                    }
                };
            }
        ]);

    /*$('#satellite-wizard').wizard({
     keyboard: false,
     contentHeight: 500,
     contentWidth: 1200,
     backdrop: 'static'
     });*/

})();