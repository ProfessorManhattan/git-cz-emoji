export const types = {
  feat: {
    description: 'A new feature',
    title: 'Features',
    emoji: '✨'
  },
  fix: {
    description: 'A bug fix',
    title: 'Bug Fixes',
    emoji: '🐛'
  },
  docs: {
    description: 'Changes that only impact documentation',
    title: 'Documentation',
    emoji: '📝'
  },
  style: {
    description:
      'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)',
    title: 'Styles',
    emoji: '🎨'
  },
  refactor: {
    description: 'A code change that neither fixes a bug nor adds a feature',
    title: 'Code Refactoring',
    emoji: '♻️'
  },
  perf: {
    description: 'A code change that improves performance',
    title: 'Performance Improvements',
    emoji: '⚡️'
  },
  test: {
    description: 'Adding missing tests or correcting existing tests',
    title: 'Tests',
    emoji: '🧪'
  },
  build: {
    description: 'Changes that affect the build system or external dependencies (example scopes: gulp, pnpm)',
    title: 'Builds',
    emoji: '🏗'
  },
  ci: {
    description: 'Changes to CI configuration files and scripts (example scopes: Travis, GitLab)',
    title: 'Continuous Integration',
    emoji: '📦'
  },
  chore: {
    description: 'Other changes that do not modify src or test files',
    title: 'Chores',
    emoji: '🔧'
  },
  revert: {
    description: 'Reverts a previous commit',
    title: 'Reverts',
    emoji: '⏪'
  }
}
