import eslint from '@eslint/js'
import nextConfig from 'eslint-config-next'
import prettierConfig from 'eslint-config-prettier'
// @ts-expect-error - no type definitions available
import drizzlePlugin from 'eslint-plugin-drizzle'
import {dirname} from 'path'
import tseslint from 'typescript-eslint'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config = [
  {
    ignores: ['.next/', 'node_modules/'],
  },
  eslint.configs.recommended,
  ...nextConfig,
  ...tseslint.configs.recommendedTypeChecked.map(config => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
  })),
  ...tseslint.configs.stylisticTypeChecked.map(config => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
  })),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      drizzle: drizzlePlugin,
    },
    rules: {
      'drizzle/enforce-delete-with-where': 'error',
      'drizzle/enforce-update-with-where': 'error',
    },
  },
  prettierConfig,
]

export default config
