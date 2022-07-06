declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string
    GITHUB_ID: string
    GITHUB_SECRET: string
    NEXTAUTH_SECRET: string
    NEXTAUTH_URL: string
  }
}
