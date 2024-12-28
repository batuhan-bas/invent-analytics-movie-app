# Invent Analytics Movie App

An interactive Single Page Application (SPA) to browse and view details of movies, built with Next.js and Material UI.

## Features

- **Movie Listing:** Displays movies in a table with their name, release date, type, and IMDb ID.
- **Pagination:** Supports 10 movies per page with seamless navigation.
- **Search Functionality:** Search movies by name (default: "Pokemon").
- **Filters:** Filter movies by release year and type (movie, TV series, episode).
- **Movie Details:** View detailed information about a selected movie, including genre, director, cast, runtime, and plot.

## Technologies

- **Frontend Framework:** [Next.js](https://nextjs.org/) (React-based)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling:** [Material UI](https://mui.com/) (MUI)
- **API Integration:** [OMDb API](http://www.omdbapi.com/)
- **Utilities:** Axios for API requests, Jest for testing

## Installation and Setup

### Prerequisites

- Node.js (v14 or above)
- pnpm (preferred package manager)
- Docker (optional, for containerized setup)

### Steps to Run the Project Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/invent-analytics-movie-app.git
   cd invent-analytics-movie-app
2. **Install Dependencies:**
   ```bash
   pnpm install
3. **Add Environment Variables: Create a .env.local file and add your OMDb API key:**
   ```bash
   NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
4. **Run the Development Server:**
   ```bash
   pnpm dev
5. **Access the App: Open http://localhost:3000 in your browser.**

### Optional: Run with Docker

1. **Build the Docker Image:**
   ```bash
   docker build -t invent-analytics-movie-app .
2. **Run the Container:**
   ```bash
   docker run -p 3000:3000 invent-analytics-movie-app
### Testing

1. **Run unit and integration tests using Jest:**
   ```bash
   pnpm test
## Technologies

- **src/components:**  Reusable components (e.g., filters, pagination, movie details).
- **src/store:**  Redux Toolkit configuration and slices.
- **src/utils:**  Utility functions (e.g., API integration).
- **src/context:**  Context for theme management.

## License

This project is licensed under the MIT License.