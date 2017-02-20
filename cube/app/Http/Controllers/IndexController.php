<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cube;

class IndexController extends Controller
{
    /**
    * Muestra la pagina inicial.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        //
        return view('index/index');
    }

    /**
    * Muestra la vista con los casos de prueba necesarios para llenarlos
    *
    * @return \Illuminate\Http\Response
    */
    public function fillCases(Request $request)
    {
        #Se obtiene el numero de casos de prueba solicitados
        $request_data = $request->all();
        
        return view('index/fill_cases', ['numero_casos'=>$request_data['numero_casos']+1]);
    }

    /**
    * Procesa operaciones de un caso de prueba
    *
    * @return \Illuminate\Http\Response
    */
    public function calculate(Request $request)
    {
        #Se obtiene el numero de casos de prueba solicitados
        $request_data = $request->all();

        $cube = new Cube($request_data['tamanio_matriz']);

        var_dump($request_data);
        die();
        
        return view('index/fill_cases', ['numero_casos'=>$request_data['numero_casos']+1]);
    }

}
