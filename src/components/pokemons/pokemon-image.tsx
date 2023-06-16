import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { Interface } from 'readline';

interface Props {
  id: number | string;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false, isVisible = false }: Props) => {
    const imageLoaded = useSignal(true);

    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
    });

    const pathPokeApi =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

    const imageUrl = useComputed$(() => {
      return backImage
        ? `${pathPokeApi}/back/${id}.png`
        : `${pathPokeApi}/${id}.png`;
    });

    return (
      <div
        class="flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && <span>Cargando...</span>}
        <img
          src={imageUrl.value}
          alt="Pokemon Sprite"
          style={{ width: `${size}px` }}
          onLoad$={() => (imageLoaded.value = true)}
          class={[
            {
              hidden: !imageLoaded.value,
              'brightness-0': isVisible,
            },
            'transition-all',
          ]}
        />
      </div>
    );
  }
);
