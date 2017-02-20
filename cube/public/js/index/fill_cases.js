var tamanio_matriz;
$(document).ready(function() {
    var operacion = '<div class="operacion"><div class="col-md-6"><label for="inputKey" class="col-md-3 control-label">Tipo Operación</label><select class="form-control tipo_operacion"><option value="1">UPDATE</option><option value="2">QUERY</option></select></div><div class="col-md-6"><div class="update_fields text-center"><label for="inputValue" class="col-md-3 control-label">UPDATE</label><div class="col-md-4"><input type="number" class="input_x_update" placeholder="Xn"><input type="number" class="input_y_update" placeholder="Yn" readonly="readonly"><input type="number" class="input_z_update" placeholder="Zn" readonly="readonly"><input type="number" class="input_w" placeholder="W"></div></div><div class="query_fields text-center" style="display: none;"><label for="inputValue" class="col-md-3 control-label">QUERY</label><div class="col-md-3"><input type="text" class="input_xa_query" placeholder="Xa"><input type="text" class="input_ya_query" placeholder="Ya" readonly="readonly"><input type="text" class="input_za_query" placeholder="Za" readonly="readonly"><br><input type="text" class="input_xb_query" placeholder="Xb"><input type="text" class="input_yb_query" placeholder="Yb" readonly="readonly"><input type="text" class="input_zb_query" placeholder="Zb" readonly="readonly"></div></div></div></div>';

    $.ajaxSetup({
        cache: false,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //Evento para enviar a procesar las operaciones y recibir/mostrar resultado
    $(document).on('click', '.calculate', function(e){
        e.preventDefault();
        e.stopPropagation();
        
        //Obtiene tamaño de matriz
        var operaciones = [];
        var numero_operaciones = $(this).parent().parent().children(".row").children(".col-md-6").children(".numero_operaciones").val();
        tamanio_matriz = $(this).parent().parent().children(".row").children(".col-md-6").children(".tamanio_matriz").val();

        //Obtiene arreglo de operaciones
        jQuery($(this).parent().parent().children(".operaciones").children(".operacion")).each(function(i,e) {
            var operacion = "";
            var tipo_operacion = "";
            var x_value = "";

            var tipo_operacion = $(this).find(".tipo_operacion option:selected").val();

            if (tipo_operacion == 1) {
                var x_value = $(this).find(".input_x_update").val();
                var w_value = $(this).find(".input_w").val();
                if (x_value.length == 0 || w_value.length == 0) {
                    bootbox.alert("X y W no pueden estar vacios.");
                    return false;
                }
                operacion = '{"tipo_operacion": "'+tipo_operacion+'", "line": "'+x_value+'", "value": "'+w_value+'"}';
            } else {
                var xa_value = $(this).find(".input_xa_query").val();
                var xb_value = $(this).find(".input_xb_query").val();
                if (xa_value.length == 0 || xb_value.length == 0) {
                    bootbox.alert("Xa y Xb no pueden estar vacios.");
                    return false;
                }
                operacion = '{"tipo_operacion": "'+tipo_operacion+'", "linea": "'+xa_value+'", "lineb": "'+xb_value+'"}';
            }

            operaciones.push(operacion);
        });

        $.ajax({
            type: "POST",
            url: "/calculate/",
            dataType:"json",
            async: false,
            data: {
                tamanio_matriz: tamanio_matriz,
                numero_operaciones: numero_operaciones,
                operaciones: operaciones
            },
            success: function(data) {
                if (data.success == 200) {
                    $("#myModal").find(".modal-body").empty();
                    jQuery(data.queryes).each(function(i,e) {
                        var query_readable = "<p> Resultado query "+(i+1)+": "+e+"</p>";
                        $("#myModal").find(".modal-body").append(query_readable);
                    });
                    $("#myModal").modal("show");
                } else {
                    bootbox.alert("Ocurrio un error al intentar procesar las operaciones solicitadas.");
                }
            }
        });

    });

    //Validación de el tamaño permitido de matriz
    $('.tamanio_matriz').keyup(function(e){
        e.preventDefault();
        e.stopPropagation();
        var inputValue = $(this).val();
        tamanio_matriz = inputValue;
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        if(inputValue > 100){
            bootbox.alert("Recuerda que el tamaño de la matriz no puede ser mayor a 50");
            $(this).val('');
            return false;
        }
        if(inputValue <= 0){
            bootbox.alert("Recuerda que el tamaño de la matriz no puede ser 0 o negativo");
            $(this).val('');
            return false;

        }
    });

    //Validación de el numero de operaciones permitido
    $('.numero_operaciones').keyup(function(e){
        e.preventDefault();
        e.stopPropagation();
        var inputValue = $(this).val();
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        if(inputValue > 1000){
            bootbox.alert("Recuerda que el numero de operaciones no puede ser mayor a 1000");
            $(this).val('');
            $(this).parent().parent().parent().children(".operaciones").empty();
            return false;
        }
        if(inputValue <= 0){
            bootbox.alert("Recuerda que el numero de operaciones no puede ser 0 o negativo");
            $(this).parent().parent().parent().children(".operaciones").empty();
            $(this).val('');
            return false;
        }
        //Añadimos las operaciones necesarias
        $(this).parent().parent().parent().children(".operaciones").empty();
        for (var i = 1; i <= inputValue; i++) {
            $(this).parent().parent().parent().children(".operaciones").append(operacion);
        }
    });

    //Evento de llenado de valores para y y z a partir del valor de x en update
    $(document).on('keyup', '.input_x_update', function(e){
        e.preventDefault();
        e.stopPropagation();
        var inputValue = $(this).val();
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            return false;
        }

        if (parseInt(inputValue) > parseInt(tamanio_matriz)) {
            bootbox.alert("El tamaño de tu matriz es de "+tamanio_matriz);
            $(this).val('');
            $(this).parent().children('.input_y_update').val('');
            $(this).parent().children('.input_z_update').val('');
            return false;
        }
        //Seteamos valores de Y y Z
        $(this).parent().children('.input_y_update').val(inputValue);
        $(this).parent().children('.input_z_update').val(inputValue);
    });

    //Evento de llenado de valores para y, z a partir del valor de x en query A
    $(document).on('keyup', '.input_xa_query', function(e){
        e.preventDefault();
        e.stopPropagation();
        var inputValue = $(this).val();
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            return false;
        }

        if (parseInt(inputValue) > parseInt(tamanio_matriz)) {
            bootbox.alert("El tamaño de tu matriz es de "+tamanio_matriz);
            $(this).val('');
            $(this).parent().children('.input_ya_query').val('');
            $(this).parent().children('.input_za_query').val('');
            return false;
        }
        //Seteamos valores de Y y Z
        $(this).parent().children('.input_ya_query').val(inputValue);
        $(this).parent().children('.input_za_query').val(inputValue);
    });

    //Evento de llenado de valores para y, z a partir del valor de x en query B
    $(document).on('keyup', '.input_xb_query', function(e){
        e.preventDefault();
        e.stopPropagation();
        var inputValue = $(this).val();
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            return false;
        }

        if (parseInt(inputValue) > parseInt(tamanio_matriz)) {
            bootbox.alert("El tamaño de tu matriz es de "+tamanio_matriz);
            $(this).val('');
            $(this).parent().children('.input_yb_query').val('');
            $(this).parent().children('.input_zb_query').val('');
            return false;
        }
        //Seteamos valores de Y y Z
        $(this).parent().children('.input_yb_query').val(inputValue);
        $(this).parent().children('.input_zb_query').val(inputValue);
    });

    //Evento de llenado de valores para w
    $('.input_w').keyup(function(e){
        e.preventDefault();
        e.stopPropagation();
        var inputValue = $(this).val();
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            return false;
        }

        if (parseInt(inputValue) < -1000000000) {
            bootbox.alert("El valor de W no puede ser menor a -10^9");
            $(this).val('');
            return false;
        }

        if (parseInt(inputValue) > 1000000000) {
            bootbox.alert("El valor de W no puede ser mayor a 10^9");
            $(this).val('');
            return false;
        }
    });

    //Evento para mostrar los campos de query o de update segun sea el caso
    $(document).on('change', '.tipo_operacion', function(e){
        e.preventDefault();
        e.stopPropagation();
        if ($(this).val() == 1){
            $(this).parent().parent().children(".col-md-6").children(".query_fields").hide();
            $(this).parent().parent().children(".col-md-6").children(".update_fields").show();
        } else {
            $(this).parent().parent().children(".col-md-6").children(".update_fields").hide();
            $(this).parent().parent().children(".col-md-6").children(".query_fields").show();
        }
    });

    

});