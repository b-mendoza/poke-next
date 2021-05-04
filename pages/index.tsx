import {
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

function Home() {
  const [pokemonName, setPokemonName] = useState('');

  const router = useRouter();

  const handlePokemonName = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const input = target as HTMLInputElement;
    const inputValue = input.value;

    setPokemonName(inputValue);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await router.push(`/pokemon/${pokemonName.toLowerCase()}`);
  };

  return (
    <>
      <Head>
        <title>Poke API - NextJS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading my="2">Welcome to Poke API</Heading>

        <form onSubmit={handleSubmit}>
          <FormControl id="pokemon-name">
            <FormLabel>Pokemon Name</FormLabel>
            <Input
              type="text"
              placeholder="Type a Pokemon name e.g. Pikachu"
              value={pokemonName}
              onChange={handlePokemonName}
            />
            <FormHelperText>C&apos;mon search for a Pokemon</FormHelperText>
          </FormControl>
        </form>
      </main>

      <style jsx>{`
        main {
          height: 100vh;

          display: grid;

          place-content: center;
          place-items: center;
        }

        form {
          width: 100%;
        }
      `}</style>
    </>
  );
}

export default Home;
