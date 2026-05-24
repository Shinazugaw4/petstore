import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PetForm from '../components/PetForm'
import petService from '../services/petService'

export default function EditPetPage() {
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

  const handleSubmit = async (petData) => {
    try {
      setLoading(true)
      setError(null)
      await petService.updatePet(parseInt(id), petData)
      navigate('/')
    } catch (err) {
      setError('Failed to update pet. Please try again.')
      console.error('Error updating pet:', err)
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

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
          {error}
        </div>
      )}
      {pet && <PetForm initialPet={pet} onSubmit={handleSubmit} loading={loading} />}
    </div>
  )
}
