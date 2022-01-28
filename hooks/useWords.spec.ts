import 'jest-localstorage-mock'

import { renderHook } from '@testing-library/react-hooks'
import { useWords } from './useWords'
import { Response } from '../types'

describe('useWords', () => {
  const apiMockData: Response = {
    letterHints: [],
    isCollect: false,
    inDict: false,
  }
  it('words', async () => {
    const { words, submitWord } = renderHook(() => useWords(1)).result.current
    expect(words).toHaveLength(0)
  })
})
