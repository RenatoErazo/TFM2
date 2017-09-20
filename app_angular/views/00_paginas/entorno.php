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

    <link rel="stylesheet" href="../../assets/fab/css/kc.fab.css?<?php echo time(); ?>" type="text/css"/>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="../../assets/lib/morrisjs/morris.css?<?php echo time(); ?>">

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
        
        .panel-height {
            height: 402px !important;
        }

        .panel-height-2 {
            height: 834px !important;
        }

        .morris-chart-bar { 
             height:300px !important;  
            /* padding-bottom:110px; */
        } 
        
        /* svg { 
            height:200px;
        } */

    </style>


</head>


<span us-spinner="{radius:8, width:3, length: 9}"></span>

<body ng-controller="EntornoController"  id="load" style="display:none;">



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
                <img width="100px" ng-src="{{ (config.clienteIsotipo) }}?v={{rand}}">
            </a>

            <!-- COLLAPSE MENU -->
            <a href="#" data-toggle="collapse" data-target="#am-navbar-collapse" class="am-toggle-top-header-menu collapsed"><span class="icon s7-angle-down"></span></a>

            <!-- MENU DEL PERFIL -->
            <div id="am-navbar-collapse" class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right am-user-nav">
                    <li class="dropdown"><a href="#" data-toggle="dropdown" role="button" aria-expanded="false" class="dropdown-toggle"><span style="padding-right: 15px">{{ (GlbUsuario.usuarioNombreCasual | getNombrePropio:false) }}</span><img ng-src="{{ (GlbUsuario.usuarioFoto | getValidaImagen:'U':GlbUsuario.usuarioSexo ) }}?v={{rand}}" style="width:45px;"><span class="user-name"></span><span class="angle-down s7-angle-down"></span></a>
                        <ul role="menu" class="dropdown-menu">

                            <li ng-show="accesoAdmin=='S'"><a href="#" onclick="$('#gestion').submit()"><span class="icon s7-monitor"></span>Administrativo</a></li>
                            <li><a ui-sref="opcion({name:'misdatos'})"> <span class="icon s7-id"></span>Mis Datos</a></li>
                            <li><a style="cursor: pointer" ng-click="salir()"> <span class="icon s7-power"></span>Salir</a></li>
                        </ul>


                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right am-icons-nav hidden-xs">
                    <li class="dropdown">
                        <a href="#" ng-click="actuVistAlert()"  data-toggle="dropdown" role="button" aria-expanded="false" class="dropdown-toggle">
                            <span class="icon s7-bell"></span>
                            <span ng-class="((alertas | filter:{alertaVisto:'N'} | keylength) > 0) ? 'indicator' : ''" ng-style="((alertas | filter:{alertaVisto:'N'} | keylength) > 0) ? {'background-color': '#EA3434'} : {}"></span>
                        </a>

                        <ul class="dropdown-menu am-notifications">
                            <li>
                                <div class="title">Alertas<span class="badge">{{ alertas  | keylength }}</span></div>
                                <div class="list">
                                    <div class="am-scroller nano has-scrollbar">
                                        <div class="content nano-content" style="right: -15px;">
                                            <ul>
                                                <li ng-class="item.alertaVisto=='S'?'':'active'" ng-repeat="item in alertas">
                                                    <a href="#">
                                                        <div class="logo"><span class="icon {{ item.tipoAlertaCodigo | iconoalerta }}"></span></div>
                                                        <div class="user-content">
                                                            <span ng-class="item.alertaVisto=='S'?'':'circle'"></span><span class="name">{{ item.usuarioNombreCompuesto | getNombrePropio:true }}</span>
                                                            <span class="text-content"> {{ item.alertaTexto | getNombrePropio:true }}</span>
                                                            <span class="date">{{ item.fechaalerta | getNombrePropio:true }}</span>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="nano-pane" style="display: none;"><div class="nano-slider" style="height: 20px; transform: translate(0px, 0px);"></div></div></div>
                                </div>

                            </li>
                        </ul>
                    </li>
                    <!--<li class="dropdown"><a href="#" data-toggle="dropdown" role="button" aria-expanded="false" class="dropdown-toggle"><span class="icon s7-share"></span></a>
                        <ul class="dropdown-menu am-connections">
                            <li>
                                <div class="title">Connections</div>
                                <div class="list">
                                    <div class="content">
                                        <ul>
                                            <li>
                                                <div class="logo"><img src="/assets/img/github.png"></div>
                                                <div class="field"><span>Admin Twi!ns</span>
                                                    <div class="pull-right">
                                                        <div class="switch-button switch-button-sm">
                                                            <input type="checkbox" checked="" name="check1" id="switch1"><span>
                                    <label for="switch1"></label></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="footer"> <a href="#">View all connections</a></div>
                            </li>
                        </ul>
                    </li>-->
                </ul>
            </div>

        </div>

    </nav>

    <!-- MENU DE NAVEGACION IZQUIERDO -->
    <div class="am-left-sidebar">
        <div class="content">
            <!--<div class="am-logo"></div>-->

            <!--<ul class="sidebar-elements">
                <li ng-class="'dashboard'==titstyle?'active':''">
                    <a ui-sref="opcion({name:'dashboard'})"><i class="icon {{ ('dashboard' | logomenu) }}"></i><span>Dashboard</span></a>
                </li>
                <li ng-repeat="item in menu | where:{opci_tipo:'F'}" ng-class="item.opci_url==titstyle?'active':''">
                    <a ui-sref="opcion({name:'{{item.opci_url}}'})"><i class="icon {{ (item.opci_url | logomenu) }}"></i><span>{{ item.opci_nombre }}</span></a>
                </li>
            </ul>-->

        </div>

    </div>

    <!-- CONTENIDO -->
    <div class="am-content">
    
        <!-- TITULOS -->
        <div class="page-head" ng-hide="titstyle=='dashboard'">
            <span class="icon {{ (titstyle | logomenu) }} text-info"></span>
            <h2>{{ titulo }}</h2>
            <ol class="breadcrumb">
                <!--<li class="active">Actualiza tu información y completa tu perfil</li>-->
            </ol>
        </div>
        <!-- CONTENIDO DE CADA PAGINA -->
        <div class="main-content" ui-view>
        </div>

    </div>

    <!-- MENU PERFIL -->
    <nav class="am-right-sidebar">
        <div class="sb-content">

            <!-- Datos del Usuarios -->
            <div class="user-info">
                <img ng-src="{{ (GlbUsuario.usuarioFoto | getValidaImagen:'U':GlbUsuario.usuarioSexo ) }}?v={{rand}}">
                <span class="name">{{ ( GlbUsuario.usuarioNombreCasual | getNombrePropio:false) }}<span class="status"></span></span>
                <span class="position">{{ GlbUsuario.cargoNombre | getNombrePropio:true }}</span>
                <div>
                    <div class="progressperfil">
                        <div style="width: {{ GlbUsuario.usuarioPorcentajePerfil }}%" class="progress-bar {{ (GlbUsuario.usuarioPorcentajePerfil | filtrocolor:'P') }}">{{ GlbUsuario.usuarioPorcentajePerfil }}%</div>
                    </div>
                    <span class="{{ (GlbUsuario.usuarioPorcentajePerfil | filtrocolor:'T') }} small">Información completa en un {{ GlbUsuario.usuarioPorcentajePerfil }}%</span>
                </div>
            </div>

            <!-- Mini navegacion -->
            <div class="tab-navigation">
                <ul role="tablist" class="nav nav-tabs nav-justified">
                    <li role="presentation" class="active"><a href="#tab1" aria-controls="home" role="tab" data-toggle="tab"> <span class="icon s7-keypad"></span></a></li>
                        <li role="presentation" class="hidden-md hidden-xs"><a href="#tab2" aria-controls="profile" role="tab" data-toggle="tab"> <span class="icon s7-home"></span></a></li>
                    <li role="presentation"><a href="#tab3" aria-controls="messages" role="tab" data-toggle="tab"> <span class="icon s7-folder"></span></a></li>
                    <li role="presentation"><a href="#tab4" aria-controls="settings" role="tab" data-toggle="tab"> <span class="icon s7-mail"></span></a></li>
                </ul>
            </div>

            <div class="tab-panel">
                <div class="tab-content">

                    <!-- menu intranet -->
                    <div id="tab1" role="tabpanel" class="tab-pane menuoptions active am-scroller nano">
                        <div class="nano-content">
                            <div class="content">
                                <ul class="sidebar-elements">
                                    <li>
                                        <a ui-sref="opcion({name:'dashboard'})" ng-class="'dashboard'==titstyle?'active':''"><i class="icon {{ ('dashboard' | logomenu) }}"></i><span>Dashboard</span></a>
                                    </li>
                                    <!--<li ng-repeat="item in menu | where:{opci_tipo:'F'}" class="{{ (item.opci_codigo==-4?'hidden-xs':'') }}">-->
                                    <li ng-repeat="item in menu | where:{opci_tipo:'F'}">
                                        <a ui-sref="opcion({name:'{{item.opci_url}}'})" ng-class="item.opci_url==titstyle?'active':''"><i class="icon {{ (item.opci_url | logomenu) }}"></i><span>{{ item.opci_nombre }}</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--<div class="search">
                            <input type="text" placeholder="Search..." name="q"><span class="s7-search"></span>
                        </div>-->
                    </div>

                    <!-- informacion mi empresa -->
                    <div id="tab2" role="tabpanel" class="tab-pane infoempresa am-scroller nano">
                        <div class="nano-content">
                            <div class="content">
                                <h2>Mi Empresa</h2>
                                <ul>
                                    <li class="linopadding col-xs-12" ng-repeat="item in infoEmpr">

                                        <div class="content col-xs-10">
                                            <span>{{ item.informacionEmpresaNombre | getNombrePropio:false}}</span>
                                        </div>
                                        <a class="icon col-xs-2" ng-click="showInfo(item)" style="position: relative;left: initial;">
                                            <span class="icon s7-angle-right" style="top:4px;left: 8px;position: absolute;"></span>
                                        </a>

                                    </li>
                                </ul>

                                <!-- Validacion de archivos -->
                                <ul ng-show="!infoEmpr">
                                    <li class="linopadding">
                                        <div class="content"><span>No tiene información.</span></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- archivos -->
                    <div id="tab3" role="tabpanel" class="tab-pane infoempresa am-scroller nano">
                        <div class="nano-content">
                            <div class="content">
                                <h2>Archivos</h2>
                                <ul>
                                    <li class="linopadding col-xs-12" ng-repeat="item in archivos" >
                                        <div class="content col-xs-10">
                                            <span>{{ item.archivoNombre | getNombrePropio:false }}</span>
                                        </div>
                                        <a class="icon col-xs-2" ng-click="openFile(item.archivoArchivo)" style="position: relative;left: initial;">
                                            <span class="icon s7-angle-right" style="top:4px;left: 8px;position: absolute;"></span>
                                        </a>
                                    </li>
                                </ul>

                                <!-- Validacion de archivos -->
                                <ul ng-show="!archivos">
                                    <li class="linopadding">
                                        <div class="content"><span>No tiene archivos.</span></div>
                                    </li>
                                </ul>
                                <br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>
                            </div>
                        </div>
                    </div>
                    <!-- sugerencias -->
                    <div id="tab4" role="tabpanel" class="tab-pane ticket am-scroller nano">
                        <div class="nano-content">
                            <div class="content">
                                <h2>Sugerencias</h2>
                                <form ng-model="sugerencia" ng-submit="enviaSugerencia()">
                                    <div class="form-group send-ticket">
                                        <input type="text" placeholder="Título" ng-model="sugerencia.tituloSugerencia" class="form-control" required>
                                    </div>
                                    <div class="form-group send-ticket">
                                        <textarea rows="3" placeholder="Escribe tu sugerencia ..." ng-model="sugerencia.textoSugerencia" class="form-control" required></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-lg" >Enviar Mensaje</button>
                                    <br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </nav>
