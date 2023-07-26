import { component$ } from '@builder.io/qwik';
import { Speak, useTranslate } from 'qwik-speak';

export const Home = component$(() => {
  const t = useTranslate();
  return (
    <>
      <h1>{t('foo')}</h1>
    </>
  );
});

export default component$(() => {
  return (
    /**
     * Add Home translations (only available in child components)
     */
    <Speak>
      <Home />
    </Speak>
  );
});
