//var nombreJs = "/multicines_funciones/calendar/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js";
//document.write('');

// variables globales
var intCodigoOpcion; // Almacena el código de la opción del menu que se abra (uso en métricas)


// deshabilita el click derecho y anula el menu de contexto
function deshabilita_click_derecho() {
    if (!document.rightclickdisabled) {
        document.oncontextmenu = deshabilita_click_derecho;
        return document.rightclickdisabled = true;
    }

    return false;
}

// deshabilita el F5
function deshabiita_F5(input_event) {
    // declaracion de variables
    var var_keycode;

    // recupero el codigo de la tecla pulsada (FF)	
    var_keycode = input_event.charCode || input_event.keyCode;

    // no permite ni el F5 (116)
    if (var_keycode == 116) {
        if (window.event) {
            input_event.keyCode = 0;
            input_event.returnValue = false;
        } else { input_event.preventDefault(); }
    }
    // no permite el Ctrl + R (82)
    else if ((input_event.ctrlKey) && (var_keycode == 82)) {
        if (window.event) input_event.returnValue = false;
        else input_event.preventDefault();
    }
    // no permite el BackSpace y solo perimite en Text, Textarea o Password
    else if (var_keycode == 8) {
        valor = document.activeElement.value;
        if (valor == undefined) {
            if (window.event) input_event.returnValue = false;
            else input_event.preventDefault();
        } else {
            if (document.activeElement.getAttribute('type') == null) {
                if (window.event) input_event.returnValue = false;
                else input_event.preventDefault();
            } //Evita Back en null.
            if (document.activeElement.getAttribute('type') == 'select-one') {
                if (window.event) input_event.returnValue = false;
                else input_event.preventDefault();
            } //Evita Back en select.
            if (document.activeElement.getAttribute('type') == 'button') {
                if (window.event) input_event.returnValue = false;
                else input_event.preventDefault();
            } //Evita Back en button.
            if (document.activeElement.getAttribute('type') == 'radio') {
                if (window.event) input_event.returnValue = false;
                else input_event.preventDefault();
            } //Evita Back en radio.
            if (document.activeElement.getAttribute('type') == 'checkbox') {
                if (window.event) input_event.returnValue = false;
                else input_event.preventDefault();
            } //Evita Back en checkbox.
            if (document.activeElement.getAttribute('type') == 'file') {
                if (window.event) input_event.returnValue = false;
                else input_event.preventDefault();
            } //Evita Back en file.
            if (document.activeElement.getAttribute('type') == 'reset') {
                if (window.event) input_event.returnValue = false;
                else input_event.preventDefault();
            } //Evita Back en reset.
            if (document.activeElement.getAttribute('type') == 'submit') {
                if (window.event) input_event.returnValue = false;
                else input_event.preventDefault();
            } //Evita Back en submit.
            else //Text, textarea o password
            {
                if (document.activeElement.value.length == 0) {
                    //No realiza el backspace(largo igual a 0).
                    if (window.event) input_event.returnValue = false;
                    else input_event.preventDefault();
                } else {
                    //Realiza el backspace.
                    document.activeElement.value.keyCode = 8;
                }
            }
        }
    }
}

/**
 * obtiene el mensaje de error y lo despliega
 * @param parResponse JSON devuelto
 */
function mostrarMensajeError(objResponse) {
    var msgError;
    $.each(objResponse, function(i, p) {
        message(1, 400, p.descripcion);
    })



}

/**
 * muestra los mensajes según sus estados
 * @param type    0=success | >=1=warning
 * @param status  400=warning | <>400=danger
 * @param text    message show
 */
function message(type, status, text) {
    var varTitle;
    var varClass;
    if (type == 0) {
        varTitle = '&Eacute;xito';
        varClass = 'success';
    } else {
        if (status == 400 || status == 0) {
            varTitle = 'Advertencia';
            varClass = 'color warning';
        } else {
            varTitle = 'Alerta';
            varClass = 'danger';
        }
    }
    $.gritter.add({
        title: varTitle,
        text: text,
        class_name: varClass
    });
}


// levanta una ventana emergente (popup window)
function get_ventana_emergente(input_vent_iden, input_vent_url, input_opci_scrollbars, input_opci_resizable, input_width, input_height, input_position_left, input_position_top) {
    // declaracion de variables
    var var_ventana_emergente, var_screen_width, var_screen_height;
    var var_CN_marghori = 15,
        var_CN_margvert = 60;

    // inicializacion de variables
    var_screen_width = screen.width;
    var_screen_height = screen.height;

    // controla el ancho maximo de la ventana
    if (input_width > var_screen_width - var_CN_marghori) {
        input_width = var_screen_width - var_CN_marghori;
        input_position_left = "";
    }

    // controla el alto maximo de la ventana
    if (input_height > var_screen_height - var_CN_margvert) {
        input_height = var_screen_height - var_CN_margvert;
        input_position_top = "";
    }

    // si no se ha pasado la posicion horizontal se centra la ventana
    if (input_position_left == "") input_position_left = (var_screen_width - input_width) / 2;

    // si no se ha pasado la posicion vertical se centra la ventana
    if (input_position_top == "") input_position_top = ((var_screen_height - input_height) / 2) - var_CN_margvert;

    // levanta la ventana emergente
    var_ventana_emergente = window.open(input_vent_url, input_vent_iden, "resizable=" + input_opci_resizable + ",scrollbars=" + input_opci_scrollbars + ",width=" + input_width + ",height=" + input_height + ",left=" + input_position_left + ",top=" + input_position_top);

    // devuelve el objeto puntero a la ventana emergente
    return var_ventana_emergente;
}

