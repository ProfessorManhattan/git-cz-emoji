import { configLoader } from 'commitizen'
import engine from './engine'
import { types as conventionalCommitTypes, CommitProfile as commitProfile } from './types'

const config = configLoader.load() || {}
const options = {
  defaultBody: process.env.CZ_BODY || config.defaultBody,
  defaultIssues: process.env.CZ_ISSUES || config.defaultIssues,
  defaultScope: process.env.CZ_SCOPE || config.defaultScope,
  defaultSubject: process.env.CZ_SUBJECT || config.defaultSubject,
  defaultType: process.env.CZ_TYPE || config.defaultType,
  disableScopeLowerCase: process.env.DISABLE_SCOPE_LOWERCASE || config.disableScopeLowerCase,
  maxHeaderWidth:
    (process.env.CZ_MAX_HEADER_WIDTH && Number.parseInt(process.env.CZ_MAX_HEADER_WIDTH)) ||
    config.maxHeaderWidth ||
    100,
  maxLineWidth:
    (process.env.CZ_MAX_LINE_WIDTH && Number.parseInt(process.env.CZ_MAX_LINE_WIDTH)) || config.maxLineWidth || 100,
  types: conventionalCommitTypes
}

;(function (options) {
  try {
    const commitlintLoad = require('@commitlint/load')
    commitlintLoad().then(function (clConfig: any) {
      if (clConfig.rules) {
        const maxHeaderLengthRule = clConfig.rules['header-max-length']
        if (
          typeof maxHeaderLengthRule === 'object' &&
          maxHeaderLengthRule.length >= 3 &&
          !process.env.CZ_MAX_HEADER_WIDTH &&
          !config.maxHeaderWidth
        ) {
          options.maxHeaderWidth = maxHeaderLengthRule[2]
        }
      }
    })
  } catch {}
})(options)

export const CommitProfile = commitProfile

module.exports = engine(options)
