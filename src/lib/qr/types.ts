// src/lib/qr/types.ts

export type ResolutionPreset = '300dpi-letter' | '720p-square' | '1080p-square' | '4k-square' | 'svg';

export type CornerStyle = 'square' | 'dot' | 'rounded';

export type ErrorCorrection = 'L' | 'M' | 'Q' | 'H';

export interface QRConfig {
  data: string;
  width?: number;
  height?: number;
  margin?: number; // Quiet zone in modules (0-8)
  errorCorrection?: ErrorCorrection;
  foregroundColor?: string;
  backgroundColor?: string;
  cornerStyle?: CornerStyle;
  logo?: string; // URL or data URL for center image
}