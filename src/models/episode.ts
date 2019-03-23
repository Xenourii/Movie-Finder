import { Media } from './media';

export interface Episode extends Media {
    Season?: string;
    Episode?: string;
}