import { useState } from 'react'
import PropTypes from 'prop-types'

export default function PetForm({ initialPet, onSubmit, loading }) {
  const [formData, setFormData] = useState(
    initialPet || {
      name: '',
      species: '',
      breed: '',
      age: '',
      price: '',
      imageUrl: '',
      description: '',
      available: true,
    }
  )

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.species.trim()) newErrors.species = 'Species is required'
    if (!formData.breed.trim()) newErrors.breed = 'Breed is required'
    if (formData.age === '' || formData.age < 0) newErrors.age = 'Age must be 0 or greater'
    if (formData.price === '' || formData.price <= 0) newErrors.price = 'Price must be greater than 0'
    if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {initialPet ? 'Edit Pet' : 'Add New Pet'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pet Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Fluffy"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Species */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Species *
          </label>
          <input
            type="text"
            name="species"
            value={formData.species}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Dog"
          />
          {errors.species && <p className="text-red-500 text-sm mt-1">{errors.species}</p>}
        </div>

        {/* Breed */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Breed *
          </label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Golden Retriever"
          />
          {errors.breed && <p className="text-red-500 text-sm mt-1">{errors.breed}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age (years) *
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 3"
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price ($) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 500.00"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the pet's characteristics, personality, etc..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Availability Checkbox */}
      <div className="mt-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span className="text-gray-700">Pet is Available</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : initialPet ? 'Update Pet' : 'Add Pet'}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition-colors font-bold"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

PetForm.propTypes = {
  initialPet: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

PetForm.defaultProps = {
  loading: false,
}
