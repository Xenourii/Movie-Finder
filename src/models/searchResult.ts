import { SearchMovie } from "./searchMovie";

export interface SearchResult {
    Response: boolean;
    Search: SearchMovie[];
    totalResults: number;
}