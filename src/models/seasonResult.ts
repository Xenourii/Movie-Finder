import { episodeResult } from "./episodeResult";

export interface SeasonResult {
    Title?: string;
    Season?: string;
    Episodes?: episodeResult[];
    Response: string;
}