@extends('layouts.layout')

@section('title', 'Casos de prueba')

@section('scripts')
    @section('js')

@section('content')
    <div class="jumbotron">
    	<h3 class="text-center">Llena los casos de prueba</h3>
    </div>
    <div class="container">
        @for ($i = 1; $i <= $numero_casos; $i++)
            <div class="caso">
                <h3>Caso de prueba {{ $i }}</h3>
                <div class="row">
                    <div class="col-md-6">
                        <label for="" class="">Tamaño Matriz(3xN)</label>
                        <input type="number" class="tamanio_matriz form-control" name="tamanio_matriz" min="1" max="50">
                    </div>
                    <div class="col-md-6">
                        <label for="" class="">Numero de operaciones</label>
                        <input type="number" class="numero_operaciones form-control" name="numero_operaciones" min="1" max="1000">
                    </div>
                </div>
                <br>
                <div class="row operaciones">
                    <div class="operacion">
                        <div class="col-md-6">
                            <label for="inputKey" class="col-md-3 control-label">Tipo Operación</label>
                            <select class="form-control tipo_operacion">
                                <option value="1">UPDATE</option>
                                <option value="2">QUERY</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <div class="update_fields text-center">
                                <label for="inputValue" class="col-md-3 control-label">UPDATE</label>
                                <div class="col-md-4">
                                    <input type="number" class="input_x_update" placeholder="Xn">
                                    <input type="number" class="input_y_update" placeholder="Yn" readonly="readonly">
                                    <input type="number" class="input_z_update" placeholder="Zn" readonly="readonly">
                                    <input type="number" class="input_w" placeholder="W">
                                </div>
                            </div>
                            <div class="query_fields text-center" style="display: none;">
                                <label for="inputValue" class="col-md-3 control-label">QUERY</label>
                                <div class="col-md-3">
                                    <input type="text" class="input_xa_query" placeholder="Xa">
                                    <input type="text" class="input_ya_query" placeholder="Ya" readonly="readonly">
                                    <input type="text" class="input_za_query" placeholder="Za" readonly="readonly">
                                    <br>
                                    <input type="text" class="input_xb_query" placeholder="Xb">
                                    <input type="text" class="input_yb_query" placeholder="Yb" readonly="readonly">
                                    <input type="text" class="input_zb_query" placeholder="Zb" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="form-group text-center">
                    <button type="button" class="btn btn-default calculate">Mostrar resultados</button>
                </div>
            </div>
        @endfor
    </div>
@endsection