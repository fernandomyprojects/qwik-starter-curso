import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <span class="text-5xl">Pokemon: </span>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Pokemon',
};
