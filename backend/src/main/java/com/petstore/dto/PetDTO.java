package com.petstore.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetDTO {

    private Long id;

    @NotBlank(message = "Pet name is required")
    private String name;

    @NotBlank(message = "Species is required")
    private String species;

    @NotBlank(message = "Breed is required")
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
    private Boolean available;

    private Long createdAt;

    private Long updatedAt;
}
