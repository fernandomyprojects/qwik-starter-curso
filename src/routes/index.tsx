import { $, component$, useSignal } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {

  const nav = useNavigate();

  const pokemonId = useSignal(1);
  const showBackImage = useSignal(false);
  const isPokemonVisible = useSignal(false);

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) return;

    pokemonId.value += value;
  });

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonId.value}`);
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>
      <div onClick$={ () => goToPokemon()}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>

      <div class="mt-2">
        <button
          onClick$={() => changePokemonId(-1)}
          class="btn btn-primary mr-2"
        >
          Anterior
        </button>
        <button
          onClick$={() => changePokemonId(1)}
          class="btn btn-primary mr-2"
        >
          Siguiente
        </button>

        <button
          onClick$={() => (showBackImage.value = !showBackImage.value)}
          class="btn btn-primary mr-2"
        >
          Volvear
        </button>

        <button
          onClick$={() => (isPokemonVisible.value = !isPokemonVisible.value)}
          class="btn btn-primary"
        >
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
