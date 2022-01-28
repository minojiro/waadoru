import { getCurrentGameNumber, getAnswer } from './answers'
import MockDate from 'mockdate'

describe('answers', () => {
  describe('getCurrentGameNumber', () => {
    it('正午に更新されること', () => {
      MockDate.set('2022-01-30 11:59:59')
      expect(getCurrentGameNumber()).toBe(1)
      MockDate.set('2022-01-30 12:00:00')
      expect(getCurrentGameNumber()).toBe(2)
    })
  })

  describe('getAnswer', () => {
    it('先の答えや、0以下の番号の答えを知ろうとするとエラーになること', () => {
      MockDate.set('2022-01-30 11:59:59')
      expect(() => getAnswer(2)).toThrowError()
      expect(() => getAnswer(1)).not.toThrowError()
      expect(() => getAnswer(0)).toThrowError()
    })
  })
})
