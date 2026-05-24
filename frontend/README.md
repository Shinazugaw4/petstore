# Frontend Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation Steps

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Access application**
   - URL: `http://localhost:5173`
   - The browser will auto-open

## Project Structure

```
src/
├── components/      # Reusable components
├── pages/          # Page components
├── services/       # API service layer
├── styles/         # CSS files
├── hooks/          # Custom hooks
├── utils/          # Utility functions
├── App.jsx
└── main.jsx
```

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Configuration

### API URL
Update `src/services/petService.js` to change API base URL:
```javascript
const API_BASE_URL = 'http://localhost:8080/api/pets'
```

## Components

- **Header**: Navigation bar
- **Footer**: Footer section
- **PetCard**: Individual pet display
- **PetForm**: Add/Edit pet form
- **PetFilters**: Filter interface

## Pages

- **HomePage**: Pet gallery with search
- **AddPetPage**: Create new pet
- **EditPetPage**: Update pet
- **PetDetailPage**: Full pet details

## Styling

- Tailwind CSS for utility styles
- Custom CSS in `src/styles/index.css`
- Component-specific styles

## Troubleshooting

See TROUBLESHOOTING.md for common issues and solutions.
