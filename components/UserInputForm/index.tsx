import { useState,FormEvent} from 'react'
import { convertToKatakana} from '../../lib/hirakata'

export function UserInputForm({submit}: {submit: (text: string) => Promise<void>}) {
  const [userWord,setUserWord] = useState('')
  const userWordKatakana = convertToKatakana(userWord)
  const isUserWordValid = userWordKatakana.length === 5
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isUserWordValid) return
    await submit(userWordKatakana)
    setUserWord('')
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        value={userWord}
        onChange={e=> setUserWord(e.target.value)}
        type="text"
        placeholder="あいうえお"
        className="text-center bg-indigo-50 px-4 py-2 outline-none rounded-md w-full mb-3"
        tabIndex={1}
      />
      {
        isUserWordValid ? (
          <button type="submit" className="w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">送信</button>
        ):(
          <p className="text-sm text-center">読みが5文字の単語を、<br />ひらがなか、カタカナで入力してください</p>
        )
      }
    </form>
  )
}
