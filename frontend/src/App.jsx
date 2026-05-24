import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AddPetPage from './pages/AddPetPage'
import EditPetPage from './pages/EditPetPage'
import PetDetailPage from './pages/PetDetailPage'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pets/new" element={<AddPetPage />} />
            <Route path="/pets/:id/edit" element={<EditPetPage />} />
            <Route path="/pets/:id" element={<PetDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
