package com.gestion.tufinca.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.gestion.tufinca.models.enums.EstadoPropiedad;

import java.util.ArrayList;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder

@Table(name = "propiedad")
public class PropiedadModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false, length = 255)
    private String titulo;

    @Column(nullable = false, unique = true)
    private Integer codigo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(precision = 10, scale = 2)
    private Float areaTotal;

    @Column(name = "areaConst")
    private Float areaConst;

    @Column(length = 255)
    private String ubicacion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoPropiedad estado;

    @ManyToOne
    @JoinColumn(name = "administrador_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_propiedad_administrador"))
    private Administrador administrador;

    @OneToMany(mappedBy = "propiedad", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Media> medias = new ArrayList<>();

    @OneToOne(mappedBy = "propiedad", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mensaje> mensajes = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "propiedad_etiqueta",
            joinColumns = @JoinColumn(name = "propiedad_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "etiqueta_id", referencedColumnName = "id")
    )
    private List<Etiqueta> etiquetas = new ArrayList<>();
}
