const localStorageCheck = () => typeof localStorage !== 'undefined'

export function useStorage<T>(storageKey: string, defaultValue: T) {
  const get = (): T => {
    if (!localStorageCheck()) return defaultValue
    const strData = localStorage.getItem(storageKey) as string
    return strData ? JSON.parse(strData) : defaultValue
  }

  const set = (value: T) => {
    if (!localStorageCheck()) return
    localStorage.setItem(storageKey, JSON.stringify(value))
  }

  return { get, set }
}
