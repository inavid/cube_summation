@extends('layouts.layout')

@section('title', 'Inicio Prueba')

@section('content')
    <div class="jumbotron">
    	<h3 class="text-center">Introduce el numero de casos de prueba</h3>
    </div>
    <div class="container">
    	<div class="row text-center">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <form class="form" role="search" method="post" action="{{ action('IndexController@fillCases') }}">
                    {{ csrf_field() }}
                    <div class="form-group">
                        <input type="text" name="numero_casos" class="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Numero de casos de prueba">
                    </div>
                    <button type="submit" class="btn btn-default">Comenzar =)</button>
                </form>
            </div>
            <div class="col-md-4"></div>
    	</div>
    </div>
@endsection