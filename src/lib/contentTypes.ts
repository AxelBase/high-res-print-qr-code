// src/lib/contentTypes.ts
export interface ContentType {
  label: string;
  template: (params: Record<string, string>) => string;
  fields: { name: string; label: string; type: 'text' | 'email' | 'tel' | 'url' }[];
}

export const contentTypes: Record<string, ContentType> = {
  text: {
    label: 'Plain Text',
    template: (p) => p.text,
    fields: [{ name: 'text', label: 'Text', type: 'text' }]
  },
  url: {
    label: 'URL',
    template: (p) => p.url,
    fields: [{ name: 'url', label: 'URL', type: 'url' }]
  },
  vcard: {
    label: 'vCard',
    template: (p) => `BEGIN:VCARD\nVERSION:3.0\nFN:${p.name}\nTEL:${p.phone}\nEMAIL:${p.email}\nEND:VCARD`,
    fields: [
      { name: 'name', label: 'Full Name', type: 'text' },
      { name: 'phone', label: 'Phone', type: 'tel' },
      { name: 'email', label: 'Email', type: 'email' }
    ]
  },
  wifi: {
    label: 'Wi-Fi',
    template: (p) => `WIFI:S:${p.ssid};T:${p.type};P:${p.password};;`,
    fields: [
      { name: 'ssid', label: 'SSID', type: 'text' },
      { name: 'type', label: 'Encryption (WPA/WEP/none)', type: 'text' },
      { name: 'password', label: 'Password', type: 'text' }
    ]
  },
  email: {
    label: 'Email',
    template: (p) => `mailto:${p.email}?subject=${encodeURIComponent(p.subject)}&body=${encodeURIComponent(p.body)}`,
    fields: [
      { name: 'email', label: 'Email Address', type: 'email' },
      { name: 'subject', label: 'Subject', type: 'text' },
      { name: 'body', label: 'Body', type: 'text' }
    ]
  },
  phone: {
    label: 'Phone',
    template: (p) => `tel:${p.phone}`,
    fields: [{ name: 'phone', label: 'Phone Number', type: 'tel' }]
  },
  geo: {
    label: 'Geo Location',
    template: (p) => `geo:${p.lat},${p.lon}`,
    fields: [
      { name: 'lat', label: 'Latitude', type: 'text' },
      { name: 'lon', label: 'Longitude', type: 'text' }
    ]
  }
};