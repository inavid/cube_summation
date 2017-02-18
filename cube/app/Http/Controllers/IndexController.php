<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
        
        return view('index/fill_cases', array('numero_casos'=>$request_data['numero_casos']+1));
    }

}
