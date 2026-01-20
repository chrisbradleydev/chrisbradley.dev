const romanNumerals: [string[], string[]] = [
  ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
  ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
]

export const intToRoman = (num: number): string => {
  const tensDigits = romanNumerals[1]
  const onesDigits = romanNumerals[0]
  if (!tensDigits || !onesDigits) return ''
  const tens = Math.floor(num / 10)
  const ones = num % 10
  return (
    (tens < tensDigits.length ? tensDigits[tens]! : '') +
    (ones < onesDigits.length ? onesDigits[ones]! : '')
  )
}

export const slugToRomanNumeral = (slug: string): string => {
  const match = /-(\d+)$/.exec(slug)
  const num = match?.[1]
  return num && parseInt(num) > 1 ? ` ${intToRoman(parseInt(num))}` : ''
}
