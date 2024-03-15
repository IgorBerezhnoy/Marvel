import { RandomCharStateType } from '@/components/randomChar/RandomChar'
import { useHttp } from '@/hooks/http.hook'
import { CharacterType } from '@/services/MarvelServiceType'

export const useMarvelService = () => {
  const { clearError, error, loading, request } = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=5a3bb599208562ea7f03278e7e459f5e'
  const _baseLimitChars = 9
  const _baseLimitComics = 8
  const _baseOffsetChars = 210
  const _transformCharacter = (res: CharacterType): RandomCharStateType => {
    const { comics, description, id, name, thumbnail, urls } = res

    return {
      comics,
      descr: description,
      homepage: urls[0].url,
      id,
      name: name,
      thumbnail: thumbnail.path + '.' + thumbnail.extension,
      wiki: urls[1].url,
    }
  }
  const getAllCharacters = async (offset = _baseOffsetChars): Promise<RandomCharStateType[]> => {
    const res = await request(
      `${_apiBase}characters?limit=${_baseLimitChars}&offset=${offset}&${_apiKey}`
    )

    return res.data.results.map((el: CharacterType) => {
      return _transformCharacter(el)
    })
  }

  const getCharacterById = async (id: number): Promise<RandomCharStateType> => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)

    return _transformCharacter(res.data.results[0])
  }

  return { clearError, error, getAllCharacters, getCharacterById, loading }
}
