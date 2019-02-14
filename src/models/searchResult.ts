import { SearchMedia } from "./searchMedia";

export interface SearchResult {
    Response: boolean;
    Search: SearchMedia[];
    totalResults: number;
}