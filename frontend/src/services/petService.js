import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/pets'

const petService = {
  // Fetch all pets
  getAllPets: async () => {
    try {
      const response = await axios.get(API_BASE_URL)
      return response.data
    } catch (error) {
      console.error('Error fetching pets:', error)
      throw error
    }
  },

  // Fetch a single pet by ID
  getPetById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching pet ${id}:`, error)
      throw error
    }
  },

  // Create a new pet
  createPet: async (petData) => {
    try {
      const response = await axios.post(API_BASE_URL, petData)
      return response.data
    } catch (error) {
      console.error('Error creating pet:', error)
      throw error
    }
  },

  // Update a pet
  updatePet: async (id, petData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, petData)
      return response.data
    } catch (error) {
      console.error(`Error updating pet ${id}:`, error)
      throw error
    }
  },

  // Delete a pet
  deletePet: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`)
    } catch (error) {
      console.error(`Error deleting pet ${id}:`, error)
      throw error
    }
  },

  // Get pets by species
  getPetsBySpecies: async (species) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/species/${species}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching pets by species ${species}:`, error)
      throw error
    }
  },

  // Get available pets
  getAvailablePets: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/available`)
      return response.data
    } catch (error) {
      console.error('Error fetching available pets:', error)
      throw error
    }
  },

  // Filter pets by species and/or availability
  filterPets: async (filters) => {
    try {
      const params = new URLSearchParams()
      if (filters.species) params.append('species', filters.species)
      if (filters.available !== undefined) params.append('available', filters.available)
      
      const response = await axios.get(`${API_BASE_URL}/filter?${params.toString()}`)
      return response.data
    } catch (error) {
      console.error('Error filtering pets:', error)
      throw error
    }
  },

  // Search pets
  searchPets: async (searchTerm) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search?q=${encodeURIComponent(searchTerm)}`)
      return response.data
    } catch (error) {
      console.error(`Error searching pets with term "${searchTerm}":`, error)
      throw error
    }
  },

  // Get all species
  getAllSpecies: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/species/list/all`)
      return response.data
    } catch (error) {
      console.error('Error fetching species list:', error)
      throw error
    }
  },
}

export default petService
