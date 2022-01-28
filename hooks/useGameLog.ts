import { useStorage } from './useStorage'

type GameLog = {
  count: number
  gameNumber: number
}
type GameLogs = GameLog[]

const STORAGE_KEY = 'game_log'

export function useGameLog() {
  const { get: getStorage, set: setStorage } = useStorage<GameLogs>(
    STORAGE_KEY,
    []
  )

  const addGameLog = (gameLog: GameLog) => {
    const data = getStorage()
    setStorage([...data, gameLog])
  }

  const getGameLog = () => {
    return getStorage()
  }

  return {
    addGameLog,
    getGameLog,
  }
}
