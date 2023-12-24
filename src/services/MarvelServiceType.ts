export type RootObjectDataResultsThumbnail = {
  extension: string
  path: string
}
export type RootObjectDataResultsComicsItems = {
  name: string
  resourceURI: string
}
export type RootObjectDataResultsComics = {
  available: number
  collectionURI: string
  items: RootObjectDataResultsComicsItems[]
  returned: number
}
export type RootObjectDataResultsSeriesItems = {
  name: string
  resourceURI: string
}
export type RootObjectDataResultsSeries = {
  available: number
  collectionURI: string
  items: RootObjectDataResultsSeriesItems[]
  returned: number
}
export type RootObjectDataResultsStoriesItems = {
  name: string
  resourceURI: string
  type: string
}
export type RootObjectDataResultsStories = {
  available: number
  collectionURI: string
  items: RootObjectDataResultsStoriesItems[]
  returned: number
}
export type RootObjectDataResultsEvents = {
  available: number
  collectionURI: string
  items: any[]
  returned: number
}
export type RootObjectDataResultsUrls = {
  type: string
  url: string
}
export type CharacterType = {
  comics: RootObjectDataResultsComics
  description: string
  events: RootObjectDataResultsEvents
  id: number
  modified: string
  name: string
  resourceURI: string
  series: RootObjectDataResultsSeries
  stories: RootObjectDataResultsStories
  thumbnail: RootObjectDataResultsThumbnail
  urls: RootObjectDataResultsUrls[]
}
export type GetCharactersResType = {
  count: number
  limit: number
  offset: number
  results: CharacterType[]
  total: number
}
export type GetCharactersResponseType = {
  attributionHTML: string
  attributionText: string
  code: number
  copyright: string
  data: GetCharactersResType
  etag: string
  status: string
}
