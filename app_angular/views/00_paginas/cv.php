<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/img/favicon.png">
    <title>.: Twi!ns :.</title>
    <link rel="stylesheet" type="text/css" href="../../assets/lib/stroke-7/style.css?<?php echo time(); ?>"/>

    <link rel="stylesheet" type="text/css" href="../../assets/css/icomoon/demo-files/demo.css?<?php echo time(); ?>"/>
    <!--[if !IE]><!-->
    <link rel="stylesheet" type="text/css" href="../../assets/lib/jquery.nanoscroller/css/nanoscroller.css?<?php echo time(); ?>"/>
    <!--<![endif]-->

    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js?<?php echo time(); ?>"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <link rel="stylesheet" href="../../assets/css/style.css?<?php echo time(); ?>" type="text/css"/>
    <link type="text/css" href="../../assets/css/themes/theme-google.css?<?php echo time(); ?>" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../../assets/lib/jquery.gritter/css/jquery.gritter.css?<?php echo time(); ?>" />
    <link rel="stylesheet" type="text/css" href="../../assets/lib/datetimepicker/css/bootstrap-datetimepicker.min.css?<?php echo time(); ?>"/>
    <link rel="stylesheet" type="text/css" href="../../assets/lib/jquery.niftymodals/css/component.css?<?php echo time(); ?>"/>
    <link rel="stylesheet" type="text/css" href="../../js/01_core/lib/tolltip/angular-tooltips.css?<?php echo time(); ?>">

    <!-- WIZARD -->
    <!--<link href="../../assets/wizard/bootstrap/bootstrap.min.css" rel="stylesheet" />-->
    <link href="../../assets/wizard/src/bootstrap-wizard.css?<?php echo time(); ?>" rel="stylesheet"/>

    <script>
        var $_POST = <?=json_encode($_POST)?>;
    </script>

    <style>
        /* capacitacion*/
        .eventC a {
            background-color: #8dcadf !important;
            background-image :none !important;
            color: #ffffff !important;
            border-radius: 50%;
            padding: 6px;
            font-weight: bold;
        }

        /* feriado*/
        .eventF a {
            background-color: #ffc870 !important;
            background-image :none !important;
            color: #ffffff !important;
            border-radius: 50%;
            padding: 6px;
            font-weight: bold;
        }

        /* Reunion masiva*/
        .eventR a {
            background-color: #7accbe !important;
            background-image :none !important;
            color: #ffffff !important;
            border-radius: 50%;
            padding: 6px;
            font-weight: bold;
        }

        /* Induccion institucional */
        .eventR a {
            background-color: #7a98bf !important;
            background-image :none !important;
            color: #ffffff !important;
            border-radius: 50%;
            padding: 6px;
            font-weight: bold;
        }

        /* Induccion institucional */
        .eventE a {
            background-color: #f7659c !important;
            background-image :none !important;
            color: #ffffff !important;
            border-radius: 50%;
            padding: 6px;
            font-weight: bold;
        }

        /* Induccion institucional */
        .eventU a {
            background-color: #ef6262 !important;
            background-image :none !important;
            color: #ffffff !important;
            border-radius: 50%;
            padding: 6px;
            font-weight: bold;
        }

        /* Induccion Multiple  */
        .eventM a {
            background: linear-gradient(131deg, #698bb7 50%, #b0b0b0 50%);
            color: #ffffff !important;
            border-radius: 50%;
            padding: 6px;
            font-weight: bold;
        }

        .spinner
        {
            position: fixed !important;
        }

    </style>

</head>
<body ng-controller="CvController">

<span us-spinner="{radius:8, width:3, length: 9}"></span>

<div class="am-wrapper am-fixed-sidebar">

    <!-- MENUS DE NAVEGACION SUPERIOR -->
    <nav class="navbar navbar-default navbar-fixed-top am-top-header">
        <div class="container-fluid">
            <!-- MENU PRINCIPAL RESPONSIVE -->
            <div class="navbar-header">
                <div class="page-title">
                    <span>{{ titulo }}</span>
                </div>


                <a href="#" class="am-toggle-right-sidebar visible-xs"><span class="icon s7-menu"></span></a>

                <a ui-sref="opcion({name:'dashboard'})" class="navbar-brand hidden-xs" style="background-image: url('{{ (config.clienteLogotipoPortal) }}?v={{rand}}');    background-size: contain;">
                </a>
            </div>


            <a href="#" class="am-toggle-right-sidebar hidden-xs" style="background-color: white">
                <img width="100px" ng-src="{{ (config.clienteIsotipo) }}">
            </a>

            <!-- COLLAPSE MENU -->
            <a href="#" data-toggle="collapse" data-target="#am-navbar-collapse" class="am-toggle-top-header-menu collapsed"><span class="icon s7-angle-down"></span></a>

        </div>

    </nav>

    <div class="row">
            <div class="col-md-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <div class="panel-title">Hoja de Vida</div>
                </div>
                <div class="panel-body">
                  <form ng-submit="guardarCV()"style="border-radius: 0px;" class="form-horizontal group-border-dashed">

                    <div class="col-md-12 col-sm-12" style="padding: 0px;">
                        <div class="panel-heading" style="padding-left: -5px;margin-left: 13px;margin-top:20px;background-color: whitesmoke;margin-bottom: 13px;">
                            <span class="panel-title text-info" style="padding-left: 13px">Datos Personales</span>
                        </div>
                    </div>


                    <div  class="form-group">
                        <label class="col-sm-3 control-label">Foto Usuario:</label>
                        <div class="col-sm-6" style="width:162px">
                            <div class="avatar user-avatar" style="background-image:url('/assets/img/avatar.jpg?v=20161019182704')">

                                <input id="fileUpload" type="file" file-model="$parent.myFile" name="file" required>

                                <svg version="1.1" id="camera" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                            viewBox="0 0 25 15" enable-background="new 0 0 25 15" xml:space="preserve">
                                        <path id="cameraFrame" fill="none" stroke="white" stroke-miterlimit="10" d="M23.1,14.1H1.9c-0.6,0-1-0.4-1-1V1.9c0-0.6,0.4-1,1-1h21.2
                                            c0.6,0,1,0.4,1,1v11.3C24.1,13.7,23.7,14.1,23.1,14.1z"/>
                                        <path id="circle" fill="none" stroke="#ffffff" stroke-width="1.4" stroke-miterlimit="12" d="M17.7,7.5c0-2.8-2.3-5.2-5.2-5.2S7.3,4.7,7.3,7.5s2.3,5.2,5.2,5.2
                                            S17.7,10.3,17.7,7.5z"/>
                                        <g id="plus">
                                            <path fill="none" id="plusLine" class="line" stroke="#ffffff" stroke-linecap="round" stroke-miterlimit="10" d="M20.9,2.3v4.4"/>
                                            <path fill="none" class="line"stroke="#ffffff" stroke-linecap="round" stroke-miterlimit="10" d="M18.7,4.6h4.4"/>
                                        </g>
                                        </svg>
                                <div id="openModal">
                                    <span>Drop here or</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>



                    <div class="form-group">
                      <label class="col-sm-3 control-label">Nombres:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">Apellidos:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">Mail:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">Celular:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">Dirección:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control">
                      </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Fecha de Nacimiento:</label>
                        <div class="col-sm-6">    
                            <div data-start-view="2" data-date-format="yyyy-mm-dd hh:ii" datetimepicker data-link-field="dtp_input1" class="input-group date col-md-12 col-xs-12">
                                <input size="16" type="text" value="" ng-model="seleccione.fechaFinPermisos" class="form-control"><span class="input-group-addon btn btn-primary"><i class="icon-th s7-date"></i></span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                      <label class="col-sm-3 control-label">Adjuntar CV:</label>
                      <div class="col-sm-6">
                        <input type="file" class="form-control">
                      </div>
                    </div>


                    <!-- Formacion -->
                    <div class="col-md-12 col-sm-12" style="padding: 0px;">
                        <div class="panel-heading" style="padding-left: -5px;margin-left: 13px;margin-top:20px;background-color: whitesmoke;margin-bottom: 13px;">
                            <span class="panel-title text-info" style="padding-left: 13px">Formación</span>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="col-md-3">
                            <label>Título</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label>Institución</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label>N. Horas</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label>Nivel de Estudio</label>
                            <select class="form-control">
                                <option value="P"> Primario</option>
                                <option value="C"> Ciclo Basico</option>
                                <option value="S"> Secundario</option>
                                <option value="B"> Bachillerato</option>
                                <option value="I"> Intermedio</option>
                                <option value="U" selected=""> Universitario</option>
                                <option value="O"> Postgrado</option>
                                <option value="M"> Masterado</option>
                                </select>
                        </div>
                    </div>

                    <div class="col-md-12" style="margin-top:20px">
                        <div class="col-md-3">
                            <label>Título</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label>Institución</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label>N. Horas</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label>Nivel de Estudio</label>
                            <select class="form-control">
                                <option value="P"> Primario</option>
                                <option value="C"> Ciclo Basico</option>
                                <option value="S"> Secundario</option>
                                <option value="B"> Bachillerato</option>
                                <option value="I"> Intermedio</option>
                                <option value="U" selected=""> Universitario</option>
                                <option value="O"> Postgrado</option>
                                <option value="M"> Masterado</option>
                                </select>
                        </div>
                    </div>

                    <div class="col-md-12" style="margin-top:20px">
                        <div class="col-md-3">
                            <label>Título</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label>Institución</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label>N. Horas</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label>Nivel de Estudio</label>
                            <select class="form-control">
                                <option value="P"> Primario</option>
                                <option value="C"> Ciclo Basico</option>
                                <option value="S"> Secundario</option>
                                <option value="B"> Bachillerato</option>
                                <option value="I"> Intermedio</option>
                                <option value="U" selected=""> Universitario</option>
                                <option value="O"> Postgrado</option>
                                <option value="M"> Masterado</option>
                                </select>
                        </div>
                    </div>

                    <!-- Educacion -->
                    <div class="col-md-12 col-sm-12" style="padding: 0px;">
                        <div class="panel-heading" style="padding-left: -5px;margin-left: 13px;margin-top:20px;background-color: whitesmoke;margin-bottom: 13px;">
                            <span class="panel-title text-info" style="padding-left: 13px">Educación</span>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="col-md-4">
                            <label>Título</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-4">
                            <label>Institución</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                       
                        <div class="col-md-4">
                            <label>Nivel de Estudio</label>
                            <select class="form-control">
                                <option value="P"> Primario</option>
                                <option value="C"> Ciclo Basico</option>
                                <option value="S"> Secundario</option>
                                <option value="B"> Bachillerato</option>
                                <option value="I"> Intermedio</option>
                                <option value="U" selected=""> Universitario</option>
                                <option value="O"> Postgrado</option>
                                <option value="M"> Masterado</option>
                                </select>
                        </div>
                    </div>

                    <div class="col-md-12" style="margin-top:20px">
                        <div class="col-md-4">
                            <label>Título</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-4">
                            <label>Institución</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                       
                        <div class="col-md-4">
                            <label>Nivel de Estudio</label>
                            <select class="form-control">
                                <option value="P"> Primario</option>
                                <option value="C"> Ciclo Basico</option>
                                <option value="S"> Secundario</option>
                                <option value="B"> Bachillerato</option>
                                <option value="I"> Intermedio</option>
                                <option value="U" selected=""> Universitario</option>
                                <option value="O"> Postgrado</option>
                                <option value="M"> Masterado</option>
                                </select>
                        </div>
                    </div>

                    <div class="col-md-12" style="margin-top:20px">
                        <div class="col-md-4">
                            <label>Título</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-4">
                            <label>Institución</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                       
                        <div class="col-md-4">
                            <label>Nivel de Estudio</label>
                            <select class="form-control">
                                <option value="P"> Primario</option>
                                <option value="C"> Ciclo Basico</option>
                                <option value="S"> Secundario</option>
                                <option value="B"> Bachillerato</option>
                                <option value="I"> Intermedio</option>
                                <option value="U" selected=""> Universitario</option>
                                <option value="O"> Postgrado</option>
                                <option value="M"> Masterado</option>
                                </select>
                        </div>
                    </div>

                    <!-- Experiencia -->
                    <div class="col-md-12 col-sm-12" style="padding: 0px;">
                        <div class="panel-heading" style="padding-left: -5px;margin-left: 13px;margin-top:20px;background-color: whitesmoke;margin-bottom: 13px;">
                            <span class="panel-title text-info" style="padding-left: 13px">Experiencia</span>
                        </div>
                    </div>

                     <div class="col-md-12">
                        <div class="col-md-3">
                            <label>Institución</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label>Cargo</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>

                        <div class="col-md-3">
                            <label>Actividad</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                       
                        <div class="col-md-3">
                            <label>Años</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                    </div>

                    <div class="col-md-12"  style="margin-top:20px">
                        <div class="col-md-3">
                            <label>Institución</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label>Cargo</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>

                        <div class="col-md-3">
                            <label>Actividad</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                       
                        <div class="col-md-3">
                            <label>Años</label>
                            <input type="email" placeholder="" class="form-control">
                        </div>
                    </div>
                
                    <div class="col-md-12 text-center" style="padding-top: 40px">
                        <button type="submit" class="btn btn-space btn-primary" >Guardar</button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>






</div>
<!-- Nifty Modal empresa informacion -->

<!-- Formulario para redireccionar al gestion -->


<!-- Formulario para redireccionar al gestion -->

<script src="../../assets/lib/jquery/jquery.min.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery.nanoscroller/javascripts/jquery.nanoscroller.min.js" type="text/javascript"></script>
<script src="../../assets/js/main.js" type="text/javascript"></script>
<script src="../../assets/lib/bootstrap/dist/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery.niftymodals/js/jquery.modalEffects.js" type="text/javascript"></script>
<script src="../../assets/js/Readmore.js-master/readmore.min.js" type="text/javascript"></script>

<!--
<script src="../../assets/lib/jquery-flot/jquery.flot.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery-flot/jquery.flot.pie.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery-flot/jquery.flot.resize.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery-flot/plugins/jquery.flot.orderBars.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery-flot/plugins/curvedLines.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery.sparkline/jquery.sparkline.min.js" type="text/javascript"></script>
-->

<script src="../../assets/lib/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>

<!--
<script src="../../assets/lib/jquery.vectormap/jquery-jvectormap-1.2.2.min.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery.vectormap/maps/jquery-jvectormap-us-merc-en.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery.vectormap/maps/jquery-jvectormap-world-mill-en.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery.vectormap/maps/jquery-jvectormap-uk-mill-en.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery.vectormap/maps/jquery-jvectormap-fr-merc-en.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery.vectormap/maps/jquery-jvectormap-us-il-chicago-mill-en.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery.vectormap/maps/jquery-jvectormap-au-mill-en.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery.vectormap/maps/jquery-jvectormap-in-mill-en.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery.vectormap/maps/jquery-jvectormap-map.js" type="text/javascript"></script>
<script src="../../assets/lib/jquery.vectormap/maps/jquery-jvectormap-ca-lcc-en.js" type="text/javascript"></script>


-->
<script src="../../assets/lib/countup/countUp.min.js" type="text/javascript"></script>
<!--
<script src="../../assets/lib/chartjs/Chart.min.js" type="text/javascript"></script>
-->
<script src="../../assets/lib/jquery.gritter/js/jquery.gritter.js" type="text/javascript"></script>
<script src="../../assets/lib/datetimepicker/js/bootstrap-datetimepicker.js" type="text/javascript"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<!--
<script src="../../assets/js/dist/jquery.easypiechart.min.js"></script>
-->

<script  type="text/javascript" src="../../assets/org/js/primitives.min.js?2105"></script>
<link href="../../assets/org/css/primitives.latest.css?2105" media="screen" rel="stylesheet" type="text/css" />
<script src='http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js'></script>
<script src="../../js/funciones.js" type="text/javascript"></script>



<script type="text/javascript" src="https://cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.9/js/dataTables.bootstrap.min.js"></script>



<script data-require="angular.js@1.2.x" src="http://code.angularjs.org/1.2.14/angular.js" data-semver="1.2.14"></script>
<script src="http://angular-ui.github.io/ui-router/release/angular-ui-router.min.js"></script>
<script src="../../js/01_core/lib/angular-route.min.js"></script>
<script src="../../js/01_core/lib/ngStorage.js"></script>

<script src="../../js/01_core/node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js"></script>
<script src="../../js/01_core/node_modules/ng-file-upload/dist/ng-file-upload.min.js"></script>

<script src="../../js/01_core/lib/underscore-min.js"></script>
<script src="../../js/01_core/lib/angular-underscore-module.js"></script>
<script src="../../js/01_core/lib/vendor/datatables-tabletools/js/dataTables.tableTools.js"></script>
<script src="../../js/01_core/lib/src/plugins/tabletools/angular-datatables.tabletools.js"></script>
<script src="../../js/01_core/lib/angular-datatables.js"></script>
<script src="../../js/01_core/lib/tolltip/angular-tooltips.js"></script>

<!-- ngReact -->
<!--<script src="../../js/01_core/node_modules/react/dist/react.js"></script>-->
<!--<script src="../../js/01_core/node_modules/ngreact/ngReact.js"></script>-->
<!--<script src="../../js/01_core/node_modules/react-dom/dist/react-dom.js"></script>-->
<script src="../../js/01_core/node_modules/ngreact/ngReact.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.1/angular-resource.js"></script>

<script type="text/javascript" src="http://fgnass.github.io/spin.js/spin.min.js"></script>
<script type="text/javascript" src="../../js/01_core/lib/angular-spinner.min.js"></script>
<script type="text/javascript" src="../../js/01_core/lib/angular-loading-spinner.js"></script>
<script type="text/javascript" src="../../js/01_core/lib/angular-filter.js"></script>
<script type="text/javascript" src="../../js/01_core/lib/ui-select2.js"></script>
<script type="text/javascript" src="../../js/01_core/lib/checklist-model.js"></script>
--
<script src="../../js/01_core/app.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/controllers/cvController.js?<?php echo time(); ?>"></script>


<script src="../../js/01_core/directives.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/filters.js?<?php echo time(); ?>"></script>

<script src="../../js/01_core/services/cvService.js?<?php echo time(); ?>?<?php echo time(); ?>"></script>


<!-- WIZARD-->
<script src="../../assets/wizard/chosen/chosen.jquery.js"></script>
<script src="../../assets/wizard/js/prettify.js" type="text/javascript"></script>
<script src="../../assets/wizard/src/bootstrap-wizard.js?i=1" type="text/javascript"></script>



</body>
</html>