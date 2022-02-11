export const types = {
  build: {
    description: 'Changes that affect the build system or external dependencies (example scopes: gulp, pnpm)',
    emoji: '🏗 ',
    title: 'Builds'
  },
  chore: {
    description: 'Other changes that do not modify src or test files',
    emoji: '🔧',
    title: 'Chores'
  },
  ci: {
    description: 'Changes to CI configuration files and scripts (example scopes: Travis, GitLab)',
    emoji: '📦',
    title: 'Continuous Integration'
  },
  docs: {
    description: 'Changes that only impact documentation',
    emoji: '📝',
    title: 'Documentation'
  },
  feat: {
    description: 'A new feature',
    emoji: '✨',
    title: 'Features'
  },
  fix: {
    description: 'A bug fix',
    emoji: '🐛',
    title: 'Bug Fixes'
  },
  perf: {
    description: 'A code change that improves performance',
    emoji: '⚡️',
    title: 'Performance Improvements'
  },
  refactor: {
    description: 'A code change that neither fixes a bug nor adds a feature',
    emoji: '♻️ ',
    title: 'Code Refactoring'
  },
  revert: {
    description: 'Reverts a previous commit',
    emoji: '⏪',
    title: 'Reverts'
  },
  style: {
    description:
      'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)',
    emoji: '🎨',
    title: 'Styles'
  },
  test: {
    description: 'Adding missing tests or correcting existing tests',
    emoji: '🧪',
    title: 'Tests'
  }
}
