import { Response } from '../../types'

export function WordRow({word}: {word: Response}) {
  return (
    <div className="flex">
      {word.letterHints.map((l, i) => {
        let bgClassName = 'bg-gray-600'
        let label = 'グレー'
        if (l.status === 'PRESENT') {
          bgClassName = 'bg-amber-400'
          label = 'イエロー'
        }
        if (l.status === 'CORRECT') {
          bgClassName = 'bg-teal-400'
          label = 'グリーン'
        }
        return (
          <span
            key={i}
            area-label={`${label} ${l.letter}`}
            className={`${bgClassName} block text-white py-2 border border-white text-center flex-1`}
          >{l.letter}</span>
        )
      })}
    </div>
  )
}
