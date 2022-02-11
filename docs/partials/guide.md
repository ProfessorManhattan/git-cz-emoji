## Preview

After you set this configuration up, when you do `git commit` you will be prompted with a menu like the one below. It will prompt you for the type of commit, ask for a subject, and a few other options. The whole process guides your commits and your repository's users commits to come out consistently in such a way that you can generate automated CHANGELOG.md files. **[semantic-release-config](https://github.com/ProfessorManhattan/semantic-release-config)** and **[conventional-changelog-emoji-config](https://github.com/ProfessorManhattan/conventional-changelog-emoji-config)** rely on this Commitizen configuration to generate commit messages that are in a consistent format.

```shell
 Select the type of change that you're committing: (Use arrow keys)
❯ ✨  Feat:              Introducing new features.
  🐛  Bug:               Fixing a bug.
  📝  Docs:              Writing docs.
  🎨  Style:             Improving structure / format of the code.
  💄  UI:                Updating the UI and style files.
  🚑  Quickfix:          Critical hotfix.
  ⚡️  Pref:              Improving performance.
(Move up and down to reveal more choices)
```

## Installation

First, ensure **[Commitizen](https://github.com/commitizen/cz-cli)** (a.k.a. `git-cz`) is installed. Then, add this package to your system either globally or locally.

### Globally

You can install this library globally and have it run on all projects using the following method. First, install the package globally:

```shell
npm install --global cz-conventional-emoji
```

After that, configure Commitizen to use the library by default:

```shell
echo '{ "path": "cz-conventional-emoji" }' > ~/.czrc
```

### Locally

To install the library locally (so that the configuration is portable with your repository), add it to your `devDependencies` by running:

```shell
npm i -D cz-conventional-emoji
```

With the library installed locally, you next have to configure `package.json` to point to the configuration by adding a section that should look something like this:

```json
{
  "name": "my_node_module_name",
  ...
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-emoji"
    },
  },
  ...
}
```

## Usage

Simply use `git cz` instead of `git commit` when committing. See the documentation of [Commitizen](https://github.com/commitizen/cz-cli) for more information.
