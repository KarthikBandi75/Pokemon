# Pokémon Explorer

A modern React application that fetches and displays Pokémon data from the PokeAPI. The app allows users to browse 150 Pokémon, search by name, filter by type, mark favorites, compare two Pokémon with validated inputs, and view detailed information via a "View Details" button on each card. Built with a responsive, light-themed UI using Tailwind CSS v4 and inline colors (#0A66C2, #00A69C), it includes animations and toast notifications for a polished user experience.

## Features
- **Browse Pokémon**: Displays 150 Pokémon with name, ID, image, and type(s) in a responsive card grid.
- **Search and Filter**: Real-time search by name and type filtering via a dropdown.
- **Favorites**: Add/remove Pokémon to a favorites list, persisted in local storage.
- **Compare Pokémon**: Compare two Pokémon by ID or name, with validation to ensure valid inputs (IDs 1–150 or valid names).
- **Details View**: View detailed stats and abilities for each Pokémon, accessible via card clicks or "View Details" buttons.
- **Responsive Design**: Adapts to desktop and mobile with a 1–4 column grid.
- **Error Handling**: Shows loading spinners, empty states, and toast notifications for errors/invalid inputs.
- **Animations**: Smooth transitions using Framer Motion for cards, pages, and buttons.

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/KarthikBandi75/Pokemon
   cd pokemon-app