</div>
<!-- Nifty Modal empresa informacion -->
<div id="empresa-info" class="md-modal colored-header success md-effect-10">
    <div style="width: 900px;" class="md-content">
        <div class="modal-header">
            <button type="button" data-dismiss="modal" aria-hidden="true" class="close md-close"><i class="icon s7-close"></i></button>
            <h3 class="modal-title">{{ infoItem.informacionEmpresaNombre | getNombrePropio:false }}</h3>
        </div>
        <div class="modal-body" style="overflow: auto;height: 78vh;">
            <div class="text-left" id="textoInfo">


            </div>
        </div>
        <div class="modal-footer" style="background-color: rgba(85, 85, 85, 0.22)" ng-show="infoItem.archivos">


            <div class="spacer pull-left">
                <nav>
                    <ul class="pagination pagination-lg" style="margin: 0px 0px;">
                        <li ng-repeat="item in infoItem.archivos">
                            <a>
                                <span ng-click="openFile(item.archivoInformacionArchivo)" class="iconmoon" ng-class="(item.archivoInformacionArchivo | iconoarchivo:'i')" style="font-size: 15pt;color: {{ (item.archivoInformacionArchivo | iconoarchivo:'c') }}" tooltips tooltip-template="{{ item.archivoInformacionNombre }}"></span>
                            </a>

                        </li>
                        <!--<li><a href="#"><img src="../../assets/img/ic_icono_xlsx.gif" tooltip="Vel def no" tooltip-position="up"></a></a></li>
                        <li><a href="#"><img src="../../assets/img/ic_icono_jpg.gif" tooltip="Vel def no" tooltip-position="up"></a></a></li>
                        <li><a href="#"><img src="../../assets/img/ic_icono_pdf.gif" tooltip="Vel def no" tooltip-position="up"></a></a></li>
                        <li><a href="#"><img src="../../assets/img/ic_icono_ppt.gif" tooltip="Vel def no" tooltip-position="up"></a></a></li>-->
                    </ul>
                </nav>
            </div>

        </div>
        <div class="modal-footer">
            <button type="button" data-dismiss="modal" class="btn btn-success md-close">Cerrar</button>
        </div>
    </div>
