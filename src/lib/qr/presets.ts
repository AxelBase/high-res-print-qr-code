// src/lib/qr/presets.ts

import type { ResolutionPreset } from './types';

export const presets: Record<ResolutionPreset, { width: number; height: number }> = {
  '300dpi-letter': { width: 2550, height: 3300 },
  '720p-square': { width: 2160, height: 2160 },
  '1080p-square': { width: 3240, height: 3240 },
  '4k-square': { width: 4320, height: 4320 },
  'svg': { width: 0, height: 0 } // Placeholder, handled separately
};