// llena el numero de caracteres de un area en un texbox indicador y limita ingresar mas de un maximo
function llena_cuenta_caracteres(input_numero_maximo, input_object_area, input_object_text) {
    // declaracion de variables
    var var_numero_maximo, var_textarea_largo, var_textarea_valor;

    // inicializacion de variables
    var_numero_maximo = input_numero_maximo;
    var_textarea_valor = input_object_area.value;
    var_textarea_largo = input_object_area.value.length;

    // actualizo el numero de caracteres de inicio
    input_object_text.value = var_numero_maximo - var_textarea_largo;

    // verifica si debe truncar el texto si ingresa mas del maximo
    if (var_textarea_largo >= var_numero_maximo) {
        input_object_area.value = var_textarea_valor.substring(0, var_numero_maximo)
        input_object_text.value = 0;
    }
}

// verifica si un texto es un e-mail
function get_validacion_email(input_text) {
    // declaracion de variables
    var var_cuenta_ampersand = 0,
        var_cuenta_punto = 0,
        var_permite_cuenta_punto, var_i;

    // verifica que el texto este lleno
    if (input_text == "") return false;

    // recorre el texto contando los @
    for (var_i = 0; var_i < input_text.length; var_i++) {
        if (input_text.substring(var_i, var_i + 1) == "@") var_cuenta_ampersand++;
    }

    // valida que exista solo 1 @
    if (var_cuenta_ampersand != 1) return false;

    // recorre el texto contando los . despues del @
    var_permite_cuenta_punto = false;
    for (var_i = 0; var_i < input_text.length; var_i++) {
        if (input_text.substring(var_i, var_i + 1) == "@") var_permite_cuenta_punto = true;
        if ((var_permite_cuenta_punto) && (input_text.substring(var_i, var_i + 1) == ".")) var_cuenta_punto++;
    }

    // valida que exista solo 1 o 2 o 3
    if ((var_cuenta_punto != 1) && (var_cuenta_punto != 2) && (var_cuenta_punto != 3)) return false;

    // valida que el ultimo caracter no sea .
    if (input_text.substring(input_text.length - 1, input_text.length) == ".") return false;

    // devuelve el resultado de la validacion
    return true;
}

// verifica si un texto es un e-mail
function get_validacion_digitoverificador(input_text) {
    // declaracion de variables
    var var_i, var_coef, var_resucoef, var_acumcoef;
    var var_residuo, var_digiveri, var_decidigi_cedu;
    var var_digiprov;

    // verifica que el texto este lleno
    if (input_text == "") return false;

    // verifica que la longitud sea de 10 caracteres
    if (input_text.length != 10) return false;

    // verifica que los dos primeros caracteres esten en el rango de las provincias
    var_digiprov = parseFloat(input_text.substring(0, 2));
    if ((var_digiprov < 1) || (var_digiprov > 24)) return false;

    // recorre los 9 digitos de la cedula multiplicando por los COEFICIENTES (212121212)
    var_acumcoef = 0;
    for (var_coef = 2, var_i = 0; var_i < 9; var_i++) {
        // separa el digito de la cedula
        var_digicedu = parseInt(input_text.substring(var_i, var_i + 1));

        // obtiene el resultado parcial del digito co nel coeficiente
        var_resucoef = var_digicedu * var_coef;
        if (var_resucoef >= 10) var_resucoef = var_resucoef - 9;

        // acumulo los resultados de coeficientes
        var_acumcoef = var_acumcoef + var_resucoef;

        // alterna el coeficiente
        if (var_coef == 2) var_coef = 1;
        else var_coef = 2;
    }

    // recupera el residuo	
    var_residuo = var_acumcoef % 10;

    // obtiene el digito verificador
    if (var_residuo == 0)
        var_digiveri = 0;
    else
        var_digiveri = 10 - var_residuo;

    // compara el digito verificador con el 10 digito de la cedula
    var_decidigi_cedu = input_text.substring(9, 10);

    // devuelve el resultado de la validacion
    if (var_digiveri == var_decidigi_cedu)
        return true;
    else
        return false;
}
/*
// verifica que una fecha sea valida
function get_validacion_fecha (input_dia, input_mes, input_anio)
{
	// declaracion de variables
	var var_ultimo_dia;

	// realiza la validacion solo si todos los datos estan completos
	if ((input_dia != '')&&(input_mes != '')&&(input_anio != ''))
	{
		var_ultimo_dia = get_month_lastday (parseFloat(input_mes), parseFloat(input_anio));
		if ((parseFloat(input_dia)<1)||(parseFloat(input_dia)>var_ultimo_dia)) return false
	}

	// devuelve el resultado de la validacion
	return true;
}
*/
// recupera el ultimo dia del mes en un anio
function get_month_lastday(input_mes, input_anio) {
    // declaracion de variables
    var var_ultimo_dia, var_division_decimal, var_division_entera

    // enero / marzo / mayo / julio / agosto / octubre / diciembre
    if ((input_mes == 1) || (input_mes == 3) || (input_mes == 5) || (input_mes == 7) || (input_mes == 8) || (input_mes == 10) || (input_mes == 12)) {
        var_ultimo_dia = 31;
    }

    // abril / junio / septiembre / noviembre
    else if ((input_mes == 4) || (input_mes == 6) || (input_mes == 9) || (input_mes == 11)) {
        var_ultimo_dia = 30;
    }

    // febrero (valida anio bisiciesto)
    else if (input_mes == 2) {
        var_division_decimal = input_anio / 4;
        var_division_entera = parseInt(var_division_decimal);
        if (var_division_decimal == var_division_entera) var_ultimo_dia = 29;
        else var_ultimo_dia = 28;
    }

    // devuelve el ultimo dia del mes
    return var_ultimo_dia;
}

