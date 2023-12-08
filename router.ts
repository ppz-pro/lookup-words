import { from_learners, all_from_learners } from './handles/lookup.ts'

export
const router = (pathname: string): ((ctx: Request_ctx) => Res) => {
  switch(pathname) {
    case '/lookup/learners':
      return from_learners
    case '/all/learners':
      return all_from_learners
    default:
      return (_: Request_ctx) => {
        console.error(`no route for ${pathname}`)
        return new Response(`Not Found`, { status: 404 })
      }
  }
}