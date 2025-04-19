package com.gestion.tufinca.specifications;

import com.gestion.tufinca.models.PropiedadModel;
import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.enums.EstadoPropiedad;
import com.gestion.tufinca.models.enums.TipoEtiqueta;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PropiedadSpecifications {

    public static Specification<PropiedadModel> conFiltros(
            String nombrePropiedad,
            String codigo,
            String ubicacion,
            EstadoPropiedad estado,
            List<String> etiquetas) {

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filtros básicos
            if (estado != null) {
                predicates.add(cb.equal(root.get("estado"), estado));
            }

            if (nombrePropiedad != null && !nombrePropiedad.isEmpty()) {
                String[] palabras = nombrePropiedad.toLowerCase().split("\\s+");
                List<Predicate> nombrePredicates = new ArrayList<>();
                for (String palabra : palabras) {
                    nombrePredicates.add(cb.like(
                            cb.lower(root.get("titulo")),
                            "%" + palabra + "%"
                    ));
                }
                predicates.add(cb.and(nombrePredicates.toArray(new Predicate[0])));
            }

            if (codigo != null && !codigo.isEmpty()) {
                predicates.add(cb.equal(root.get("codigo"), codigo));
            }

            if (ubicacion != null && !ubicacion.isEmpty()) {
                predicates.add(cb.equal(root.get("ubicacion"), ubicacion));
            }

            if (etiquetas != null && !etiquetas.isEmpty()) {
                Join<PropiedadModel, EtiquetaModel> etiquetaJoin = root.join("etiquetas");
                predicates.add(cb.lower(etiquetaJoin.get("nombre")).in(
                        etiquetas.stream().map(String::toLowerCase).collect(Collectors.toList())
                ));
            }

            query.distinct(true);
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    // Métodos auxiliares (puedes mantener estos o adaptar según necesites)
    public static Specification<PropiedadModel> filtrarPorEstado(EstadoPropiedad estado) {
        return (root, query, cb) -> estado == null ?
                cb.conjunction() :
                cb.equal(root.get("estado"), estado);
    }

    public static Specification<PropiedadModel> filtrarPorNombrePropiedad(String nombre) {
        return (root, query, cb) -> (nombre == null || nombre.isEmpty()) ?
                cb.conjunction() :
                cb.like(cb.lower(root.get("titulo")), "%" + nombre.toLowerCase() + "%");
    }

    public static Specification<PropiedadModel> filtrarPorCodigo(String codigo) {
        return (root, query, cb) -> (codigo == null || codigo.isEmpty()) ?
                cb.conjunction() :
                cb.equal(root.get("codigo"), codigo);
    }

    public static Specification<PropiedadModel> filtrarPorUbicacion(String ubicacion) {
        return (root, query, cb) -> (ubicacion == null || ubicacion.isEmpty()) ?
                cb.conjunction() :
                cb.equal(root.get("ubicacion"), ubicacion);
    }

    public static Specification<PropiedadModel> filtrarPorIdsEtiquetas(List<Integer> ids) {
        return (root, query, cb) -> {
            if (ids == null || ids.isEmpty()) return cb.conjunction();
            Join<PropiedadModel, EtiquetaModel> join = root.join("etiquetas");
            return cb.and(
                    join.get("id").in(ids),
                    cb.equal(join.get("tipoEtiqueta"), TipoEtiqueta.propiedad)
            );
        };
    }

    public static Specification<PropiedadModel> filtrarPorNombresEtiquetasPropiedad(List<String> nombres) {
        return (root, query, cb) -> {
            if (nombres == null || nombres.isEmpty()) return cb.conjunction();

            Join<PropiedadModel, EtiquetaModel> join = root.join("etiquetas");
            List<Predicate> predicates = new ArrayList<>();

            for (String nombre : nombres) {
                predicates.add(cb.and(
                        cb.equal(join.get("tipoEtiqueta"), TipoEtiqueta.propiedad),
                        cb.like(cb.lower(join.get("nombre")), "%" + nombre.toLowerCase() + "%")
                ));
            }

            return cb.or(predicates.toArray(new Predicate[0]));
        };
    }
}