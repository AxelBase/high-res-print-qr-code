// src/lib/qr/generator.ts
import QRCodeStyling, { type Options, type Extension } from 'qr-code-styling';
import type { QRConfig, ResolutionPreset } from './types';
import { presets } from './presets';

export async function generateQR(config: QRConfig): Promise<QRCodeStyling> {
  const options: Options = {
    width: config.width,
    height: config.height,
    data: config.data,
    margin: config.margin ?? 4,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: config.errorCorrection ?? 'Q'
    },
    image: config.logo || undefined,
    dotsOptions: {
      type: config.cornerStyle ?? 'square',
      color: config.foregroundColor ?? '#000000'
    },
    backgroundOptions: {
      color: config.backgroundColor ?? '#ffffff'
    },
    cornersSquareOptions: { type: config.cornerStyle ?? 'square' },
    cornersDotOptions: { type: config.cornerStyle ?? 'square' }
  };

  return new QRCodeStyling(options);
}

/** Returns SVG string for live preview (300×300) */
export async function getPreviewSVG(config: QRConfig): Promise<string> {
  const qr = await generateQR({ ...config, width: 300, height: 300 });
  const svg = await qr.getRawData('svg');
  // getRawData('svg') returns a string, not a Blob
  return typeof svg === 'string' ? svg : await svg.text();
}

/** Returns Blob for final download (PNG or SVG) */
export async function getDownloadBlob(
  config: QRConfig,
  preset: ResolutionPreset,
  format: 'png' | 'svg'
): Promise<Blob> {
  let width = 300;
  let height = 300;

  if (preset !== 'svg') {
    const p = presets[preset];
    width = p.width;
    height = p.height;
  }

  const qr = await generateQR({ ...config, width, height });
  const blob = await qr.getRawData(format);
  return blob as Blob;
}