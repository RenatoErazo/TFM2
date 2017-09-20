<?php
//$varPathProy = "/home/uedelta/public_html/evaluacion/";
$varPathProy = "/Applications/XAMPP/xamppfiles/htdocs/zt_delta_sistema/";
//$varPathProy = "/usr/www/users/benjur05/01_zionclientes/delta_sistema/";

$avatar = urldecode($_POST['avatar']);//str_replace('/api/upload/fotousua/',$varPathProy . '/api/upload/fotousua/',urldecode($_POST['avatar']));
$nombre = urldecode($_POST['nombre']);
$departamento = urldecode($_POST['departamento']);
$evaluacion = urldecode($_POST['evaluacion']);

if(!empty($_POST['image_1']))
{
	$data_1 = urldecode($_POST['image_1']);
	list($type, $data_1) = explode(';', $data_1);
	list(, $data_1)      = explode(',', $data_1);
	$data_1 = base64_decode($data_1);
	file_put_contents('image_1.jpg', $data_1);
}

if(!empty($_POST['image_2'])) {
	$data_2 = urldecode($_POST['image_2']);
	list($type, $data_2) = explode(';', $data_2);
	list(, $data_2) = explode(',', $data_2);
	$data_2 = base64_decode($data_2);
	file_put_contents('image_2.jpg', $data_2);
}

if(!empty($_POST['image_3'])) {
	$data_3 = urldecode($_POST['image_3']);
	list($type, $data_3) = explode(';', $data_3);
	list(, $data_3) = explode(',', $data_3);
	$data_3 = base64_decode($data_3);
	file_put_contents('image_3.jpg', $data_3);
}

if(!empty($_POST['image_4'])) {
	$data_4 = urldecode($_POST['image_4']);
	list($type, $data_4) = explode(';', $data_4);
	list(, $data_4) = explode(',', $data_4);
	$data_4 = base64_decode($data_4);
	file_put_contents('image_4.jpg', $data_4);
}else $table_1 = "";

if(!empty($_POST['table_1'])) {
	$table_1 = urldecode($_POST['table_1']);
}else $table_1 = "";

if(!empty($_POST['table_2'])) {
	$table_2 = urldecode($_POST['table_2']);
}else $table_2 = "";

if(!empty($_POST['table_3'])) {
	$table_3 = urldecode($_POST['table_3']);
}else $table_3 = "";

if(!empty($_POST['table_4'])) {
	$table_4 = urldecode($_POST['table_4']);
}else $table_4 = "";

if(!empty($_POST['table_5'])) {
	$table_5 = urldecode($_POST['table_5']);
}else $table_5 = "";

if(!empty($_POST['table_6'])) {
	$table_6 = urldecode($_POST['table_6']);
}else $table_6 = "";

if(!empty($_POST['pedag_1'])) {
	$pedag_1 = urldecode($_POST['pedag_1']);
}else $pedag_1 = "";

if(!empty($_POST['valor_1'])) {
	$valor_1 = urldecode($_POST['valor_1']);
}else $valor_1 = "";

if(!empty($_POST['comen_1'])) {
	$comen_1 = urldecode($_POST['comen_1']);
}else $comen_1 = "";

if(!empty($_POST['prome_1'])) {
	$prome_1 = urldecode($_POST['prome_1']);
}else $prome_1 = "";

if(!empty($_POST['resul_1'])) {
	$resul_1 = urldecode($_POST['resul_1']);
}else $resul_1 = "";

//$header = urldecode($_POST['header']);

//$header = str_replace('/api/upload/fotousua/',$varPathProy . '/api/upload/fotousua/',$header);




// genero pdf
require_once($varPathProy . "api/_system/libraries/dompdf/dompdf_config.inc.php");
$dompdf = new DOMPDF();

$varcontent = '<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="test1.css" media="screen" />

</head>
<body>

<body>';

$varcontent .= utf8_decode('<table style="background-color: #ddd;width: 100%"><tr><td width="10%"><img src="' . $avatar . '" width="60px"/></td><td><b>' . $nombre . '</b><br>' . $departamento . '<br>' . $evaluacion . '</td><td width="20%"></td><td align="center"><b style="font-size:18px">' . $resul_1 . '</b><br><span font-size:18px>' . $prome_1 . '</span></td></tr></table><br><br>');

