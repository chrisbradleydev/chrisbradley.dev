import {createContext, useContext, useState} from 'react'

const ThemeContext = createContext(undefined)
ThemeContext.displayName = 'ThemeContext'

const Theme = {
  DARK: 'dark',
  LIGHT: 'light',
}

const themes = Object.values(Theme)

function getPreferredTheme() {
  return 'dark'
}

function ThemeProvider({children, specifiedTheme}) {
  const [theme, setTheme] = useState(() => {
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) {
        return specifiedTheme
      }
      return null
    }
    if (typeof window !== 'object') {
      return null
    }
    return getPreferredTheme()
  })
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export {Theme, ThemeProvider, useTheme}
