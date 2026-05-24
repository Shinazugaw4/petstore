package com.petstore.repository;

import com.petstore.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    List<Pet> findBySpecies(String species);

    List<Pet> findByAvailable(Boolean available);

    List<Pet> findBySpeciesAndAvailable(String species, Boolean available);

    @Query("SELECT p FROM Pet p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(p.species) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(p.breed) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Pet> searchPets(@Param("searchTerm") String searchTerm);

    @Query("SELECT DISTINCT p.species FROM Pet p ORDER BY p.species")
    List<String> findAllSpecies();
}
