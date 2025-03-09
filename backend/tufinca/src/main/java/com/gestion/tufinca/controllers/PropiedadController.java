package com.gestion.tufinca.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/propiedades")
public class PropiedadController {

    @GetMapping("/")
    public String holaPropiedades(){
        return "api de propiedades";
    }
}
