function debounce(func, wait = 100) {
  let timeoutId
  return function (event) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(func, wait, event)
  }
}

export default debounce
