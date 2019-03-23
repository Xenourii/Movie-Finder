import { EpisodeResult } from "./EpisodeResult";

export interface SeasonResult {
    Title?: string;
    Season?: string;
    Episodes?: EpisodeResult[];
    Response: string;
}