import { Link } from 'react-router-dom'
import { ShoppingCart, Plus } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">PetStore</h1>
        </Link>
        
        <ul className="flex gap-6 items-center">
          <li>
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Browse Pets
            </Link>
          </li>
          <li>
            <Link
              to="/pets/new"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Pet
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
