package com.petstore.controller;

import com.petstore.dto.PetDTO;
import com.petstore.service.PetService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PetController {

    private final PetService petService;

    @PostMapping
    public ResponseEntity<PetDTO> createPet(@Valid @RequestBody PetDTO petDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(petService.createPet(petDTO));
    }

    @GetMapping
    public ResponseEntity<List<PetDTO>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> getPetById(@PathVariable Long id) {
        return ResponseEntity.ok(petService.getPetById(id));
    }

    @GetMapping("/species/{species}")
    public ResponseEntity<List<PetDTO>> getPetsBySpecies(@PathVariable String species) {
        return ResponseEntity.ok(petService.getPetsBySpecies(species));
    }

    @GetMapping("/available")
    public ResponseEntity<List<PetDTO>> getAvailablePets() {
        return ResponseEntity.ok(petService.getAvailablePets());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<PetDTO>> filterPets(
            @RequestParam(required = false) String species,
            @RequestParam(required = false) Boolean available) {
        if (species != null && available != null) {
            return ResponseEntity.ok(petService.getPetsBySpeciesAndAvailability(species, available));
        } else if (species != null) {
            return ResponseEntity.ok(petService.getPetsBySpecies(species));
        } else if (available != null) {
            return ResponseEntity.ok(petService.getAvailablePets());
        }
        return ResponseEntity.ok(petService.getAllPets());
    }

    @GetMapping("/search")
    public ResponseEntity<List<PetDTO>> searchPets(@RequestParam String q) {
        return ResponseEntity.ok(petService.searchPets(q));
    }

    @GetMapping("/species/list/all")
    public ResponseEntity<List<String>> getAllSpecies() {
        return ResponseEntity.ok(petService.getAllSpecies());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> updatePet(@PathVariable Long id, @Valid @RequestBody PetDTO petDTO) {
        return ResponseEntity.ok(petService.updatePet(id, petDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        petService.deletePet(id);
        return ResponseEntity.noContent().build();
    }
}
