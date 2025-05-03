# 🧩 Pokémon Explorer

A **modern React application** that fetches and displays Pokémon data from the [PokeAPI](https://pokeapi.co/api/v2/pokemon?limit=150). With a sleek, responsive UI built using **Tailwind CSS v4**, this app lets users browse, search, filter, compare, and favorite their favorite Pokémon.

🔗 **Live Demo:** [pokemon-eight-eta.vercel.app](https://pokemon-eight-eta.vercel.app)

---

## 🚀 Features

- 🔍 **Browse Pokémon**  
  View the first 150 Pokémon in a responsive card layout, each showing:
  - Name
  - ID
  - Image
  - Types

- 🔎 **Search & Filter**  
  - Real-time search by name  
  - Filter Pokémon by type using a dropdown  

- ⭐ **Favorites**  
  - Add/remove Pokémon to a personal favorites list  
  - Favorites are stored in **localStorage**

- ⚖️ **Compare Pokémon**  
  - Input Pokémon **names** or **IDs (1–150)** to compare two  
  - Validates input to ensure correct format and range  

- 📊 **View Details**  
  - Click a card or "View Details" to see:
    - Stats
    - Abilities
    - Types
    - Height/Weight

- 🌈 **Responsive Design**  
  - Tailored layout for all screens (1–4 column grid)  
  - Fully mobile and desktop responsive  

- ❗ **Robust Error Handling**  
  - Loading spinners  
  - Empty state UI  
  - Toast notifications (e.g., invalid input, API errors)

- ✨ **Polished UI/UX**  
  - Smooth animations via **Framer Motion**  
  - Clean light theme with inline brand colors:
    - Primary: `#0A66C2`
    - Accent: `#00A69C`

---

## 🛠️ Tech Stack

| Technology      | Description                             |
|-----------------|-----------------------------------------|
| **React.js**     | Core framework                          |
| **Tailwind CSS v4** | Utility-first styling                |
| **Framer Motion** | Animations and transitions             |
| **PokeAPI**       | Pokémon data source                    |
| **localStorage**  | Persist favorites locally              |

---

## 📦 Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/KarthikBandi75/Pokemon.git
cd pokemon-app
