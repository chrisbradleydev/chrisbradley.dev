// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => any>(fn: T, ms = 100) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

export default debounce
