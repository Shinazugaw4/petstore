package com.petstore.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@Entity
@Table(name = "pets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Pet name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Species is required")
    @Column(nullable = false)
    private String species;

    @NotBlank(message = "Breed is required")
    @Column(nullable = false)
    private String breed;

    @NotNull(message = "Age is required")
    @Min(value = 0, message = "Age must be a positive number")
    private Integer age;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private Double price;

    @URL(message = "ImageUrl must be a valid URL")
    private String imageUrl;

    @Size(min = 10, message = "Description must be at least 10 characters long")
    private String description;

    @NotNull(message = "Availability status is required")
    @Column(nullable = false)
    private Boolean available;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Long createdAt;

    @Column(name = "updated_at")
    private Long updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = System.currentTimeMillis();
        updatedAt = System.currentTimeMillis();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = System.currentTimeMillis();
    }
}
