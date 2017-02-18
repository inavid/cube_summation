@extends('layouts.layout')

@section('title', 'Casos de prueba')

@section('content')
    <div class="jumbotron">
    	<h3 class="text-center">Llena los casos de prueba</h3>
    </div>
    <div class="container">
    	<div class="row">
            <div class="col-md-12">
                <form class="form-horizontal" role="search" method="post" action="{{ action('IndexController@fillCases') }}">
                    {{ csrf_field() }}
                    @for ($i = 1; $i < $numero_casos; $i++)
                        <h3>Caso de prueba {{ $i }}</h3>
                        <div class="col-md-12">
                            <div class="form-group row">
                                <label for="inputKey" class="col-md-3 control-label">Tamaño Matriz(3xN)</label>
                                <div class="col-md-3">
                                    <select class="form-control">
                                        <option value="1">1</option>
                                    </select>
                                </div>
                                <label for="inputValue" class="col-md-3 control-label">Numero de operaciones</label>
                                <div class="col-md-3">
                                    <select class="form-control">
                                        <option value="1">1</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group hide">
                            <input type="text" name="numero_casos" class="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Numero de casos de prueba">
                        </div>
                    @endfor
                    <button type="submit" class="btn btn-default">Comenzar =)</button>
                </form>
            </div>
            <div class="col-md-4"></div>
    	</div>
    </div>
@endsection