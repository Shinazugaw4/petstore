import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import petService from '../services/petService'

export default function PetFilters({ onFilter }) {
  const [species, setSpecies] = useState('')
  const [available, setAvailable] = useState('')
  const [speciesList, setSpeciesList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSpecies()
  }, [])

  const fetchSpecies = async () => {
    try {
      setLoading(true)
      const data = await petService.getAllSpecies()
      setSpeciesList(data)
    } catch (error) {
      console.error('Error fetching species:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = () => {
    const filters = {}
    if (species) filters.species = species
    if (available !== '') filters.available = available === 'true'
    onFilter(filters)
  }

  const handleReset = () => {
    setSpecies('')
    setAvailable('')
    onFilter({})
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Pets</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Species Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Species
          </label>
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Species</option>
            {speciesList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability
          </label>
          <select
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="true">Available</option>
            <option value="false">Sold</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 items-end">
          <button
            onClick={handleFilter}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Apply Filter
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

PetFilters.propTypes = {
  onFilter: PropTypes.func.isRequired,
}