// controla el ingreso del punto decimal y el numero de decimales permitidos en un objeto
function controla_digitacion_decimal(input_event, input_object, input_decimales) {
    var navegador = navigator.appName

    if (navegador == "Microsoft Internet Explorer") {
        //Limita un control a números con dos decimales.
        var texto = input_object.value;
        var coma = texto.indexOf('.');


        if (input_event.keyCode <= 13 || (input_event.keyCode >= 48 && input_event.keyCode <= 57)) {
            if ((coma != -1) && (texto.length - (coma + 1)) >= input_decimales) {
                return false;
            }
        } else if (input_event.keyCode == 46 && texto.length > 1 && input_decimales > 0) {
            if (coma != -1 && texto.indexOf('.', coma) != -1) {
                return false;
            }
        } else {
            return false;
        }
        return true;
    } else {
        // declaracion de variables
        var var_deci_posi, var_nume_leng, var_nume_deci, var_keycode;

        // recupero el codigo de la tecla pulsada (FF)
        var_keycode = input_event.charCode || input_event.keyCode;
        // permite el ingreso de caracteres de navegacion (FF)
        // delete / suprimir (se confunde con .) / tab / enter / F5 / <- / -> (se confunde con ') (FF)
        //if ((!window.event)&&((var_keycode == 8)||(var_keycode == 46)||(var_keycode == 9)||(var_keycode == 13)||(var_keycode == 116)||(var_keycode == 37)||(var_keycode == 39))) return true;

        if ((!window.event) && ((var_keycode == 8) || (var_keycode == 9) || (var_keycode == 13) || (var_keycode == 37))) return true;

        // si no permite decimales entonces solo puede digitar numeros
        if (input_decimales != 0) {
            // valida que la tecla digitada este en el rango de los numeros + el punto decimal (FF)
            if (((var_keycode < 48) || (var_keycode > 57)) && (var_keycode != 46) && (var_keycode != 45))
                if (window.event) input_event.returnValue = false;
                else input_event.preventDefault();

                // valida si ya existe un punto decimal
            if ((input_object.value.indexOf('.') != -1) && (var_keycode == 46))
                if (window.event) input_event.returnValue = false;
                else input_event.preventDefault();

                // valida si ya existe un -
            if ((input_object.value.indexOf('-') != -1) && (var_keycode == 45))
                if (window.event) input_event.returnValue = false;
                else input_event.preventDefault();

                // valida el numero de decimales
            var_deci_posi = input_object.value.indexOf('.')
            if (var_deci_posi != -1) {
                var_nume_leng = input_object.value.length
                var_nume_deci = var_nume_leng - var_deci_posi;
                if (var_nume_deci > input_decimales)
                    if (window.event) input_event.returnValue = false;
                    else input_event.preventDefault();
            }
        } else {

            // valida que la tecla digitada este en el rango de los numeros
            if ((var_keycode < 48) || (var_keycode > 57))
                if (window.event) input_event.returnValue = false;
                else input_event.preventDefault();
        }

    }
}

// controla el ingreso de caracteres en un text o areabox (sin caracteres raros y sin espacios)
function controla_digitacion_textolimpio(input_event, input_object) {
    // declaracion de variables
    var var_keycode, var_keychar;
    var var_exprregu = /[a-zA-Z0-9\b\r\n\f\t]/;

    // recupero el codigo de la tecla pulsada (FF)	
    var_keycode = input_event.charCode || input_event.keyCode;
    var_keychar = String.fromCharCode(var_keycode);

    // salta el caracter TAB/DELETE/SUPR/FLECHAS<-/FLECHAS-> (FireFox)
    //if ((var_keycode != 9)&&(var_keycode != 8)&&(var_keycode != 46)&&(var_keycode != 37)&&(var_keycode != 39))
    //{
    // valida el caracter digitado
    if (!var_exprregu.test(var_keychar)) {
        if (window.event) input_event.returnValue = false;
        else input_event.preventDefault();
    }
    //}
}

// controla el ingreso de caracteres en un text o areabox (solo numeros y puntos)
function controla_digitacion_textoIP(input_event, input_object) {
    // declaracion de variables
    var var_keycode, var_keychar;
    var var_exprregu = /[0-9]|(\.)/

    // recupero el codigo de la tecla pulsada (FF)	
    var_keycode = input_event.charCode || input_event.keyCode;
    var_keychar = String.fromCharCode(var_keycode);

    // permite el ingreso de caracteres de navegacion (FF)
    // delete / suprimir (se confunde con .) / tab / enter / F5 / <- / -> (se confunde con ') (FF)
    //if ((!window.event)&&((var_keycode == 8)||(var_keycode == 46)||(var_keycode == 9)||(var_keycode == 13)||(var_keycode == 116)||(var_keycode == 37)||(var_keycode == 39))) return true;
    if ((!window.event) && ((var_keycode == 8) || (var_keycode == 9) || (var_keycode == 13) || (var_keycode == 116) || (var_keycode == 37))) return true;

    // valida el caracter digitado
    if (!var_exprregu.test(var_keychar)) {
        if (window.event) input_event.returnValue = false;
        else input_event.preventDefault();
    }
}

// redondea un numero
function redondea_valor_numerico(input_numero, input_decimales, input_decimal_char) {
    // declaracion de variables
    var var_rounder;
    var var_decimales;
    var var_ceros;
    var var_i;

    if (input_decimales > 0) {
        if ((input_numero.toString().length - input_numero.toString().lastIndexOf(input_decimal_char)) > (input_decimales + 1)) {
            var_rounder = Math.pow(10, input_decimales);
            input_numero = Math.round(input_numero * var_rounder) / var_rounder;

            var_ceros = "";
            var_decimales = input_numero.toString().length - input_numero.toString().lastIndexOf(input_decimal_char) - 1;

            if (input_numero.toString().lastIndexOf(input_decimal_char) > 0) {
                for (var_i = var_decimales; var_i < input_decimales; var_i++) {
                    var_ceros = var_ceros + "0";
                }
                input_numero = input_numero + var_ceros;
            } else {
                for (var_i = 0; var_i < input_decimales; var_i++) {
                    var_ceros = var_ceros + "0";
                }
                input_numero = input_numero + "." + var_ceros;
            }

            return input_numero;
        } else {
            var_ceros = "";
            var_decimales = input_numero.toString().length - input_numero.toString().lastIndexOf(input_decimal_char) - 1;

            if (input_numero.toString().lastIndexOf(input_decimal_char) > 0) {
                for (var_i = var_decimales; var_i < input_decimales; var_i++) {
                    var_ceros = var_ceros + "0";
                }
                input_numero = input_numero + var_ceros;
            } else {
                for (var_i = 0; var_i < input_decimales; var_i++) {
                    var_ceros = var_ceros + "0";
                }
                input_numero = input_numero + "." + var_ceros;
            }

            return input_numero;
        }
    } else
        return Math.round(input_numero);
}

