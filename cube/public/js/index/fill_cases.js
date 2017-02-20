var tamanio_matriz;
$(document).ready(function() {
    var operacion = '<div class="operacion"><div class="col-md-6"><label for="inputKey" class="col-md-3 control-label">Tipo Operación</label><select class="form-control tipo_operacion"><option value="1">UPDATE</option><option value="2">QUERY</option></select></div><div class="col-md-6"><div class="update_fields text-center"><label for="inputValue" class="col-md-3 control-label">UPDATE</label><div class="col-md-4"><input type="number" class="input_x_update" placeholder="Xn"><input type="number" class="input_y_update" placeholder="Yn" readonly="readonly"><input type="number" class="input_z_update" placeholder="Zn" readonly="readonly"><input type="number" class="input_w" placeholder="W"></div></div><div class="query_fields text-center" style="display: none;"><label for="inputValue" class="col-md-3 control-label">QUERY</label><div class="col-md-3"><input type="text" class="input_xa_query" placeholder="Xa"><input type="text" class="input_ya_query" placeholder="Ya" readonly="readonly"><input type="text" class="input_za_query" placeholder="Za" readonly="readonly"><br><input type="text" class="input_xa_query" placeholder="Xb"><input type="text" class="input_ya_query" placeholder="Yb" readonly="readonly"><input type="text" class="input_za_query" placeholder="Zb" readonly="readonly"></div></div></div></div>';

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
        var tipo_operacion = [];
        var numero_operaciones = $(this).parent().parent().find(".numero_operaciones").val();
        tamanio_matriz = $(this).parent().parent().find(".tamanio_matriz").val();


        //Obtiene arreglo de operaciones
        // jQuery($(this).parent().parent().find(".tipo_operacion option:selected")).each(function(i,e) {
        //     tipo_operacion[] = e.val();
        // });

        //Obtiene arreglo de operaciones
        jQuery($(this).parent().parent().find(".operacion")).each(function(i,e) {
            var operacion = "";
            var tipo_operacion = "";

            var tipo_operacion = $(this).find(".tipo_operacion option:selected").val();

            if (tipo_operacion == 1) {
                operacion = 
            } else {
                operacion = 
            }


        });

        $.ajax({
            type: "POST",
            url: "/calculate/",
            dataType:"json",
            async: false,
            data: {
                tamanio_matriz: tamanio_matriz,
                numero_operaciones: numero_operaciones,
                tipos_operaciones: tipo_operacion
            },
            success: function(data) {
                
            }
        });

    });

    //Validación de el tamaño permitido de matriz
    $('.tamanio_matriz').keyup(function(e){
        e.preventDefault();
        e.stopPropagation();
        var inputValue = $(this).val();
        tamanio_matriz = inputValue;
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            return false;
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
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            return false;
        }
        if(inputValue > 1000){
            bootbox.alert("Recuerda que el numero de operaciones no puede ser mayor a 1000");
            $(this).val('');
            return false;
        }
        if(inputValue <= 0){
            bootbox.alert("Recuerda que el numero de operaciones no puede ser 0 o negativo");
            $(this).val('');
            return false;
        }
        //Añadimos las operaciones necesarias
        $(this).parent().parent().parent().parent().find(".operaciones").empty();
        for (var i = 1; i <= inputValue; i++) {
            $(this).parent().parent().parent().parent().find(".operaciones").append(operacion);
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
            $(this).parent().find('.input_y_update').val('');
            $(this).parent().find('.input_z_update').val('');
            return false;
        }
        console.log(inputValue);
        //Seteamos valores de Y y Z
        $(this).parent().find('.input_y_update').val(inputValue);
        $(this).parent().find('.input_z_update').val(inputValue);
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
            $(this).parent().parent().find(".query_fields").hide();
            $(this).parent().parent().find(".update_fields").show();
        } else {
            $(this).parent().parent().find(".update_fields").hide();
            $(this).parent().parent().find(".query_fields").show();
        }
    });

    

});