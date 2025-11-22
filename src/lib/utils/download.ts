// src/lib/utils/download.ts

import { slugify } from './slugify';
import type { ResolutionPreset } from '$lib/qr/types';

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generateFilename(content: string, preset: ResolutionPreset, format: string): string {
  const preview = slugify(content.substring(0, 20));
  const res = preset === 'svg' ? 'svg' : preset;
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  return `qr_${preview}_${res}_${timestamp}.${format}`;
}