// cambia el texto de un TD
function cambia_innerText(input_object_TD, input_texto) {
    if (document.all)
        input_object_TD.innerText = input_texto;
    else
        input_object_TD.textContent = input_texto;
}

// llena combos select desde arreglos de datos
function llena_combo_total_array(input_object, input_object_type, input_RR_codi, input_RR_text, input_value, input_initial_option, input_initialoption_codi, input_initialoption_text) {
    // declaracion de varialbes
    var var_largo_array, var_largo_actual, var_i;

    // inicializacion de variables
    var_largo_array = input_RR_codi.length;
    input_object.length = 0;

    // verifica si tiene opcion de inicio
    if (input_initial_option) {
        input_object.length = input_object.length + 1;
        input_object.options[0].value = input_initialoption_codi;
        input_object.options[0].text = input_initialoption_text;
    }

    // verifica si esta llenando un combo simple o multiple
    var_largo_actual = input_object.length;
    if (input_object_type == "S") {
        // llena todos los elementos de la lista
        for (var_i = 0; var_i < var_largo_array; var_i++) {
            input_object.length = input_object.length + 1;
            input_object.options[var_largo_actual + var_i].value = input_RR_codi[var_i];
            input_object.options[var_largo_actual + var_i].text = input_RR_text[var_i];
        }
        // ubica el elemento de la lista por defecto
        if (input_value != "") input_object.value = input_value;
    } else {
        // llena todos los elementos de la lista verficando si deben estar seleccionados
        for (var_i = 0; var_i < var_largo_array; var_i++) {
            input_object.length = input_object.length + 1;
            input_object.options[input_object.length - 1].value = input_RR_codi[var_i];
            input_object.options[input_object.length - 1].text = input_RR_text[var_i];
            if (input_value != "") {
                if (input_value.indexOf("," + input_RR_codi[var_i] + ",") != -1)
                    input_object.options[input_object.length - 1].selected = true;
            }
        }
    }
}

// llena combos select desde arreglos de datos filtrando registros
function llena_combo_selective_array(input_object, input_object_type, input_RR_filt, input_RR_codi, input_RR_text, input_filtro, input_value, input_initial_option, input_initialoption_codi, input_initialoption_text) {
    // declaracion de varialbes
    var var_largo_array, var_largo_actual, var_i;

    // inicializacion de variables
    var_largo_array = input_RR_codi.length;
    input_object.length = 0;

    // verifica si tiene que añadir una opcion al inicio
    if (input_initial_option) {
        input_object.length = input_object.length + 1;
        input_object.options[input_object.length - 1].value = input_initialoption_codi;
        input_object.options[input_object.length - 1].text = input_initialoption_text;
    }

    // verifica si esta llenando un combo simple o multiple
    var_largo_actual = input_object.length;
    if (input_object_type == "S") {
        // llena todos los elementos de la lista
        for (var_i = 0; var_i < var_largo_array; var_i++) {
            if (input_RR_filt[var_i] == input_filtro) {
                input_object.length = input_object.length + 1;
                input_object.options[input_object.length - 1].value = input_RR_codi[var_i];
                input_object.options[input_object.length - 1].text = input_RR_text[var_i];
            }
        }
        // ubica el elemento de la lista por defecto
        if (input_value != "") input_object.value = input_value;
    } else {
        // llena todos los elementos de la lista
        for (var_i = 0; var_i < var_largo_array; var_i++) {
            if (input_RR_filt[var_i] == input_filtro) {
                input_object.length = input_object.length + 1;
                input_object.options[input_object.length - 1].value = input_RR_codi[var_i];
                input_object.options[input_object.length - 1].text = input_RR_text[var_i];
                if (input_value != "") {
                    if (input_value.indexOf("," + input_RR_codi[var_i] + ",") != -1)
                        input_object.options[input_object.length - 1].selected = true;
                }
            }
        }
    }
}

// llena combos select desde arreglos de datos filtrando registros
function llena_combo_selective_doublearray(input_object, input_object_type, input_RR_filt_1, input_RR_filt_2, input_RR_codi, input_RR_text, input_filtro_1, input_filtro_2, input_value, input_initial_option, input_initialoption_codi, input_initialoption_text) {
    // declaracion de varialbes
    var var_largo_array, var_largo_actual, var_i;

    // inicializacion de variables
    var_largo_array = input_RR_codi.length;
    input_object.length = 0;

    // verifica si tiene que añadir una opcion al inicio
    if (input_initial_option) {
        input_object.length = input_object.length + 1;
        input_object.options[input_object.length - 1].value = input_initialoption_codi;
        input_object.options[input_object.length - 1].text = input_initialoption_text;
    }

    // verifica si esta llenando un combo simple o multiple
    var_largo_actual = input_object.length;
    if (input_object_type == "S") {
        // llena todos los elementos de la lista
        for (var_i = 0; var_i < var_largo_array; var_i++) {
            if ((input_RR_filt_1[var_i] == input_filtro_1) && (input_RR_filt_2[var_i] == input_filtro_2)) {
                input_object.length = input_object.length + 1;
                input_object.options[input_object.length - 1].value = input_RR_codi[var_i];
                input_object.options[input_object.length - 1].text = input_RR_text[var_i];
            }
        }
        // ubica el elemento de la lista por defecto
        if (input_value != "") input_object.value = input_value;
    } else {
        // llena todos los elementos de la lista
        for (var_i = 0; var_i < var_largo_array; var_i++) {
            if ((input_RR_filt_1[var_i] == input_filtro_1) && (input_RR_filt_2[var_i] == input_filtro_2)) {
                input_object.length = input_object.length + 1;
                input_object.options[input_object.length - 1].value = input_RR_codi[var_i];
                input_object.options[input_object.length - 1].text = input_RR_text[var_i];
                if (input_value != "") {
                    if (input_value.indexOf("," + input_RR_codi[var_i] + ",") != -1)
                        input_object.options[input_object.length - 1].selected = true;
                }
            }
        }
    }
}

