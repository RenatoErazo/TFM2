(function (_) {

        angular.module('login.controllers', [])
            .controller('LogeoController', ['$scope', '$routeParams', 'logeoService','$location','$rootScope','$localStorage','$window','$filter', function ($scope, $routeParams, logeoService,$location,$rootScope,$localStorage,$window,$filter) {
                var usuarioUser = "";
                var usuarioPassword = "";
                var rand = $filter('date')(new Date(),'yyyyMMddHHmmss');
                //var getParams = $filter('getGET')();
                var jsoOpciones = "";
                var txtToken = "";

                $scope.usuarioUser = "";
                $scope.usuarioPassword = "";
                $scope.urladmin = "";
                $scope.background = "";
                $scope.rand = rand;
                $scope.actpantalla = "0";
                $scope.render = false;

                logeoService.config().then(function (data) {
                    if (Object.keys(data.data).length>0)
                    {
                        $scope.config = data.data.data[0];
                        $scope.backgrounds = data.data.data[0].backgrounds;

                        $localStorage.urladmin = data.data.data[0].parametros[0].clieUrlAdmin;
                        //$localStorage.$save();
                    }
                    else
                        $scope.backgrounds = [{'backgroundCodigo':1, 'backgroundArchivo':'/assets/img/bg_login_default_1.jpg'},{'backgroundCodigo':2, 'backgroundArchivo':'/assets/img/bg_login_default_2.jpg'},{'backgroundCodigo':3, 'backgroundArchivo':'/assets/img/bg_login_default_3.jpg'}]

                    $('.am-login').show();

                },function(reason){
                    console.log(reason);
                });


                loginDirecto = function(UsuarioParam,PasswordParam)
                {

                    usuarioUser = UsuarioParam;
                    usuarioPassword = PasswordParam;

                    logeoService.login(usuarioUser,usuarioPassword).then(function (data) {

                        if(data.status===200)
                        {
                            objecData = data.data.data[0];


                            token = objecData.token;

                            $scope.usuarioUser = usuarioUser;
                            $scope.usuarioPassword = usuarioPassword;

                            $localStorage.token = objecData.token;
                            $localStorage.username = usuarioUser;

                            $localStorage.accesoAdmin = (Object.keys(objecData.sistemas).length>=2)?'S':'N';

                            $scope.sistemas = objecData.sistemas;

                            objecData.sistemas = $filter('filter')(objecData.sistemas,{'apli_codigo':'2'});

                            $scope.redireccionamiento(objecData.sistemas);

                            /*if($_POST.app != undefined)
                            {
                                if($_POST.app=='P')
                                    $window.location.href = '/views/00_paginas/entorno.php';
                            }*/
                        }
                        else
                        {
                            mostrarMensajeError(data.error.error);
                        }
                    });
                };

                $scope.recordar = function()
                {
                    usuarioUser = $scope.usuarioUser;

                    if (usuarioUser == "")
                        message(1,400,'Ingrese el usuario.');
                    else
                        logeoService.recordar(usuarioUser).then(function (data) {
                            if(data.status===200)
                            {
                                message(0,0,"Su contraseña ha sido enviada a su dirección de correo electrónico.");
                            }
                            else
                            {
                                //mostrarMensajeError(data.error);
                            }
                        },function(reason){
                            mostrarMensajeError(reason.errors.data);
                        });
                };

                if (Object.keys($_POST).length > 0)
                {

                    if ($_POST.usuarioUser != undefined && $_POST.usuarioPassword != undefined)
                        loginDirecto($_POST.usuarioUser,$_POST.usuarioPassword);
                        //loginDirecto(Base64.decode($_POST.usuarioUser),Base64.decode($_POST.usuarioPassword));
                }

                $scope.login = function()
                {
                    usuarioUser = $scope.usuarioUser;
                    usuarioPassword = $scope.usuarioPassword;


                    logeoService.login(usuarioUser,usuarioPassword).then(function (data) {

                        if(data.status===200)
                        {
                            objecData = data.data.data[0];

                            token = objecData.token;
                            $scope.sistemas = objecData.sistemas;

                             $localStorage.token = objecData.token;
                             $localStorage.username = usuarioUser;
                             $localStorage.accesoAdmin = (Object.keys(objecData.sistemas).length>=2)?'S':'N';

                             //$localStorage.$save();

                            $scope.redireccionamiento(objecData.sistemas);
                        }
                        else
                        {
                            mostrarMensajeError(data.errors.data);
                        }
                    });
                };

                $scope.redireccionamiento = function(obj)
                {

                    var dispositivo = navigator.userAgent.toLowerCase();
                    if( dispositivo.search(/iphone|ipod|ipad|android/) > -1 )
                    {
                        angular.forEach(obj, function(value, key) {

                            if(value.apli_nombre == 'Portal de Talento Humano')
                                $scope.ingresoSistema(value);
                        });
                    }
                    else
                    {

                        if(Object.keys(obj).length=="1")
                        {

                            $scope.ingresoSistema(obj[Object.keys(obj)[0]]);
                        }

                        else
                            $scope.actpantalla = "1";
                    }
                };

                $scope.ingresoSistema = function(item)
                {
                    $scope.urlSistema = item.apli_url + '/views/00_paginas/entorno.html';
                    $('#jsoOpciones').val(JSON.stringify(item.opciones));
                    $('#txtToken').val(token);
                    $('#logeoSist').attr('action',item.apli_url);
                    $('#logeoSist').submit();
                }
            }])
    .controller('validateController',
      ['$scope', '$location',
        function($scope, $location) {

          /*if (!!$cookies.user) {
            console.log("already logged in!");
            $location.path('/shows');
          } else {
            console.log("need to login!");
            $location.path('/users');
          }*/

          //$location.path('login');


        }]);
})();
