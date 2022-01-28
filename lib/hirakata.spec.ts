import { convertToKatakana, HIRAGANA, KATAKANA } from './hirakata'

describe('convertToKatakana', () => {
  it('words', () => {
    expect(convertToKatakana('こんにちは')).toBe('コンニチハ')
    expect(convertToKatakana('ドラえもん')).toBe('ドラエモン')
    expect(convertToKatakana('ドラ右衛門')).toBe('ドラ')
    expect(convertToKatakana(HIRAGANA.join(''))).toBe(KATAKANA.join(''))
  })
})
