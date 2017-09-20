String.prototype.replaceArray = function(find, replace) {
    var replaceString = this;
    var regex;
    for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], "g");
        replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
};

(function() {

    angular.module('app.filters', [])
        .filter('normalize', function() {
            return function(input) {
                if (!input) return "";

                input = input
                    .replace('♀', 'f')
                    .replace('♂', 'm')
                    .replace(/\W+/g, "");
                return input.toLowerCase();
            };
        })

    .filter('imageify', ['$filter', function($filter) {
            return function(input) {
                var url = "img/" + $filter('normalize')(input) + ".jpg";
                return url;
            };
        }])
        .filter('keylength', function() {
            return function(input) {
                if (angular.isObject(input)) {
                    return Object.keys(input).length;
                } else return 0;

            }
        })
        .filter('num', function() {

            return function(input) {
                return parseInt(input, 10);
            }
        })
        .filter('float', function() {

            return function(input) {
                return parseFloat(input, 10);
            }
        })
        .filter('formatValor', function() {

            return function(input) {

                return ((input == 'null' || input == null) ? '--' : input);
            }
        })
        .filter('logomenu', function() {

            return function(input) {

                if (input == 'misdatos') return 's7-id';
                else if (input == 'miperfil') return 's7-user';
                else if (input == 'miequipo') return 's7-users';
                else if (input == 'rolpagos') return 's7-news-paper';
                else if (input == 'vacaciones') return 's7-map-2';
                else if (input == 'desempeno') return 's7-note2';
                else if (input == 'dashboard') return 's7-monitor';
                else if (input == 'permisos') return 's7-car';
                else if (input == 'flextime') return 's7-timer';
                else if (input == 'organigrama') return 's7-network';
                else if (input == 'seleccion') return 's7-users';
                else if (input == 'beneficios') return 's7-smile';
                else if (input == 'capacitacion') return 's7-study';
                else if (input == '-28') return 'fa fa-phone';
                else if (input == '-29') return 'fa fa-file-text-o';
                else if (input == '-30') return 'fa fa-question';
                else if (input == '-31') return 'fa fa-retweet';
            }
        })

    .filter('daysinmonth', function() {

        return function(humanMonth, year) {
            return new Date(year || new Date().getFullYear(), humanMonth, 0).getDate();
        }
    })

    .filter('loginmenu', function() {

        return function(input) {

            if (input == 1) return 's7-monitor';
            else if (input == 2) return 's7-id';
            else if (input == "empresa") return 's7-culture';
        }
    })

    .filter('greaterThan', function() {
            return function(input, media) {
                var filteredAmount = [];
                angular.forEach(input, function(item) {
                    if (item.valor != null && item.valor > 3 && item.valor > media)
                        filteredAmount.push(item);
                });
                //return filteredAmount.length > 0 ? filteredAmount : input
                return filteredAmount;
            };
        })
        .filter('lessThan', function() {
            return function(input, media) {
                var filteredAmount = [];
                angular.forEach(input, function(item) {
                    if (item.valor != null && item.valor <= media)
                        filteredAmount.push(item);
                });

                //return filteredAmount.length > 0 ? filteredAmount : input
                return filteredAmount;
            };
        })
        .filter('greaterThanDash', function() {
            return function(input, media) {

                var filteredAmount = [];
                angular.forEach(input, function(item) {
                    if (item.valor != null && item.promedio > 3 && item.promedio > media)
                        filteredAmount.push(item);
                });
                //return filteredAmount.length > 0 ? filteredAmount : input
                return filteredAmount;
            };
        })
        .filter('trusted', ['$sce', function($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl(url);
            };
        }])
        .filter('lessThanDash', function() {
            return function(input, media) {
                var filteredAmount = [];
                angular.forEach(input, function(item) {
                    if (item.valor != null && item.promedio <= media)
                        filteredAmount.push(item);
                });

                //return filteredAmount.length > 0 ? filteredAmount : input
                return filteredAmount;
            };
        })
        .filter('getValidaImagen', function() {
            return function(foto, valida, genero) {
                portada = '/assets/img/profile.jpg';
                usuarioMasculino = '/assets/img/avatar.jpg';
                usuarioFemenino = '/assets/img/avatar_f.jpg';
                r = foto;

                if (valida == 'U' && foto == '') {
                    if (typeof genero == "undefined")
                        r = usuarioMasculino;
                    else {
                        if (genero == 'M') r = usuarioMasculino;
                        else r = usuarioFemenino;
                    }
                } else if (valida == 'P' && foto == '')
                    r = portada;

                return r;
            };
        })


    .filter('getGET', function() {
            return function() {
                var loc = document.location.href;
                var getString = loc.split('?')[1];

                if (getString == undefined) {
                    return '';
                } else {
                    var GET = getString.split('&');
                    var get = {}; //this object will be filled with the key-value pairs and returned.

                    for (var i = 0, l = GET.length; i < l; i++) {
                        var tmp = GET[i].split('=');
                        get[tmp[0]] = unescape(decodeURI(tmp[1]));
                    }
                    return get;
                }



            };
        })
        .filter('getNombrePropio', function() {
            return function(input_texto, input_estricto) {


                // inicializacion de variables (aumento un espacio para la ultima palabra)
                var varTexto = $.trim(input_texto) + " ";
                var varTextoFormato = "";

                // recorre el texto buscando espacios y el caracter proximo lo pone en mayuscula
                var varPosiInic = 0;
                var varLength = varTexto.length;


                while (varPosiInic < varLength) {
                    varPosiFina = varTexto.indexOf(" ", varPosiInic);
                    varParteTexto = varTexto.substr(varPosiInic, (varPosiFina - varPosiInic));
                    varTextoFormato = varTextoFormato + varParteTexto.substr(0, 1).toUpperCase() + varParteTexto.substr(1, varParteTexto.length).toLowerCase() + " ";
                    varPosiInic = varPosiFina + 1;
                }

                if (!input_estricto) {
                    cadBuscar = [" La ", " Las ", " El ", " Los ", " Del ", " De ", " Y ", " En ", " Lo ", " Da ", " Al ", " At ", " E ", " Para "];
                    cadPoner = [" la ", " las ", " el ", " los ", " del ", " de ", " y ", " en ", " lo ", " da ", " al ", " at ", " e ", " para "];
                    varTextoFormato = varTextoFormato.replaceArray(cadBuscar, cadPoner);
                }

                // devuelve el texto formateado con mayusculas y minusculas
                return $.trim(varTextoFormato);

            };
        })
        .filter('benedicioicono', function() {

            return function(input) {

                if (input == 1) return 's7-drop';
                else if (input == 1) return 's7-science';
                else return 's7-car';
            }
        })
        .filter('niveleducacion', function() {

            return function(input) {

                if (input == 'P') return 'Primario';
                else if (input == 'C') return 'Ciclo Basico';
                else if (input == 'S') return 'Secundario';
                else if (input == 'B') return 'Bachillerato';
                else if (input == 'I') return 'Intermedio';
                else if (input == 'U') return 'Universitario';
                else if (input == 'O') return 'Postgrado';
                else if (input == 'M') return 'Masterado';
                else return '--';
            }
        })
        .filter('nombrenivelcompetencia', function() {

            return function(input) {

                if (input == 1) return 'Malo';
                else if (input == 2) return 'Regular';
                else if (input == 3) return 'Bueno';
                else if (input == 4) return 'Muy Bueno';
                else return '--';
            }
        })
        .filter('logoLogin', function() {
            return function(input) {

                if (typeof input == 'undefined' || input == '') return 'assets/img/logoheaderlogin_twiins.png?v=' + Math.random();
                else return input + '?v=' + Math.random();
            }
        })
        .filter('filtrocolor', function() {

            return function(input, input_estricto) {

                if (input_estricto == 'P') {
                    if (input >= 0 && input <= 20) return 'progress-bar-danger';
                    else if (input > 20 && input <= 50) return 'progress-bar-warning';
                    else if (input > 50 && input <= 100) return 'progress-bar-success';
                } else if (input_estricto == 'T') {
                    if (input >= 0 && input <= 20) return 'text-danger';
                    else if (input > 20 && input <= 50) return 'text-warning';
                    else if (input > 50 && input <= 100) return 'text-success';
                } else if (input_estricto == 'C') {
                    if (input >= 0 && input <= 20) return '#ef6262';
                    else if (input > 20 && input <= 50) return '#dca54d';
                    else if (input > 50 && input <= 100) return '#49ad70';
                }

            }
        })
        .filter('nombremes', function() {

            return function(input) {
                if (input == 1) return 'Enero';
                else if (input == 2) return 'Febrero';
                else if (input == 3) return 'Marzo';
                else if (input == 4) return 'Abril';
                else if (input == 5) return 'Mayo';
                else if (input == 6) return 'Junio';
                else if (input == 7) return 'Julio';
                else if (input == 8) return 'Agosto';
                else if (input == 9) return 'Septiembre';
                else if (input == 10) return 'Octubre';
                else if (input == 11) return 'Noviembre';
                else if (input == 12) return 'Diciembre';
            }
        })
        .filter('iconoarchivo', function() {

            return function(input, tip) {


                if (typeof input != "undefined") {
                    if (tip == 'i') {
                        if (input.indexOf('.doc') > 0 || input.indexOf('.docx') > 0) return 'icon-file-word';
                        else if (input.indexOf('.xls') > 0 || input.indexOf('.xlsx') > 0) return 'icon-file-excel';
                        else if (input.indexOf('.pdf') > 0) return 'icon-file-pdf';
                        else if (input.indexOf('.png') > 0 || input.indexOf('.gif') > 0 || input.indexOf('.jpg') > 0) return 'icon-file-picture';
                        else if (input.indexOf('.ppt') > 0 || input.indexOf('.pptx') > 0) return 'icon-file-openoffice';
                        else return 'icon-libreoffice';
                    } else {
                        if (input.indexOf('.doc') > 0 || input.indexOf('.docx') > 0) return 'blue';
                        else if (input.indexOf('.xls') > 0 || input.indexOf('.xlsx') > 0) return 'green';
                        else if (input.indexOf('.pdf') > 0) return 'red';
                        else if (input.indexOf('.png') > 0 || input.indexOf('.gif') > 0 || input.indexOf('.jpg') > 0) return '';
                        else if (input.indexOf('.ppt') > 0 || input.indexOf('.pptx') > 0) return 'orangered';
                        else return 'black';
                    }
                }


            }
        }).filter('iconocalendario', function() {
            return function(input) {
                if (typeof input != "undefined") {
                    if (input == "C") return 's7-study';
                    else if (input == 'F') return 's7-sun';
                    else if (input == 'R') return 's7-users';
                    else if (input == 'I') return 's7-loop';
                    else if (input == 'E') return 's7-coffee';
                    else if (input == 'U') return 's7-gift';
                    else return 's7-date';
                }
            }
        }).filter('iconoalerta', function() {
            return function(input) {
                if (typeof input != "undefined") {
                    if (input == 1 || input == 2) return 's7-gift';
                    else if (input == 3) return 's7-date';
                    else if (input == 4) return 's7-note2';
                }
            }
        }).filter('evaluacionestado', function() {
            return function(input) {
                if (typeof input != "undefined") {
                    if (input == 'A') return 'Activa';
                    else if (input == 'P') return 'Pendiente';
                    else if (input == 'F') return 'Finalizada';
                }
            }
        }).filter('formacionestado', function() {
            return function(input) {
                if (typeof input != "undefined") {
                    if (input == 'A') return 'Alto';
                    else if (input == 'I') return 'Intermedio';
                    else if (input == 'B') return 'Bajo';
                }
            }
        })
        .filter("sanitize", ['$sce', function($sce) {
            return function(htmlCode) {
                return $sce.trustAsHtml(htmlCode);
            }
        }]).filter('permisoestado', function() {
            return function(input) {
                if (typeof input != "undefined") {
                    if (input == 'A') return 'Aprobado';
                    else if (input == 'P') return 'Pendiente';
                    else if (input == 'N') return 'Negada';
                }
            }
        }).filter('slugify', function() {
            return function(input) {
                var tittles = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
                var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
                for (var i = 0; i < tittles.length; i++) {
                    input = input.replace(tittles.charAt(i), original.charAt(i)).toLowerCase();
                };
                return input;
            };
        });
})();