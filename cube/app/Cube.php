<?php

namespace App;
use App\Tools\Constants;
use App\Tools\Utils;

class Cube
{
    
    public $cube = array();
    private $size;

    /**
    * Metodo constructor de la clase cube
    * @param $size --> Int --> Numero de "lineas" del cubo es decir 3xSize
    * 
    */
    function __construct($size) {
        $this->size = $size;
        
        for ($i=1; $i <= $size; $i++) { 
            $temp = array(
                'x' => 0,
                'y' => 0,
                'z' => 0
            );
            array_push($this->cube, $temp);
        }
    }

    /**
    * Metodo para realizar la operación update 
    *
    */
    public function update($line, $w){
        $this->cube[$line-1]['x'] = $this->cube[$line-1]['y'] = $this->cube[$line-1]['z'] = $w;
    }

    /**
    * Metodo para realizar la operación query
    * @param $linea --> int --> A partir de donde inicia la suma
    * @param $lineb --> int --> Hasta donde se sumaran los valores directos y que se interceden
    * @return $result --> array --> Resultado de suma
    */
    public function query($linea, $lineb){
        $result = 0;

        for ($i=($linea-1); $i <= ($lineb-1); $i++) { 
            $result += $this->cube[$i]['x'];
        }

        return $result;
    }

}
