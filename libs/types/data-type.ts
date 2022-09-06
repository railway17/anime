export enum PageType {
    Home = '/',
    Anime = '/anime'
  }

export interface PaginationType {
  has_next_page: boolean
  last_visible_page: number
}

export interface AnimeImage {
  image_url: string
  large_image_url: string
  small_image_url: string

}

export interface AnimeImageTypes {
  jpg: AnimeImage
  webp: AnimeImage
}

export interface AnimeEntry {
  mal_id: number
  images: AnimeImageTypes
  title: string
  url: string
}

export interface AnimeUser {
  url: string
  username: string
}

export interface Anime {
  content: string
  date: string
  entry: Array<AnimeEntry>
  mal_id: string
  user: AnimeUser
}

export interface AnimeSearchResult {
  mal_id: string
  url: string
  title: string
  title_japanese: string
  status: string
  images: AnimeImageTypes
}

export interface AnimeDetailData {
  approved: boolean
  title: string
  title_english: string
  title_japanese: string
  type: string
  rank: number
  score: number
  scored: number
  scored_by: number
  popularity: number
  synopsis: string
  status: string
  images: AnimeImageTypes
}