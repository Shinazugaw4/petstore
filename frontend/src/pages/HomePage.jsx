import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PetCard from '../components/PetCard'
import PetFilters from '../components/PetFilters'
import petService from '../services/petService'
import { Search } from 'lucide-react'

export default function HomePage() {
  const [pets, setPets] = useState([])
  const [filteredPets, setFilteredPets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchPets()
  }, [])

  const fetchPets = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await petService.getAllPets()
      setPets(data)
      setFilteredPets(data)
    } catch (err) {
      setError('Failed to load pets. Please try again.')
      console.error('Error fetching pets:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = async (filters) => {
    try {
      setLoading(true)
      setError(null)
      const data = await petService.filterPets(filters)
      setFilteredPets(data)
    } catch (err) {
      setError('Failed to filter pets. Please try again.')
      console.error('Error filtering pets:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      setFilteredPets(pets)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await petService.searchPets(searchTerm)
      setFilteredPets(data)
    } catch (err) {
      setError('Failed to search pets. Please try again.')
      console.error('Error searching pets:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await petService.deletePet(id)
      setPets(pets.filter(pet => pet.id !== id))
      setFilteredPets(filteredPets.filter(pet => pet.id !== id))
    } catch (err) {
      setError('Failed to delete pet. Please try again.')
      console.error('Error deleting pet:', err)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-bold mb-2">Welcome to PetStore</h2>
        <p className="text-lg opacity-90">Find your perfect pet companion today</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, species, or breed..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>
      </form>

      {/* Filters */}
      <PetFilters onFilter={handleFilter} />

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Pets Gallery */}
      {!loading && (
        <>
          {filteredPets.length > 0 ? (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Available Pets ({filteredPets.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPets.map((pet) => (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-600 mb-4">No pets found</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilteredPets(pets)
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
