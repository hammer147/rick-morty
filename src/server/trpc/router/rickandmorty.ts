import { router, publicProcedure } from "../trpc"
import { z } from "zod"
import { TRPCError } from '@trpc/server'

// https://transform.tools/json-to-zod
const rickandmortyValidator = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string(),
    prev: z.string().nullable()
  }),
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      status: z.string(),
      species: z.string(),
      type: z.string(),
      gender: z.string(),
      origin: z.object({ name: z.string(), url: z.string() }),
      location: z.object({ name: z.string(), url: z.string() }),
      image: z.string(),
      episode: z.array(z.string()),
      url: z.string(),
      created: z.string()
    })
  )
})

export const rickandmortyRouter = router({
  fetchCharacters: publicProcedure
    .input(z.number().positive())
    .query(async ({ input }) => {
      const rickandmortyRes = await fetch(
        `https://rickandmortyapi.com/api/character?page=${input}`
      )
      // error handling
      if (!rickandmortyRes.ok) {
        // throw new TRPCError(...)
      }
      // validate the shape with Zod
      const validated = rickandmortyValidator.parse(await rickandmortyRes.json())
      return validated
    }),
})
