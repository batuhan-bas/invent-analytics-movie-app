// OMDb API Movie Types
export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }
  
  export interface MovieDetail extends Movie {
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: { Source: string; Value: string }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
  }
  
  // Utility Types
  export type Nullable<T> = T | null;
  
  export type PaginatedResponse<T> = {
    totalResults: number;
    currentPage: number;
    results: T[];
  };
  
  // Environment Variables
  declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_OMDB_API_KEY: string;
    }
  }
  