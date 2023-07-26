import type { RequestHandler } from '@builder.io/qwik-city';
import { speakConfig } from '../speak-config';

export const onRequest: RequestHandler = ({ params, locale }) => {
  locale(params.lang || speakConfig.defaultLocale.lang);
};