// concatena datos a combos select desde arreglos de datos filtrando registros
function concatena_combo_selective_array(input_object, input_object_type, input_RR_filt, input_RR_codi, input_RR_text, input_filtro, input_value) {
    // declaracion de varialbes
    var var_largo_array, var_largo_actual, var_i;

    // inicializacion de variables
    var_largo_array = input_RR_codi.length;

    // verifica si esta llenando un combo simple o multiple
    var_largo_actual = input_object.length;
    if (input_object_type == "S") {
        // llena todos los elementos de la lista
        for (var_i = 0; var_i < var_largo_array; var_i++) {
            if (input_RR_filt[var_i] == input_filtro) {
                input_object.length = input_object.length + 1;
                input_object.options[input_object.length - 1].value = input_RR_codi[var_i];
                input_object.options[input_object.length - 1].text = input_RR_text[var_i];
            }
        }
        // ubica el elemento de la lista por defecto
        if (input_value != "") input_object.value = input_value;
    } else {
        // llena todos los elementos de la lista
        for (var_i = 0; var_i < var_largo_array; var_i++) {
            if (input_RR_filt[var_i] == input_filtro) {
                input_object.length = input_object.length + 1;
                input_object.options[input_object.length - 1].value = input_RR_codi[var_i];
                input_object.options[input_object.length - 1].text = input_RR_text[var_i];
                if (input_value != "") {
                    if (input_value.indexOf("," + input_RR_codi[var_i] + ",") != -1)
                        input_object.options[input_object.length - 1].selected = true;
                }
            }
        }
    }
}

// verifica que un texto de un objeto este lleno
function get_validacion_texto(input_object, input_mensaje) {
    // valida si el objeto tiene texto ingresado
    if (input_object.value.length == 0) {
        alert('El campo ' + input_mensaje + ' no ha sido ingresado.');
        //input_object.focus();
        return false;
    }

    // devuelve el resultado de la validacion
    return true;
}

// funcion que resta dos fechas y devuleve la diferencia en dias
function get_edadexacta(input_fechnaci_anio, input_fechnaci_mes, input_fechnaci_dia, input_fechactu_anio, input_fechactu_mes, input_fechactu_dia) {
    // declaracion de varialbes
    var var_dife, var_anios, var_meses, var__dias, var_result;

    // casos de error
    if (input_fechnaci_anio > input_fechactu_anio)
        var_result = -1;
    else if ((input_fechnaci_anio == input_fechactu_anio) && (input_fechnaci_mes > input_fechactu_mes))
        var_result = -1;
    else if ((input_fechnaci_anio == input_fechactu_anio) && (input_fechnaci_mes == input_fechactu_mes) && (input_fechnaci_dia > input_fechactu_dia))
        var_result = -1;
    else {
        // resta las partes suponiendo que las partes siempre son mayores
        var_anios = input_fechactu_anio - input_fechnaci_anio;
        var_meses = input_fechactu_mes - input_fechnaci_mes;
        var__dias = input_fechactu_dia - input_fechnaci_dia;

        // si los dias son negativos significa que no llego a cumplir el ultimo mes y se ajustan los dias
        if (var__dias < 0) {
            var_meses = var_meses - 1;
            var__dias = 30 + var__dias;
        }

        // si los meses son negativos significa que no llego a cumplir el ultimo anio y se ajustan los meses
        if (var_meses < 0) {
            var_anios = var_anios - 1;
            var_meses = 12 + var_meses;
        }

        // crea el texto de edad
        var_result = var_anios + " años, " + var_meses + " meses, " + var__dias + " días";
    }

    // retorno el resultado
    return var_result;
}

// funcion que resta dos fechas y devuleve la diferencia en dias
function resta_fechas(input_fech_inic, input_fech_fina) {
    // declaracion de varialbes
    var var_dife, var_dias;

    // resta las fechas
    var_dife = input_fech_fina.getTime() - input_fech_inic.getTime();

    // transformo los milisegundos a dias
    var_dias = Math.round(var_dife / (1000 * 60 * 60 * 24))

    // retorno el resultado
    return var_dias;
}

// funcion que remplaza una cadena de texto por otra
function remplaza_texto(input_string, input_texto, input_nuevo) {
    // declara variable
    var var_texto_nuevo = input_string;

    do {
        var_texto_nuevo = var_texto_nuevo.replace(input_texto, input_nuevo);
    } while (var_texto_nuevo.indexOf(input_texto) >= 0);

    // retorna el resultado
    return var_texto_nuevo;
}

// Funciones para buscar 
function searchForText(toFind, frameToSearch) {
    if (!toFind) { window.alert('No ha ingresado un texto de búsqueda'); return; }
    if (frameToSearch.focus) { frameToSearch.focus(); }
    if (window.find) {
        //Netscape compatible browsers provide the window.find method
        if (document.layers) {
            //Against the JS spec, Netscape 4 will produce errors if too many arguments are given
            var ifFound = frameToSearch.find(toFind, false, false);
        } else {
            var ifFound = frameToSearch.find(toFind, false, false, true, false, true, false);
        }
    } else if (frameToSearch.document.body && frameToSearch.document.body.createTextRange) {
        //IE or compatible use various TextRange features
        if (frameToSearch.document.selection && frameToSearch.document.selection.type != 'None') {
            //If some text is selected already (previous search or if they have selected it)
            //make that the text range. Then move to the end of it to search beyond it
            var theRange = frameToSearch.document.selection.createRange();
            theRange.collapse(false);
        } else {
            //If no text is selected, start from the start of the document
            var theRange = frameToSearch.document.body.createTextRange();
        }
        //find the next occurrence of the chosen string
        var ifFound = theRange.findText(toFind);
        if (ifFound) { theRange.select(); }
    } else {
        alert('Debe utilizar la facilidad de búsqueda de su browser');
    }
    if (!ifFound) { alert('No se pudo encontrar el texto:\n' + toFind); }
}


