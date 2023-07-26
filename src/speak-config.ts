import type { SpeakConfig } from 'qwik-speak';

export const speakConfig: SpeakConfig = {
  defaultLocale: {
    lang: 'en',
  },
  supportedLocales: [
    { lang: 'en' },
    { lang: 'zh-TW' },
    // { lang: 'it-IT', currency: 'EUR', timeZone: 'Europe/Rome' },
    // { lang: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' },
  ],
  assets: [
    'whatever', // Translations shared by the pages
  ],
};
