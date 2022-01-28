import words from './words.json'

type WordsJsonType = {
  answerWords: string[]
  allWords: string[]
}

export const { answerWords, allWords } = words as WordsJsonType
