export default {
  json(data: unknown) {
    return new Response(JSON.stringify(data), { status: 200 })
  }
}
