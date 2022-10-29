import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Character from '../components/character'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const [page, setPage] = useState(1)

  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" })

  const { data, status } = trpc.rickandmorty.fetchCharacters.useQuery(page, {
    keepPreviousData: true
  })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'error') {
    return <div>Error</div>
  }

  return (
    <div className='characters'>
      {data.results.map(character => (
        <Character character={character} />
      ))}
      <div>
        <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(old => old + 1)} disabled={!data.info.next}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Home
