import Head from 'next/head'
import { useCallback} from 'react'
import { WordRow} from '../components/WordRow'
import { UserInputForm} from '../components/UserInputForm'
import {useWords, MAX_ANSWER_COUNT_PER_GAME} from '../hooks/useWords'
import { getCurrentGameNumber } from '../lib/answers'

const TITLE = '和あどる'

declare global {
  interface Window {
    dataLayer: any
  }
}

export default function Home({ gameNumber }: { gameNumber: number }) {
  const {
    words,
    submitWord,
    isDone,
    shareUrl,
    isGameOver,
  } = useWords(gameNumber)


  const answer = useCallback(async (text: string) => {
    const inDict = await submitWord(text)
    if (!inDict) alert('辞書にない単語でした')
  }, [words])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-2 bg-gradient-to-br from-gray-100 to-gray-200">
      <Head>
        <title>{TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white px-10 py-8 rounded-xl shadow-md max-w-sm w-full">
        <h1 className="text-center text-2xl font-semibold text-gray-600">{TITLE}</h1>
        <p className="text-center text-gray-600">Wordleリスペクト</p>
        <ul className="group my-5">
          {words.map((word,i) => (<li key={i} className="mb-2"><WordRow word={word} /></li>))}
        </ul>
        {(() => {
          if (isDone) {
            return (
              <p className="text-center"><b className="font-bold text-red-500">クリア！</b><br />更新は、次の正午です。<br /><a className="underline text-blue-400" href={shareUrl}>ツイートする</a></p>
            )
          } else if (isGameOver) {
            return <p className="text-center font-bold">上限の {MAX_ANSWER_COUNT_PER_GAME} 回に達しました。更新は、次の正午です。<br /><a className="underline text-blue-400" href={shareUrl}>ツイートする</a></p>
          } else {
            return <UserInputForm submit={answer} />
          }
        })()}
        <div className="my-3"><hr /></div>
        <p className="text-sm">
          <span aria-label="グレー" className="text-gray-400">■</span>単語に含まれていません<br />
          <span aria-label="イエロー" className="text-amber-400">■</span>単語に含まれていますが、位置が違います<br />
          <span aria-label="グリーン" className="text-teal-400">■</span>単語に含まれていて、位置も正しい<br />
          1ゲームにつき10回まで回答でき、毎日正午に更新されます。
        </p>
        <p className="mt-5 text-center">
          <a target="_blank" href="https://github.com/minojiro/waadoru" className="mx-auto inline-block">
            <img src="/github.svg" className="mx-auto" alt="" />
          </a>
        </p>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const gameNumber = getCurrentGameNumber()
  const GA_ID = process.env.GA_ID || ''
  return {
    props: {gameNumber, GA_ID},
  }
}
