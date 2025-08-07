import * as React from 'react'
import Container from './container'

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  created_at: string
  pushed_at: string
  default_branch: string
}

interface RepoWithCommits extends GitHubRepo {
  commit_count: number
}

export interface GitHubActivityResponse {
  repos: RepoWithCommits[]
  commit_counts: Record<string, number>
  last_updated: string
}

function GitHub({activity}: {activity: GitHubActivityResponse}) {
  const [repos] = React.useState<RepoWithCommits[]>(activity?.repos || [])
  const [commitCounts] = React.useState<Record<string, number>>(
    activity?.commit_counts || 0,
  )
  const [loading] = React.useState(false)
  const [error] = React.useState<string | null>(null)

  const randomLargePrefix = (): string => {
    const arr = [
      'Brobdingnagian',
      'Colossal',
      'Enormo',
      'Giant',
      'Gigantic',
      'Hyper',
      'Macro',
      'Mammoth',
      'Max',
      'Mega',
      'Super',
      'Supra',
      'Titan',
      'Ultra',
      'Vast',
    ]
    return arr[Math.floor(Math.random() * arr.length)] ?? 'Seismic'
  }

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      'C#': 'bg-cs',
      'C++': 'bg-cpp',
      C: 'bg-c',
      CSS: 'bg-css',
      Go: 'bg-go',
      HTML: 'bg-html',
      Java: 'bg-java',
      JavaScript: 'bg-javascript',
      Kotlin: 'bg-kotlin',
      PHP: 'bg-php',
      Python: 'bg-python',
      Ruby: 'bg-ruby',
      Rust: 'bg-rust',
      Shell: 'bg-shell',
      Swift: 'bg-swift',
      TypeScript: 'bg-typescript',
    }
    return colors[language ?? ''] ?? 'bg-default'
  }

  const getCommitBasedStyle = (commitCount: number) => {
    if (commitCount >= 50) {
      return {
        border: 'border-gradient-to-r from-purple-500 to-pink-500 border-2',
        shadow: 'shadow-2xl shadow-purple-500/20',
        glow: 'ring-2 ring-purple-500/30',
        badge: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      }
    } else if (commitCount >= 20) {
      return {
        border: 'border-blue-400 border-2',
        shadow: 'shadow-xl shadow-blue-400/20',
        glow: 'ring-2 ring-blue-400/30',
        badge: 'bg-blue-500 text-white',
      }
    } else if (commitCount >= 10) {
      return {
        border: 'border-green-400 border-2',
        shadow: 'shadow-lg shadow-green-400/20',
        glow: 'ring-1 ring-green-400/20',
        badge: 'bg-green-500 text-white',
      }
    } else {
      return {
        border: 'border-gray-300 dark:border-gray-600',
        shadow: 'shadow-md',
        glow: '',
        badge: 'bg-gray-500 text-white',
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="bg-transparent">
        <Container className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Recent GitHub Activity
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Loading latest repositories...
            </p>
            <div className="mt-8 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-transparent">
        <Container className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Recent GitHub Activity
            </h2>
            <p className="mt-4 text-lg text-red-600 dark:text-red-400">
              Error loading repositories: {error}
            </p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="bg-transparent">
      <Container className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Recent GitHub Activity
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            My latest projects and contributions
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {repos.map(repo => {
            const commitCount =
              repo.commit_count ?? commitCounts[repo.name] ?? 0
            const style = getCommitBasedStyle(commitCount)

            return (
              <div
                key={repo.id}
                className={`relative rounded-2xl bg-white p-6 transition-all duration-300 hover:scale-105 dark:bg-neutral-800 ${style.border} ${style.shadow} ${style.glow} `}
              >
                {/* Commit Badge */}
                <div
                  className={`absolute -right-3 -top-3 rounded-full px-3 py-1 text-xs font-bold ${style.badge}`}
                >
                  {commitCount >= 100 ? randomLargePrefix() : commitCount}{' '}
                  commits
                </div>

                {/* Repository Header */}
                <div className="mb-4">
                  <h3 className="truncate text-xl font-semibold text-gray-900 dark:text-white">
                    {repo.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                    {repo.description ?? 'No description available'}
                  </p>
                </div>

                {/* Stats */}
                <div className="mb-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7.707a1 1 0 010-1.414L6.293 2.586a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>

                  {/* Language */}
                  {repo.language && (
                    <div className="flex items-center space-x-2">
                      <div
                        className={`h-3 w-3 rounded-full ${getLanguageColor(repo.language)}`}
                      ></div>
                      <span className="text-xs font-medium">
                        {repo.language}
                      </span>
                    </div>
                  )}
                </div>

                {/* Updated Date */}
                <div className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                  Updated {formatDate(repo.updated_at)}
                </div>

                {/* Action Button */}
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                >
                  View Repository
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )
          })}
        </div>

        {/* View All Repositories Link */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/chrisbradleydev?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-base font-medium text-white transition-all hover:from-blue-600 hover:to-purple-700 hover:shadow-lg"
          >
            View All Repositories
            <svg
              className="ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </Container>
    </div>
  )
}

export default GitHub
