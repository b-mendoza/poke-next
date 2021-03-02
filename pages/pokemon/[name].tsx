import { GetStaticPaths, GetStaticProps } from 'next'
import { Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

type Props = {
  name: string
  sprite: string
}

function Pokemon({ name, sprite }: Props) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'grid',
          placeContent: 'center',
          placeItems: 'center'
        }}
      >
        <Heading as="h1" size="4xl">
          Loading . . .
        </Heading>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{`${name}'s Info`}</title>
      </Head>

      <main>
        <Heading as="h2" size="2xl" my="3">
          {name}
        </Heading>

        <Image src={sprite} alt={`${name} sprite`} height={96} width={96} />
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
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { name: 'pikachu' } },
    { params: { name: '25' } },
    { params: { name: 'bewear' } },
    { params: { name: '760' } }
  ],
  fallback: true
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  type APIResponse = {
    name: string
    sprites: {
      other: {
        'official-artwork': {
          front_default: string
        }
      }
    }
  }

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${
      params ? (params.name as string).toLowerCase() : 25
    }`
  )

  const { name, sprites }: APIResponse = await response.json()

  const normalizedName = `${name.charAt(0).toUpperCase()}${name.substr(1)}`

  return {
    props: {
      name: normalizedName,
      sprite: sprites.other['official-artwork'].front_default
    }
  }
}

export default Pokemon
