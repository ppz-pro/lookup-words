declare interface Collection<Key, Val> {
  get(key: Key): Promise<Val | null>
  sav(key: Key, val: Val): Promise<void>
}
declare interface Dict_collection extends Collection<string, Lookup_result> {
  _: string
}

declare interface Dicts {
  learners: Dict_collection
}

declare interface App_model {
  dicts: Dicts

}
declare interface App_context {
  dictionary_key: string
  model: App_model
}

declare type Lookup_result = {
  meta: {
    id: string
  }
}[]

declare interface Request_ctx {
  url: URL
  app: App_context
  req: Request
}

declare type Res = Promise<Response> | Response
