import Image from "next/image";
import { Inter } from "next/font/google";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const inter = Inter({ subsets: ["latin"] });

export default function Home({characters}) {
  return (
    <div>
      <h1>Rick and Morty</h1>

      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <h2>{character.name}</h2>
            <p>Species: {character.species}</p>
            <p>Status: {character.status}</p>
           
          </li>
        ))}
      </ul>
    </div>
    
  )
}

export async function getStaticProps() {

  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql/',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query GetCharacters {
        characters(page: 1) {
          results {
            id
            name
            image
            species
            status
          }
        }
      }
    `
  });

  const characters = data.characters.results;
 

  return {
    props: {
      characters
    }
  }
}
