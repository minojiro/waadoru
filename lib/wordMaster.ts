import type { Hint, Response } from '../types'
import { answerWords, allWords } from './words'

const ALL_WORDS_SET = new Set([...answerWords, ...allWords])

export const correct = (word: string, answer: string): Response => {
  const ANSWER_LENGTH = answer.length
  const answerLetters = answer.split('')
  const letters = word.split('')

  if (letters.length !== ANSWER_LENGTH) {
    throw new Error(`the answer is ${ANSWER_LENGTH} letters.`)
  }

  const letterHints = letters.map((letter, i): Hint => {
    if (letter === answer[i]) return { letter, status: 'CORRECT' }
    if (answerLetters.includes(letter)) return { letter, status: 'PRESENT' }
    return { letter, status: 'ABORT' }
  })
  return {
    letterHints,
    isCollect: word === answer,
    inDict: ALL_WORDS_SET.has(word),
  }
}
