// Commitizen.d.ts
declare module 'commitizen'

declare global {
  namespace NodeJS {
    interface ProcessEnvironment {
      readonly GITHUB_AUTH_TOKEN: string
      readonly NODE_ENV: 'development' | 'production'
      readonly PORT?: string
      readonly PWD: string
    }
  }
}