/* **************************************************************************************************************************************************************** */
/*
function grafica_chart_linea (chartData,chartDiv)
{
	// declaracion de varialbs
	var chart;
	var graph;

	// serial chart
	chart = new AmCharts.AmSerialChart();	
	chart.dataProvider = chartData;
	chart.marginLeft = 10;
	chart.categoryField = "dato";
	chart.startDuration = 1;
	
	// value
	var valueAxis = new AmCharts.ValueAxis();
	valueAxis.axisAlpha = 0;
	valueAxis.inside = false;
	chart.addValueAxis(valueAxis);

	// graph
	graph = new AmCharts.AmGraph();
	graph.type = "smoothedLine";
	graph.valueField = "value";
	graph.balloonText = "[[category]]: [[value]]";
	graph.lineColor = "#00ff00";
	graph.negativeLineColor = "#f40000";
	graph.bullet = "round";
	graph.bulletSize = 5;
	graph.lineThickness = 1;
	chart.addGraph(graph);

	// write
	chart.write(chartDiv);
}

function grafica_chart_multiplelinea (chartData,chartSerie,chartDiv)
{
	// declaracion de varialbs
	var chart;
	var graph;
	var var_i;

	// serial chart
	chart = new AmCharts.AmSerialChart();	
	chart.dataProvider = chartData;
	chart.marginLeft = 10;
	chart.categoryField = "dato";
	chart.startDuration = 1;
	
	// value
	var valueAxis = new AmCharts.ValueAxis();
	valueAxis.axisAlpha = 0;
	valueAxis.inside = false;
	chart.addValueAxis(valueAxis);

	// graph
	for (var_i=0; var_i<chartSerie.length; var_i++)
	{
		// setea las variables de la serie
		var_valofield = chartSerie[var_i]['iden'];
		var_nombfield = chartSerie[var_i]['nombre'];

		// dibuja la seria		
		graph = new AmCharts.AmGraph();	
		graph.type = "smoothedLine";
		graph.title = var_nombfield;
		graph.valueField = var_valofield;
		graph.balloonText = var_nombfield + " [[category]]: [[" + var_valofield + "]]";
		graph.bullet = "round";
		graph.bulletSize = 5;
		graph.lineThickness = 1;
		chart.addGraph(graph);
	}

	// legend
	var legend = new AmCharts.AmLegend();
	legend.markerType = "circle";
	chart.addLegend(legend);

	// write
	chart.write(chartDiv);
}

function grafica_chart_barrainicio (chartData,chartDiv,chartColor)
{
	// declaracion de varialbs
	var chart;
	var graph;

	// serial chart
	chart = new AmCharts.AmSerialChart();
	chart.dataProvider = chartData;
	chart.marginLeft = 0;
	chart.categoryField = "dato";
	chart.startDuration = 1;
    
    if(chartDiv=="gadgetR")
    {
    // category
		var categoryAxis = chart.categoryAxis;
		categoryAxis.labelRotation = 90;
    }
	// value
	var valueAxis = new AmCharts.ValueAxis();
	valueAxis.axisAlpha = 0;
	valueAxis.inside = false;
	valueAxis.labelsEnabled = false;
	chart.addValueAxis(valueAxis);

	// GRAPH
	var graph = new AmCharts.AmGraph();
	graph.type = "column";
	graph.valueField = "value";
	graph.balloonText = "[[category]]: [[value]]";
	graph.labelText = "[[value]]";
	graph.lineColor = chartColor;
	graph.lineAlpha = 0;
	graph.fillAlphas = 0.8;
	chart.addGraph(graph);

	// write
	chart.write(chartDiv);
}

function grafica_chart_barra (chartData,chartDiv,chartColor)
{
	// declaracion de varialbs
	var chart;
	var graph;
    
    
	// serial chart
	chart = new AmCharts.AmSerialChart();
	chart.dataProvider = chartData;
	chart.marginLeft = 0;
	chart.categoryField = "dato";
	chart.startDuration = 1;

//	// axes
	if ((chartDiv == "gadget" && chartDiv == "gadgetC") || chartColor == "CG")
	{
		// category
		var categoryAxis = chart.categoryAxis;
		categoryAxis.labelRotation = 90;
	}
    

	// value
	var valueAxis = new AmCharts.ValueAxis();
	valueAxis.axisAlpha = 0;
	valueAxis.inside = false;
	chart.addValueAxis(valueAxis);

	// GRAPH
	var graph = new AmCharts.AmGraph();
	graph.type = "column";
	graph.valueField = "value";
	graph.balloonText = "[[category]]: [[value]]";
	graph.labelText = "[[value]]";
    
    if (chartColor == "CG")
	{
        graph.colorField = "color";
    }
    else graph.lineColor = chartColor;
    
	graph.lineAlpha = 0;
	graph.fillAlphas = 0.8;
	chart.addGraph(graph);

	// write
	chart.write(chartDiv);
}

function grafica_chart_barra_hor (chartData,chartDiv,chartColor)
{
// SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = chartData;
    chart.categoryField = "dato";
    chart.startDuration = 1;
    chart.plotAreaBorderColor = "#DADADA";
    chart.plotAreaBorderAlpha = 1;
    // this single line makes the chart a bar chart          
    chart.rotate = true;

    // AXES
    // Category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.gridPosition = "start";
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.axisAlpha = 0;

    // Value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0;
    valueAxis.gridAlpha = 0.1;
    valueAxis.position = "top";
    chart.addValueAxis(valueAxis);

    // GRAPHS
    // first graph
    var graph1 = new AmCharts.AmGraph();
    graph1.type = "column";
    graph1.title = "Evaluaciones";
    graph1.valueField = "income";
    graph1.balloonText = "Evaluaciones:[[value]]";
    graph1.lineAlpha = 0;
    graph1.fillColors = "#ADD981";
    graph1.fillAlphas = 1;
    chart.addGraph(graph1);

    // second graph
    var graph2 = new AmCharts.AmGraph();
    graph2.type = "column";
    graph2.title = "Créditos";
    graph2.valueField = "expenses";
    graph2.balloonText = "Créditos:[[value]]";
    graph2.lineAlpha = 0;
    graph2.fillColors = "#81acd9";
    graph2.fillAlphas = 1;
    chart.addGraph(graph2);

    // LEGEND
    var legend = new AmCharts.AmLegend();
    chart.addLegend(legend);

    // WRITE
    chart.write(chartDiv);
}

function grafica_chart_barra_h (chartData,chartDiv,chartValoMaxi)
{
	// declaracion de varialbs
	var chart;
	var graph;
	var ide;

	// SERIAL CHART
	chart = new AmCharts.AmSerialChart();
	chart.dataProvider = chartData;
	chart.marginLeft = 10;
	chart.categoryField = "dato";
	chart.startDuration = 1;
	chart.rotate = true;

	// AXES
	// Category
//	var categoryAxis = chart.categoryAxis;
//	categoryAxis.gridPosition = "start";
//	categoryAxis.axisColor = "#DADADA";
//	categoryAxis.fillAlpha = 1;
//	categoryAxis.gridAlpha = 0;
//	categoryAxis.fillColor = "#FAFAFA";

	if ((chartDiv == "chartdivcap")||(chartDiv == "chartdivcapcomp"))
	{
		ide = "%";
	}
	else
	{
		ide = "";
	}

	// value
	var valueAxis = new AmCharts.ValueAxis();
//	valueAxis.axisColor = "#DADADA";
//	valueAxis.title = "Income in millions, USD";
	valueAxis.axisAlpha = 0;
	valueAxis.inside = false;
//	valueAxis.includeHidden = true;
	valueAxis.maximum = chartValoMaxi;
	valueAxis.minimum = 0;
	chart.addValueAxis(valueAxis);

//	valueAxis.gridAlpha = 0.1;
//	chart.addValueAxis(valueAxis);

	// GRAPH
	var graph = new AmCharts.AmGraph();
	graph.valueField = "value";
	graph.type = "column";
	graph.colorField = "color";
	graph.balloonText = "[[category]]:[[value]] " + ide;
	graph.labelText = "[[value]] " + ide;
	graph.lineAlpha = 0;
//	graph.fillColors = chartColor;
	graph.fillAlphas = 0.8;
	chart.addGraph(graph);

	// write
	chart.write(chartDiv);
}
*/
/*
function grafica_chart_pie (chartData,chartDiv,inputRadius)
{
    // declaracion de varialbs
    var chart;
    var graph;

	chart = new AmCharts.AmPieChart();
	chart.dataProvider = chartData;
	chart.titleField = "dato";
	chart.valueField = "value";
	chart.outlineColor = "#FFFFFF";
	chart.outlineAlpha = 0.8;
	chart.outlineThickness = 2;
    chart.labelRadius = inputRadius;
	chart.depth3D = 15;
	chart.angle = 30;

    // write
    chart.write(chartDiv);
}
*/
/*
function grafica_chart_radar (chartData,chartSerie,chartDiv)
{
	// declaracion de varialbs
	var chart;
	var graph;
	var var_i;

	// serial chart
	chart = new AmCharts.AmRadarChart();	
	chart.dataProvider = chartData;
	chart.marginLeft = 10;
	chart.categoryField = "dato";
	chart.startDuration = 1;
	
	// value
	var valueAxis = new AmCharts.ValueAxis();
	valueAxis.axisAlpha = 0.15;
	valueAxis.minimum = 0;
	valueAxis.dashLength = 3;
	valueAxis.axisTitleOffset = 20;
	valueAxis.gridCount = 5;
	chart.addValueAxis(valueAxis);

	// graph
	for (var_i=0; var_i<chartSerie.length; var_i++)
	{
		// setea las variables de la serie
		var_valofield = chartSerie[var_i]['iden'];
		var_nombfield = chartSerie[var_i]['nombre'];

		// dibuja la seria		
		graph = new AmCharts.AmGraph();	
		graph.title = var_nombfield;
		graph.valueField = var_valofield;
		graph.balloonText = var_nombfield + " [[category]]: [[" + var_valofield + "]]";
		graph.bullet = "round";
		graph.bulletSize = 3;
		graph.lineThickness = 2;
		graph.fillAlphas = 0.4;
		chart.addGraph(graph);
	}

	// legend
	var legend = new AmCharts.AmLegend();
	legend.markerType = "circle";
	chart.addLegend(legend);

	// write
	chart.write(chartDiv);
}
*/
/*
function grafica_chart_barra_triple (chartData,chartDiv,chartColor)
{
	// SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = chartData;
    chart.categoryField = "cargo";
    chart.startDuration = 1;
    chart.plotAreaBorderColor = "#DADADA";
    chart.plotAreaBorderAlpha = 1;
    // this single line makes the chart a bar chart          
    //chart.rotate = true;

    // AXES
    // Category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.gridPosition = "start";
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.axisAlpha = 0;

    // Value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0;
    valueAxis.gridAlpha = 0.1;
    valueAxis.position = "top";
    chart.addValueAxis(valueAxis);

    // GRAPHS
    // first graph
    var graph1 = new AmCharts.AmGraph();
    graph1.type = "column";
    graph1.title = "Activas";
    graph1.valueField = "Activas";
    graph1.balloonText = "Activas:[[value]]";
    graph1.lineAlpha = 0;
    graph1.fillColors = '#ff0f00';
    graph1.fillAlphas = 1;
    chart.addGraph(graph1);

    // second graph
    var graph2 = new AmCharts.AmGraph();
    graph2.type = "column";
    graph2.title = "Proceso";
    graph2.valueField = "Proceso";
    graph2.balloonText = "Proceso:[[value]]";
    graph2.lineAlpha = 0;
    graph2.fillColors = '#f07800';
    graph2.fillAlphas = 1;
    chart.addGraph(graph2);

    // second graph
    var graph3 = new AmCharts.AmGraph();
    graph3.type = "column";
    graph3.title = "Finalizadas";
    graph3.valueField = "Finalizadas";
    graph3.balloonText = "Finalizadas:[[value]]";
    graph3.lineAlpha = 0;
    graph3.fillColors = '#FF9E01';
    graph3.fillAlphas = 1;
    chart.addGraph(graph3);

    // WRITE
    chart.write(chartDiv);
}
*/

