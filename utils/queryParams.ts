const buildQueryParams = (params: Record<string, string>): string => {
  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&')
  return queryString ? `?${queryString}` : ''
}

export default buildQueryParams
