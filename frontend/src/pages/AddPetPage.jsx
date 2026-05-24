import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PetForm from '../components/PetForm'
import petService from '../services/petService'

export default function AddPetPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (petData) => {
    try {
      setLoading(true)
      setError(null)
      await petService.createPet(petData)
      navigate('/')
    } catch (err) {
      setError('Failed to create pet. Please try again.')
      console.error('Error creating pet:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
          {error}
        </div>
      )}
      <PetForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}
