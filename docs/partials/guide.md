## Preview

After you set this configuration up, when you do `git commit` you will be prompted with an interactive menu. It will prompt you for the type of commit, ask for a subject, and a few other options. The whole process guides your commits and your repository's users commits to come out consistently in such a way that you can generate automated CHANGELOG.md files. **[semantic-release-config](https://github.com/ProfessorManhattan/semantic-release-config)** and **[conventional-changelog-emoji-config](https://github.com/ProfessorManhattan/conventional-changelog-emoji-config)** rely on this Commitizen configuration to generate commit messages that are in a consistent format.

Some of your commit message titles may look something like:

```md
- ✨ feat: add signup pages from (#11)
- 🐛 fix(test): get browser width for android devices
- ♻️ refactor(sc): refactor to styled component
- 🧪 test: add test for splitmerge
```

## Format

Format of the commit is below:

```text
[emoji] [type]([scope]): [commit msg] (#[issue number])
```

_Note:_ `scope` & `issue number` are optional.

## Installation

First, ensure **[Commitizen](https://github.com/commitizen/cz-cli)** (a.k.a. `git-cz`) is installed. Then, add this package to your system either globally or locally.

### Installing Globally

You can install this library globally and have it run on all projects using the following method. First, install the package globally:

```shell
npm install --global cz-conventional-emoji
```

After that, configure Commitizen to use the library by default:

```shell
echo '{ "path": "cz-conventional-emoji" }' > ~/.czrc
```

### Installing Locally

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
