$(document).ajaxStop($.unblockUI);
$(document).ready(function() {
    $.ajaxSetup({
        cache: false,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    
    //Validación de el tamaño permitido de casos de prueba
    $('#comenzar').click(function(e){
        e.stopPropagation();
        var inputValue = $(".numero_operaciones").val();
        if(inputValue > 50){
        	e.preventDefault();
            bootbox.alert("Recuerda que el numero de casos de prueba no puede ser mayor a 50");
            $(this).val('');
            return false;
        }
        if(inputValue <= 0){
        	e.preventDefault();
            bootbox.alert("Recuerda que el numero de casos de prueba no puede ser 0 o negativo");
            $(this).val('');
            return false;
        }
    });


});