import { component$ } from '@builder.io/qwik';
import { DocumentHead, useLocation, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) redirect(301, '/');
  if (id <= 0) redirect(301, '/');
  if (id > 1000) redirect(301, '/');
  return id;
});
export default component$(() => {
  //const location = useLocation();
  const pokemonId = usePokemonId();

  return (
    <>
      {/* <span class="text-3xl">Pokemon: {location.params.id}</span> */}
      <span class="text-3xl">Pokemon: {pokemonId}</span>

      <PokemonImage id={pokemonId.value} />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Pokemon',
};
