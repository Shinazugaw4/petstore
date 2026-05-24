import { Link } from 'react-router-dom'
import { Edit2, Trash2, Eye, Heart } from 'lucide-react'
import PropTypes from 'prop-types'

export default function PetCard({ pet, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm(`Are you sure you want to delete ${pet.name}?`)) {
      onDelete(pet.id)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
      {/* Pet Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {pet.imageUrl ? (
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        
        {/* Availability Badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
              pet.available ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {pet.available ? 'Available' : 'Sold'}
          </span>
        </div>
      </div>

      {/* Pet Information */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{pet.name}</h3>
        
        <div className="mb-3 space-y-1 text-sm text-gray-600">
          <p><span className="font-semibold">Species:</span> {pet.species}</p>
          <p><span className="font-semibold">Breed:</span> {pet.breed}</p>
          <p><span className="font-semibold">Age:</span> {pet.age} years old</p>
        </div>

        <p className="text-gray-700 text-sm mb-3 line-clamp-2 h-10">
          {pet.description}
        </p>

        {/* Price */}
        <div className="text-2xl font-bold text-blue-600 mb-4">
          ${pet.price.toFixed(2)}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/pets/${pet.id}`}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View
          </Link>
          <Link
            to={`/pets/${pet.id}/edit`}
            className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

PetCard.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    available: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
}
