import Image from "next/image";
import { Inter } from "next/font/google";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Box, Card, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home({characters}) {
  return (
    <Box className="container">
      <Typography>Rick and Morty</Typography>

      <Card className="list">
        {characters.map(character => (
          <div key={character.id}>
            <Typography>{character.name}</Typography>
            <Typography>Species: {character.species}</Typography>
            <Typography>Status: {character.status}</Typography>
           <Typography>Gender: {character.gender}</Typography>
          </div>
        ))}
      </Card>
    </Box>
    
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
            gender
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
