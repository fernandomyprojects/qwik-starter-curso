import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>List SSR!</div>;
});

export const head: DocumentHead = {
  title: 'List SSR',
};
