import { useState } from 'react'
import { Response } from '../types'
import { useStorage } from './useStorage'
import { useGameLog } from './useGameLog'

type SaveData = {
  gameNumber: number
  words: Response[]
}

const DEFAULT_SAVE_DATA = (gameNumber: number): SaveData => ({
  gameNumber,
  words: [],
})

const correctAPIRequest = async (no: number, q: string): Promise<Response> => {
  const query = new URLSearchParams({ no: String(no), q })
  const res = await fetch(`/api/correct?${query}`)
  if (res.status !== 200) throw new Error()
  return await res.json()
}

const STORAGE_KEY = 'game_data'

export const MAX_ANSWER_COUNT_PER_GAME = 10

const generateShareUrl = (gameNumber: number, words: Response[]) => {
  const rawText = [
    `和あどる ${gameNumber} ${words.length}/${MAX_ANSWER_COUNT_PER_GAME}`,
    ...words.map((word) => {
      return word.letterHints
        .map((letter) => {
          if (letter.status === 'CORRECT') return '🟩'
          if (letter.status === 'PRESENT') return '🟨'
          return '⬛️'
        })
        .join('')
    }),
    'https://waadoru.vercel.app/',
  ].join('\n')

  const baseUrl = 'https://twitter.com/intent/tweet?'
  const text = ['text', rawText]
  const query = new URLSearchParams([text]).toString()
  return `${baseUrl}${query}`
}

export const useWords = (gameNumber: number) => {
  const { get: getStorage, set: setStorage } = useStorage<SaveData>(
    STORAGE_KEY,
    DEFAULT_SAVE_DATA(gameNumber)
  )
  const { addGameLog, getGameLog } = useGameLog()

  const [words, setWords] = useState<Response[]>(
    getStorage().gameNumber === gameNumber ? getStorage().words : []
  )

  const isDone = words.some(({ isCollect }) => isCollect)
  const isGameOver = words.length >= MAX_ANSWER_COUNT_PER_GAME

  const submitWord = async (input: string) => {
    const word = await correctAPIRequest(gameNumber, input)
    if (word.inDict) {
      const nextWords = [...words, word]
      setWords(nextWords)
      setStorage({ gameNumber, words: nextWords })
      if (word.isCollect) {
        addGameLog({ gameNumber, count: nextWords.length })
      }
    }
    return word.inDict
  }

  const shareUrl = generateShareUrl(gameNumber, words)

  return {
    words,
    submitWord,
    isDone,
    isGameOver,
    shareUrl,
    getGameLog,
  }
}
