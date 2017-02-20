<?php

namespace App;

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
    public function update(){

    }

    /**
    * Metodo para realizar la operación query
    *
    */
    public function query(){

    }


}
