<?php

namespace App\Tools;

class Utils
{
    /**
    * Metodo para ayuda en debug, muestra un arreglo de forma agradable en web
    * @param $array --> Arreglo a imprimir(mostrar)
    */
    public static function output_array_web($array){
    	echo "<pre>";
    	print_r($array);
    	echo "</pre>";
    }


}
