package com.petstore.service;

import com.petstore.dto.PetDTO;
import com.petstore.exception.ResourceNotFoundException;
import com.petstore.model.Pet;
import com.petstore.repository.PetRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class PetService {

    private final PetRepository petRepository;

    public PetDTO createPet(PetDTO petDTO) {
        Pet pet = new Pet();
        mapDtoToEntity(petDTO, pet);
        Pet savedPet = petRepository.save(pet);
        return mapEntityToDto(savedPet);
    }

    public PetDTO getPetById(Long id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id: " + id));
        return mapEntityToDto(pet);
    }

    public List<PetDTO> getAllPets() {
        return petRepository.findAll().stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public List<PetDTO> getPetsBySpecies(String species) {
        return petRepository.findBySpecies(species).stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public List<PetDTO> getAvailablePets() {
        return petRepository.findByAvailable(true).stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public List<PetDTO> getPetsBySpeciesAndAvailability(String species, Boolean available) {
        return petRepository.findBySpeciesAndAvailable(species, available).stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public List<PetDTO> searchPets(String searchTerm) {
        return petRepository.searchPets(searchTerm).stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public List<String> getAllSpecies() {
        return petRepository.findAllSpecies();
    }

    public PetDTO updatePet(Long id, PetDTO petDTO) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id: " + id));
        mapDtoToEntity(petDTO, pet);
        Pet updatedPet = petRepository.save(pet);
        return mapEntityToDto(updatedPet);
    }

    public void deletePet(Long id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id: " + id));
        petRepository.delete(pet);
    }

    private PetDTO mapEntityToDto(Pet pet) {
        return new PetDTO(
                pet.getId(),
                pet.getName(),
                pet.getSpecies(),
                pet.getBreed(),
                pet.getAge(),
                pet.getPrice(),
                pet.getImageUrl(),
                pet.getDescription(),
                pet.getAvailable(),
                pet.getCreatedAt(),
                pet.getUpdatedAt()
        );
    }

    private void mapDtoToEntity(PetDTO dto, Pet pet) {
        pet.setName(dto.getName());
        pet.setSpecies(dto.getSpecies());
        pet.setBreed(dto.getBreed());
        pet.setAge(dto.getAge());
        pet.setPrice(dto.getPrice());
        pet.setImageUrl(dto.getImageUrl());
        pet.setDescription(dto.getDescription());
        pet.setAvailable(dto.getAvailable());
    }
}