function ejecuta_div(tipo, url, data, div, codi) {
    var varCodi = "";

    if (codi == undefined) {
        varCodi = "";
    } else {
        varCodi = "/" + codi;
    }

    $.ajax({
        type: tipo,
        url: url + varCodi + "?id=" + Math.floor(Math.random() * 100000000),
        cache: false,
        data: data, // Adjuntar los campos del formulario enviado.
        beforeSend: function() {
            $(div).html('');
        },
        success: function(data) {
            $(div).html(data); // Mostrar la respuestas del script PHP.
        },
        error: function(xhr, ajaxOptions, thrownError) {
            $(div).html(xhr.responseText);
        }
    });

    return false; // Evitar ejecutar el submit del formulario.
}

/*
function funValidaTextoControl(parEControl,parENombCont)
{
	if (parEControl.value.length==0)
	{
		alert ('El campo ' + parENombCont + ' se encuentra vacío.');
		parEControl.focus();
		return false;
	}

	return true;
}
*/
/*
function llena_combo_ajax(parUrl,parECodigo,parETabla,parETablaCodigo,parERetornaCodigo,parERetornaNombre,parEComboLlenar)
{
	if(parECodigo != -1)
	{

		$.ajax({
           type: "POST",
           url: parUrl,
           cache: false,
           async: false,
           data: {"codigo":parECodigo,"tabla":parETabla,"tablacodigo":parETablaCodigo,"retornacodigo":parERetornaCodigo,"retornanombre":parERetornaNombre},

		   success: function(data)
           {
           		array = eval(data);
           			
           		$('[name=' + parEComboLlenar + ']').empty();

           		$.each(array, function(i, item) {
	    			$('[name=' + parEComboLlenar + ']').append("<option value=" + item.codigo + ">" + item.nombre);

				});


           },
           error: function (xhr, ajaxOptions, thrownError) {           	
	         alert(xhr.responseText);
	      }
		});
	}
	else
	{
		$('[name=' + parEComboLlenar + ']').empty();
	}
}
*/

