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

export type ComicsType = {
  id: number
  prices: RootComicsPrices
  thumbnail: string
  title: string
}
export type RootComics = {
  characters: RootComicsCharacters
  collectedIssues: any[]
  collections: any[]
  creators: RootComicsCreators
  dates: RootComicsDates[]
  description: string
  diamondCode: string
  digitalId: number
  ean: string
  events: RootComicsEvents
  format: string
  id: number
  images: RootComicsImages[]
  isbn: string
  issn: string
  issueNumber: number
  modified: string
  pageCount: number
  prices: RootComicsPrices[]
  resourceURI: string
  series: RootComicsSeries
  stories: RootComicsStories
  textObjects: RootComicsTextObjects[]
  thumbnail: RootComicsThumbnail
  title: string
  upc: string
  urls: RootComicsUrls[]
  variantDescription: string
  variants: any[]
}
export type RootComicsTextObjects = {
  language: string
  text: string
  type: string
}
export type RootComicsUrls = {
  type: string
  url: string
}
export type RootComicsSeries = {
  name: string
  resourceURI: string
}
export type RootComicsDates = {
  date: string
  type: string
}
export type RootComicsPrices = {
  price: number
  type: string
}
export type RootComicsThumbnail = {
  extension: string
  path: string
}
export type RootComicsImages = {
  extension: string
  path: string
}
export type RootComicsCreatorsItems = {
  name: string
  resourceURI: string
  role: string
}
export type RootComicsCreators = {
  available: number
  collectionURI: string
  items: RootComicsCreatorsItems[]
  returned: number
}
export type RootComicsCharacters = {
  available: number
  collectionURI: string
  items: any[]
  returned: number
}
export type RootComicsStoriesItems = {
  name: string
  resourceURI: string
  type: string
}
export type RootComicsStories = {
  available: number
  collectionURI: string
  items: RootComicsStoriesItems[]
  returned: number
}
export type RootComicsEvents = {
  available: number
  collectionURI: string
  items: any[]
  returned: number
}