if($table_1!='')
	$varcontent_table1 ='<div class="text-center" style="color:#4C7196;font-weight: bold;font-size: 12pt;margin: 8px;margin:0 auto 0 auto; width:220px;">Competencias Pedagógicas</div><table><tr><td width="40%"><table class="tableInforme">' . $table_1  . '</table></td><td width="60%">
<img src="' . $varPathProy . 'views/00_paginas/image_1.jpg" width="400px"  /></td></tr></table>';
else
	$varcontent_table1 = '';

if($table_2!='')
	$varcontent_table2 ='<div class="text-center" style="color:#4C7196;font-weight: bold;font-size: 12pt;margin: 8px;margin:0 auto 0 auto; width:220px;">Valores Organizacionales</div><table><tr><td width="50%"><table width="100%" class="tableInforme">'.$table_2.'</table></td><td width="50%">
<img src="' . $varPathProy . 'views/00_paginas/image_2.jpg" width="400px" /></td></tr></table>';
else
	$varcontent_table2 = '';

if($table_3!='')
	$varcontent_table3 ='<div class="text-center" style="color:#4C7196;font-weight: bold;font-size: 12pt;margin: 8px;margin:0 auto 0 auto; width:450px;">Ranking por Relación - Competencias Pedagógicas</div><table class="tableInforme">'.$table_3.'</table>
<img src="' . $varPathProy . 'views/00_paginas/image_3.jpg" width="100%" />';
else
	$varcontent_table3 = '';

if($table_4!='')
	$varcontent_table4 ='<div class="text-center" style="color:#4C7196;font-weight: bold;font-size: 12pt;margin: 8px;margin:0 auto 0 auto; width:450px;">Ranking por Relación - Competencias Valores Organizacionales</div><table class="tableInforme">'.$table_4.'</table>
<img src="' . $varPathProy . 'views/00_paginas/image_4.jpg" width="100%" />';
else
	$varcontent_table4 = '';


if($table_5!='')
	$varcontent_table5 ='<div class="text-center" style="color:#4C7196;font-weight: bold;font-size: 12pt;margin: 8px;margin:0 auto 0 auto; width:450px;">Ranking por Relación Conductas - Competencias Pedagógicas</div><table class="tableInforme">'.$table_5.'</table>';
else
	$varcontent_table5 = '';

if($table_6!='')
	$varcontent_table6 ='<div class="text-center" style="color:#4C7196;font-weight: bold;font-size: 12pt;margin: 8px;margin:0 auto 0 auto; width:450px;">Ranking por Relación Conductas - Valores Organizacionales</div><table class="tableInforme">'.$table_6.'</table>';
else
	$varcontent_table6 = '';


if($pedag_1!='')
	$varcontent_pedag1 = '<div class="texto">' . str_replace('<br>','',$pedag_1)  . '</div>';
else
	$varcontent_pedag1 = '';

if($valor_1!='')
	$varcontent_valor1 = '<div class="texto">' . str_replace('<br>','',$valor_1) . '</div>';
else
	$varcontent_valor1 = '';

if($comen_1!='')
	$varcontent_comen1 = '<div class="texto">' . str_replace('<br>','',$comen_1)  . '</div>';
else
	$varcontent_comen1 = '';

$varcontent .=utf8_decode($varcontent_table1).utf8_decode($varcontent_table2).utf8_decode($varcontent_table3).utf8_decode($varcontent_table4).utf8_decode($varcontent_table5).utf8_decode($varcontent_table6).utf8_decode($varcontent_comen1).utf8_decode($varcontent_pedag1).utf8_decode($varcontent_valor1).
'</body>
</html>';



$dompdf->load_html(stripslashes($varcontent));
$dompdf->render();
file_put_contents('Reporte.pdf', $dompdf->output());
//$dompdf->stream($varPathProy.'aplicacion/views/00_paginas/Reporte.pdf');

/*$varContBody= ob_get_clean();
$dompdf->load_html($varContBody);
$dompdf->render();
$pdf = $dompdf->output();
file_put_contents("reporte_1.pdf", $pdf);
$dompdf->stream("remibrok.pdf");*/

?>
<!--<html>
<head>

</head>
<body>

	<table><?/*=$table_1*/?></table>

	<table><?/*=$table_2*/?></table>

	<table><?/*=$table_3*/?></table>

	<table><?/*=$table_4*/?></table>

	<table><?/*=$table_5*/?></table>

	<table><?/*=$table_6*/?></table>
</body>


</html>-->