function procesarRespuesta(ajaxResponse) {
    // serializamos el objeto a JSON si viene como string
    if (typeof ajaxResponse == "string")
        ajaxResponse = $.parseJSON(ajaxResponse);

    return ajaxResponse;
}

function separa_estructura_jsonresponse(parEResponse) {
    var arr_Resultado = new Array();
    var objData;

    // guarda la respuesta de resultado
    arr_Resultado['status'] = parEResponse['response'].status;
    arr_Resultado['message'] = parEResponse['response'].message;

    // separa el primero objeto de data
    objData = parEResponse['response'].data;

    // guarda la respuesta de paginacion
    arr_Resultado['total'] = objData.total;
    arr_Resultado['pages'] = objData.pages;
    arr_Resultado['items'] = objData.items;
    arr_Resultado['page'] = objData.page;
    arr_Resultado['data'] = objData.data;

    // retorna el arreglo de resultados
    return arr_Resultado;
}
/*
function ordenarSelect(id_componente)
{
    var selectToSort = jQuery('#' + id_componente);
    var optionActual = selectToSort.val();
    selectToSort.html(selectToSort.children('option').sort(function (a, b) {
        return a.text === b.text ? 0 : a.text < b.text ? -1 : 1;
    })).val(optionActual);
}

function nombreMes(numMes,entreCort)
{
    var entreCort = (entreCort)?entreCort:false;
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var salida = "";
    if(entreCort)
    {
        salida = meses[numMes-1].substring(0,3);
    }
    else
    {
        salida = meses[numMes-1];
    }

    return salida;

}
*/

/**
 * Impide el ingreso de números y caracteres especiales, o impide el ingreso de letras y caracteres especiales
 * @param option - 0=letters|1=numbers
 * @param event  - event of field
 * @param value  - value of field
 */
function letterOrNumber(option, event) {
    if (option == 0) {
        if ((event.which < 65 || event.which > 90) && (event.which < 97 || event.which > 122) &&
            (event.which != 0 && event.which != 8 && event.which != 32 && event.which != 39 && event.which != 193 &&
                event.which != 201 && event.which != 205 && event.which != 209 && event.which != 211 && event.which != 218 &&
                event.which != 225 && event.which != 233 && event.which != 237 && event.which != 241 && event.which != 243 &&
                event.which != 250 && event.which != 252))
            event.preventDefault();
    } else {
        if ((event.which < 48 || event.which > 57) && (event.which != 0 && event.which != 8))
            event.preventDefault();
    }
}


//Calendar Widget
function calendar_widget(par) {

    $('.ui-datepicker').empty();
    $('#ui-datepicker-div').remove();
    var widget = $("#" + par);
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

            /*dateFormat: "dd-mm-yy",
            firstDay: 1,*/
            dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ],
            /*monthNamesShort:
            		["Ene", "Feb", "Mar", "Abr", "May", "Jun",
            			"Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],*/

            onSelect: function(s, o) {
                var sd = new Date(s);
                var weekdayName = weekday[sd.getDay()];
                var monthName = month[sd.getMonth()];
                var monthDay = sd.getDate();

                console.log(sd, sd.getDay(), sd.getMonth(), sd.getDate());

                calNotesDay.html(weekdayName);
                calNotesDate.html(monthName + " --" + monthDay);
            }
        });
    }
}




/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}

$(document).on('change', '#fileUpload', function() {
    $('.avatar').removeClass('open');
});

$(document).on('click', '.avatar', function() {
    $(this).addClass('open');
});
// added code to close the modal if you click outside
$('html').click(function() {
    $('.avatar').removeClass('open');
});

$(document).on('click', '.avatar', function(event) {
    event.stopPropagation();
});