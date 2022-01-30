import { dayjs } from './time'
import { answerWords } from './words'

const FIRST_DAY = dayjs()
  .tz()
  .year(2022)
  .month(0)
  .date(28)
  .hour(12)
  .minute(0)
  .second(0)
  .millisecond(0)

export const getCurrentGameNumber = () => dayjs().tz().diff(FIRST_DAY, 'days')

export const getAnswer = (gameNumber: number) => {
  if (gameNumber > getCurrentGameNumber() || gameNumber < 1) {
    throw new Error('this game is not available')
  }
  return answerWords[gameNumber % answerWords.length]
}
