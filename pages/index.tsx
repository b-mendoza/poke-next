import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input
} from '@chakra-ui/react'
import Head from 'next/head'

function Home() {
  const [pokemonName, setPokemonName] = useState('')

  const router = useRouter()

  const handlePokemonName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement
    const pokemonName = input.value

    setPokemonName(pokemonName)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    router.push(`/pokemon/${pokemonName.toLowerCase()}`)
  }

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
            <FormHelperText>C'mon search for a Pokemon</FormHelperText>
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
  )
}

export default Home
