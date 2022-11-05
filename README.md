# Create T3 App

## Example of fetching an external API

``` ts
import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { rickandmortySchema } from '../../../schemas'

export const rickandmortyRouter = router({
  fetchCharacters: publicProcedure.input(z.number().positive()).query(async ({ input }) => {
    const rickandmortyRes = await fetch(`https://rickandmortyapi.com/api/character?page=${input}`)
    // error handling
    if (!rickandmortyRes.ok) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' })
    }
    // validate the shape with Zod (throws if invalid)
    const validated = rickandmortySchema.parse(await rickandmortyRes.json())
    return validated
  })
})
```
