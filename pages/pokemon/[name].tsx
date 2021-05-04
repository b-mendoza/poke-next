import { Heading } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {
  isError: boolean;
  name: string;
  sprite: string;
};

function Pokemon({ isError, name, sprite }: Props) {
  const router = useRouter();

  const { name: pokemonQueryName } = router.query;

  if (router.isFallback) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'grid',
          placeContent: 'center',
          placeItems: 'center',
        }}
      >
        <Heading as="h1" size="4xl">
          Loading . . .
        </Heading>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${name ?? (pokemonQueryName as string)}'s Info`}</title>
      </Head>

      <main>
        {!isError ? (
          <>
            <Heading as="h2" size="2xl" my="3">
              {name}
            </Heading>
            <Image src={sprite} alt={`${name} sprite`} height={96} width={96} />{' '}
          </>
        ) : (
          <Heading as="h2" size="2xl" my="3">
            Looks like <em>{pokemonQueryName}</em> doesn&apos;t exist
          </Heading>
        )}
      </main>

      <style jsx>{`
        main {
          height: 100vh;

          display: grid;

          place-content: center;
          place-items: center;
        }
      `}</style>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { name: 'pikachu' } },
    { params: { name: '25' } },
    { params: { name: 'bewear' } },
    { params: { name: '760' } },
  ],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  type APIResponse = {
    name: string;
    sprites: {
      other: {
        'official-artwork': {
          front_default: string;
        };
      };
    };
  };

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${
        params ? (params.name as string).toLowerCase() : 25
      }`,
    );

    const { name, sprites } = (await response.json()) as APIResponse;

    const normalizedName = `${name.charAt(0).toUpperCase()}${name.substr(1)}`;

    return {
      props: {
        isError: false,
        name: normalizedName,
        sprite: sprites.other['official-artwork'].front_default,
      },
    };
  } catch (error: unknown) {
    console.error(error);

    return {
      props: {
        isError: true,
      },
    };
  }
};

export default Pokemon;
