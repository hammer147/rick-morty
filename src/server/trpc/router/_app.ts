// src/server/router/_app.ts
import { router } from '../trpc'

import { exampleRouter } from './example'
import { rickandmortyRouter } from './rickandmorty'

export const appRouter = router({
  example: exampleRouter,
  rickandmorty: rickandmortyRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
