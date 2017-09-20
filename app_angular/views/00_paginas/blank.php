<?php
	// valida el acceso directo a la vista
	if ( ! defined('BASEPATH')) exit('No direct script access allowed');
?>

<html>
<head>
	<title><?php echo get_config_value($this,'app_name'); ?></title>
</head>

<?php

	// recupera el color de fondo
	if ($txtBGColor == "") $txtBGColor = "ffffff";
?>

<body bgcolor="#<?=$txtBGColor?>">
</body>
</html>