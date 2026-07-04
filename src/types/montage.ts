export interface MontageFrame {
  id: string;
  src: string;
  fadeIn: number; // in seconds
  hold: number;   // in seconds
  flash?: boolean; // if true, instant appear
  yearText?: number; // target year to count up to
  earthYear?: boolean; // toggle to earth 2026 text
  hideYear?: boolean;
}
