export
class App_model_impl implements App_model {
  public dicts: Dicts
  constructor(
    kv: Deno.Kv,
  ) {
    this.dicts = {
      learners: new Collection_impl(kv, 'dict_learners')
    }
  }
}

export
class Collection_impl implements Dict_collection {
  public _ = 'haha'
  constructor(
    private kv: Deno.Kv,
    private name: string,
  ) {}

  k(key: string) {
    return [this.name, key]
  }

  async get(key: string) {
    const res = await this.kv.get<Lookup_result>(this.k(key))
    return res.value
  }

  async sav(key: string, val: Lookup_result) {
    await this.kv.set(this.k(key), val)
  }
}
