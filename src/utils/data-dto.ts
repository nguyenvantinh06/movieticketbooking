export interface MovieDto {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetailDto {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: GenreDto[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanyDto[];
  production_countries: ProductionCompanyDto[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguageDto[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GenreDto {
  id: number;
  name: string;
}

export interface ProductionCompanyDto {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountryDto {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguageDto {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieCreditDto {
  cast: CastDto[];
  crew: CrewDto[];
  id: number;
}

export interface CastDto {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path?: string;
}

export interface CrewDto {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
}
