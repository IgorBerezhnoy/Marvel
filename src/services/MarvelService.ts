export class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey = 'apikey=c8cd3c81aa17b9e2ff2b1a2f53820677'
  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
  }
  getCharacterById = (id: string) => {
    return this.getResource(`${this._apiBase}characters/?${id}${this._apiKey}`)
  }
  getResource = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }
}
