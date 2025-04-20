package com.gestion.tufinca.models.enums;

public enum TipoEtiqueta {
    propiedad,
    categoria;

    public static TipoEtiqueta fromString(String value) {
        try {
            return TipoEtiqueta.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
