<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tools\Constants;
use App\Tools\Utils;
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

        foreach ($request_data['operaciones'] as $key => $operacion) {
            $operacion_decoded = json_decode($operacion);
            if ($operacion_decoded->tipo_operacion == Constants::TIPO_OPERACION_UPDATE) {
                $cube->update($operacion_decoded->line, $operacion_decoded->value);
            } else {
                $query_result[] = $cube->query($operacion_decoded->linea, $operacion_decoded->lineb);
            }
        }
        
        return response()->json([
                'success'   => 200, 
                'queryes'   => $query_result,
                'cubo'      => $cube->cube
            ], 200);
    }

}
