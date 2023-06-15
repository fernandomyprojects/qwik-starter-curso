import { component$, useComputed$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { URLSearchParams } from 'url';
import { BasicPokemonInfo, PokemonListResponse } from '~/interfaces/pokemon-list.response';

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async() => {

  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=10`);

  const data = await resp.json() as PokemonListResponse;

  return data.results;

});

export default component$(() => {

  const pokemons = usePokemonList();

  const location = useLocation();

  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams( location.url.search);
    return Number(offsetString.get('offset') || 0);
  })




  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Está cargando página: xxx</span>
      </div>

      <div class="mt-10">
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2">
          Anteriores
        </Link>

        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2">
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map( ({name}) => (
            <div key={name} class="m-5 flex flex-col justify-center items-center">
              <span class="capitalize">{name}</span>
            </div>
          ))
        }
      </div>

    </>
  )
});

export const head: DocumentHead = {
  title: 'List SSR',
};
