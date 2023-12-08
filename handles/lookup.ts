import respond from '../fn/respond.ts'

export
const from_learners = async (ctx: Request_ctx): Promise<Response> => {
  const word = ctx.url.searchParams.get('word')
  if (word === '' || word === null)
    return new Response(`no word?`, { status: 400 })
  let result = await ctx.app.model.dicts.learners.get(word)
  if (result === null) {
    console.log(`new word [${word}] from learners`)
    const res = await fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${ctx.app.dictionary_key}`)
    result = await res.json() as Lookup_result
    await ctx.app.model.dicts.learners.sav(word, result)
  }
  return respond.json(result)
}

export
const all_from_learners = async (ctx: Request_ctx): Promise<Response> => {
  return respond.json(await ctx.app.model.dicts.learners.get_all())
}
