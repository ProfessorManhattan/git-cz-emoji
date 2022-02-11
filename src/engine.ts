import { green, red } from 'chalk'
import wrap from 'word-wrap'

interface AnswersInterface {
  type: string
  scope: string
}

const headerLength = function (answers: AnswersInterface) {
  return answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0)
}

const maxSummaryLength = function (options: { maxHeaderWidth: number }, answers: AnswersInterface) {
  return options.maxHeaderWidth - headerLength(answers)
}

const filterSubject = (subject: string, disableSubjectLowerCase: boolean) => {
  subject = subject.trim()
  if (!disableSubjectLowerCase) {
    subject = subject.charAt(0).toLowerCase() + subject.slice(1, subject.length)
  }
  while (subject.endsWith('.')) {
    subject = subject.slice(0, subject.length - 1)
  }
  return subject
}

export default (options: any) => {
  return {
    prompter: (cz: { prompt: (e: any) => Promise<{ answers: any }> }, commit: (c: string) => void) => {
      const typeList = Object.keys(options.types)
      const length = typeList.reduce((a, c) => Math.max(a, c.length), 0) + 2
      const choices = typeList.map((t) => ({
        name: options.types[t].emoji + ' ' + (t + ':').padEnd(length) + ' ' + options.types[t].description,
        value: options.types[t].emoji + ' ' + t
      }))

      cz.prompt([
        {
          type: 'list',
          name: 'type',
          message: "Select the type of change that you're committing:",
          choices,
          default: options.defaultType
        },
        {
          type: 'input',
          name: 'scope',
          message: 'What is the scope of this change (e.g. component or file name): (press enter to skip)',
          default: options.defaultScope,
          filter(value: string) {
            return options.disableScopeLowerCase ? value.trim() : value.trim().toLowerCase()
          }
        },
        {
          type: 'input',
          name: 'subject',
          message(answers: AnswersInterface) {
            return (
              'Write a short, imperative tense description of the change (max ' +
              maxSummaryLength(options, answers) +
              ' chars):\n'
            )
          },
          default: options.defaultSubject,
          validate(subject: string, answers: AnswersInterface) {
            const filteredSubject = filterSubject(subject, options.disableSubjectLowerCase)
            return filteredSubject.length === 0
              ? 'subject is required'
              : filteredSubject.length <= maxSummaryLength(options, answers)
              ? true
              : 'Subject length must be less than or equal to ' +
                maxSummaryLength(options, answers) +
                ' characters. Current length is ' +
                filteredSubject.length +
                ' characters.'
          },
          transformer(subject: string, answers: AnswersInterface) {
            const filteredSubject = filterSubject(subject, options.disableSubjectLowerCase)
            const color = filteredSubject.length <= maxSummaryLength(options, answers) ? green : red
            return color('(' + filteredSubject.length + ') ' + subject)
          },
          filter(subject: string) {
            return filterSubject(subject, options.disableSubjectLowerCase)
          }
        },
        {
          type: 'input',
          name: 'body',
          message: 'Provide a longer description of the change: (press enter to skip)\n',
          default: options.defaultBody
        },
        {
          type: 'confirm',
          name: 'isBreaking',
          message: 'Are there any breaking changes?',
          default: false
        },
        {
          type: 'input',
          name: 'breakingBody',
          default: '-',
          message:
            'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself:\n',
          when(answers: any) {
            return answers.isBreaking && !answers.body
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          validate(breakingBody: string, _: any) {
            return breakingBody.trim().length > 0 || 'Body is required for BREAKING CHANGE'
          }
        },
        {
          type: 'input',
          name: 'breaking',
          message: 'Describe the breaking changes:\n',
          when(answers: any) {
            return answers.isBreaking
          }
        },

        {
          type: 'confirm',
          name: 'isIssueAffected',
          message: 'Does this change affect any open issues?',
          default: !!options.defaultIssues
        },
        {
          type: 'input',
          name: 'issuesBody',
          default: '-',
          message:
            'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself:\n',
          when(answers: any) {
            return answers.isIssueAffected && !answers.body && !answers.breakingBody
          }
        },
        {
          type: 'input',
          name: 'issues',
          message: 'Add issue references (e.g. "fix #123", "re #123".):\n',
          when(answers: any) {
            return answers.isIssueAffected
          },
          default: options.defaultIssues ? options.defaultIssues : undefined
        }
      ]).then((answers: any) => {
        const wrapOptions = {
          trim: true,
          cut: false,
          newline: '\n',
          indent: '',
          width: options.maxLineWidth
        }

        // parentheses are only needed when a scope is present
        const scope = answers.scope ? '(' + answers.scope + ')' : ''

        // Add issue to head
        const headIssue = answers.issues ? ` (${answers.issues})` : ''

        // Hard limit this line in the validate
        const head = answers.type + scope + ': ' + answers.subject + headIssue

        // Wrap these lines at options.maxLineWidth characters
        const body = answers.body ? wrap(answers.body, wrapOptions) : false

        // Apply breaking change prefix, removing it if already present
        let breaking = answers.breaking ? answers.breaking.trim() : ''
        breaking = breaking ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '') : ''
        breaking = breaking ? wrap(breaking, wrapOptions) : false

        const issues = answers.issues ? wrap(answers.issues, wrapOptions) : false

        commit([head, body, breaking, issues].filter((e) => e).join('\n\n'))
      })
    }
  }
}
