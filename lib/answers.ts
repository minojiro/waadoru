import dayjs from 'dayjs'
import { answerWords } from './words'

const FIRST_DAY = dayjs('2022-01-28 12:00:00')

export const getCurrentGameNumber = () => dayjs().diff(FIRST_DAY, 'days')

export const getAnswer = (gameNumber: number) => {
  if (gameNumber > getCurrentGameNumber() || gameNumber < 1) {
    throw new Error('this game is not available')
  }
  return answerWords[gameNumber % answerWords.length]
}