</div>

<div class="md-overlay"></div>


<!-- Formulario para redireccionar al gestion -->

<form id="gestion" action="{{urlAdmin | trusted}}" method="post">
    <input type="hidden" name="txtUserUsua" value="{{ usuarioUser }}"/>
    <input type="hidden" name="txtPassUsua" value="{{ usuarioPassword }}"/>
</form>
<!-- Formulario para redireccionar al gestion -->
<link ng-if="skin!='blue' && skin!=''" rel="stylesheet" href="../../assets/css/{{ skin }}.css?<?php echo time(); ?>" type="text/css"/>


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
<script src="../../js/funciones.js?<?php echo time(); ?>" type="text/javascript"></script>



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
<script src="../../js/01_core/controllers/entornoController.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/controllers/dashboardController.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/controllers/misdatosController.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/controllers/miperfilController.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/controllers/miequipoController.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/controllers/vacacionesController.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/controllers/rolpagosController.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/controllers/permisosController.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/controllers/flextimeController.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/controllers/organigramaController.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/controllers/seleccionController.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/controllers/beneficiosController.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/controllers/capacitacionController.js?<?php echo time(); ?>"></script>

<script src="../../js/01_core/directives.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/filters.js?<?php echo time(); ?>"></script>

<script src="../../js/01_core/services/entornoService.js?<?php echo time(); ?>?<?php echo time(); ?>"></script>
<script src="../../js/01_core/services/misdatosService.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/services/misdatosService.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/services/miperfilService.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/services/miequipoService.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/services/vacacionesService.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/services/rolpagosService.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/services/permisosService.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/services/flextimeService.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/services/seleccionService.js?<?php echo time(); ?>"></script>
<script src="../../js/01_core/services/beneficiosService.js?<?php echo time(); ?>"></script>

<!-- WIZARD-->
<script src="../../assets/wizard/chosen/chosen.jquery.js"></script>
<script src="../../assets/wizard/js/prettify.js" type="text/javascript"></script>
<script src="../../assets/wizard/src/bootstrap-wizard.js?i=1" type="text/javascript"></script>

 <script src="../../assets/fab/js/kc.fab.js?<?php echo time(); ?>"></script> 

<script src="../../assets/lib/morrisjs/morris.min.js?<?php echo time(); ?>"></script>

<script src="../../assets/js/jquery.countdown/jquery.countdown.min.js"></script>

<script type="text/javascript">

    $(document).ready(function(){
        //initialize the javascript
        //App.init();
        //App.dashboard();
        App.rightSidebarInit();

       
        
    });

</script>

</body>
</html>