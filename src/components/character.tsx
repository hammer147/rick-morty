import { z } from 'zod'
import { characterSchema } from '../schemas'

type Props = { character: z.infer<typeof characterSchema> }

export default function Character({ character }: Props) {
  return (
    <div className='flex justify-center items-center m-2'>
      <div className='flex flex-col items-center rounded-lg shadow-lg bg-white max-w-sm'>
        <img className='m-3 rounded-t-lg' src={character.image} alt='' />
        <div className='p-6'>
          <h3 className='text-gray-900 text-xl font-medium mb-2'>{character.name}</h3>
          <p className='text-gray-700 text-base mb-4'>
            {character.status} - {character.species}
          </p>
          <p className='text-gray-700 text-base mb-2'>Last seen on {character.location.name}</p>
        </div>
      </div>
    </div>
  )
}
