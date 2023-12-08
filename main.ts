import { App_model_impl } from './model.ts'
import { router } from './router.ts'

const app_ctx: App_context = await (async () => {
  const dictionary_key = Deno.env.get('DICTIONARY_KEY')
  if (dictionary_key === undefined)
    throw Error(`no dictionary key in env`)

  return {
    dictionary_key,
    model: new App_model_impl(await Deno.openKv()),
  }
})()

Deno.serve(
  {
    port: 10003,
  },
  async (req: Request): Promise<Response> => {
    const url = new URL(req.url)
    try {
      return await router(url.pathname)({
        url,
        req,
        app: app_ctx,
      })
    } catch(err) {
      console.error(`respond 500 error`)
      console.error(err)
      return new Response(`Unknown Error`, { status: 500 })
    }
  }
)
