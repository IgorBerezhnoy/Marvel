import { RandomCharStateType } from '@/components/randomChar/RandomChar'
import { CharacterType } from '@/services/MarvelServiceType'

export class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey = 'apikey=5a3bb599208562ea7f03278e7e459f5e'
  _transformCharacter = (res: CharacterType): RandomCharStateType => {
    const { description, name, thumbnail, urls } = res

    return {
      descr: description,
      homepage: urls[0].url,
      name: name,
      thumbnail: thumbnail.path + '.' + thumbnail.extension,
      wiki: urls[1].url,
    }
  }
  getAllCharacters = async (): Promise<RandomCharStateType> => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    )

    return res.data.results.map((el: CharacterType) => {
      return this._transformCharacter(el)
    })
  }
  getCharacterById = async (id: number): Promise<RandomCharStateType> => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)

    return this._transformCharacter(res.data.results[0])
  }
  getResource = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }
}
