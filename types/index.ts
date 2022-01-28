export type HintStatus = 'ABORT' | 'CORRECT' | 'PRESENT'

export type Hint = { letter: string; status: HintStatus }

export type Response = {
  letterHints: Hint[]
  isCollect: boolean
  inDict: boolean
}
