export const HIRAGANA =
  'ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔー'.split(
    ''
  )
export const KATAKANA =
  'ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴー'.split(
    ''
  )

export const convertToKatakana = (word: string) => {
  return word
    .split('')
    .map((l) => {
      if (KATAKANA.includes(l)) return l
      return KATAKANA[HIRAGANA.indexOf(l)] || ''
    })
    .join('')
}
