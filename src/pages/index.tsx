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
      <div className='flex space-x-2 justify-center m-4'>
        <button 
        className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
        onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <button 
        className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
        onClick={() => setPage(old => old + 1)} disabled={!data.info.next}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Home
