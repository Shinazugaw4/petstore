import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react'
import petService from '../services/petService'

export default function PetDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPet()
  }, [id])

  const fetchPet = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await petService.getPetById(parseInt(id))
      setPet(data)
    } catch (err) {
      setError('Failed to load pet details. Please try again.')
      console.error('Error fetching pet:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${pet.name}?`)) {
      deletePet()
    }
  }

  const deletePet = async () => {
    try {
      setLoading(true)
      await petService.deletePet(parseInt(id))
      navigate('/')
    } catch (err) {
      setError('Failed to delete pet. Please try again.')
      console.error('Error deleting pet:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !pet) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pet not found</h2>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Pets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
          {error}
        </div>
      )}

      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Pets
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-8">
        {/* Pet Image */}
        <div className="flex flex-col items-center">
          {pet.imageUrl ? (
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
          ) : (
            <div className="w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-500 text-xl">No Image</span>
            </div>
          )}
          <div
            className={`px-6 py-2 rounded-full text-lg font-bold text-white ${
              pet.available ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {pet.available ? 'Available for Adoption' : 'Sold'}
          </div>
        </div>

        {/* Pet Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{pet.name}</h1>

            <div className="space-y-3 mb-6 text-lg text-gray-700">
              <p>
                <span className="font-bold">Species:</span> {pet.species}
              </p>
              <p>
                <span className="font-bold">Breed:</span> {pet.breed}
              </p>
              <p>
                <span className="font-bold">Age:</span> {pet.age} years old
              </p>
              <p className="text-3xl font-bold text-blue-600 mt-4">
                ${pet.price.toFixed(2)}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">About</h3>
              <p className="text-gray-700 leading-relaxed">{pet.description}</p>
            </div>

            {pet.createdAt && (
              <p className="text-sm text-gray-500 mb-4">
                Listed on:{' '}
                {new Date(pet.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link
              to={`/pets/${pet.id}/edit`}
              disabled={loading}
              className="flex-1 bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Edit2 className="w-5 h-5" />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-5 h-5" />
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
