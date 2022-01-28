import { correct } from './wordMaster'

describe('correct', () => {
  const ANSWER = 'コンニチハ'

  it('isCollect', () => {
    expect(correct('コンニチハ', ANSWER).isCollect).toBe(true)
    expect(correct('アリガトウ', ANSWER).isCollect).toBe(false)
  })

  it('letterHints', () => {
    const { letterHints } = correct('ドンコニシ', ANSWER)
    expect(letterHints[0]).toEqual({ letter: 'ド', status: 'ABORT' })
    expect(letterHints[1]).toEqual({ letter: 'ン', status: 'CORRECT' })
    expect(letterHints[2]).toEqual({ letter: 'コ', status: 'PRESENT' })
    expect(letterHints[3]).toEqual({ letter: 'ニ', status: 'PRESENT' })
    expect(letterHints[4]).toEqual({ letter: 'シ', status: 'ABORT' })
  })

  it('文字数が合わない場合はエラーにする', () => {
    expect(() => correct(`${ANSWER}ン`, ANSWER)).toThrowError()
    expect(() => correct('', ANSWER)).toThrowError()
  })
})
