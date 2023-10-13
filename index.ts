import { program } from 'commander'
import { resolve } from 'node:path'
import { readFile, mkdir } from 'node:fs/promises'
import { homedir } from 'node:os'
import simpleGit from 'simple-git'
import inquirer from 'inquirer'
import type { ChoiceOptions } from 'inquirer'

const CONFIG_DIR = resolve(homedir(), `.config/git-switcher`)

type Config = {
  profiles: {
    email: string
    name: string
    profileName: string
  }[]
}

async function readConfig() {
  const defaultConfig: Config = {
    profiles: [],
  }

  try {
    const config = await readFile(resolve(CONFIG_DIR, 'config.json'))
    const parsed: Config = JSON.parse(config.toString())
    return {
      ...defaultConfig,
      ...(parsed ?? {}),
    }
  } catch (error) {
    return defaultConfig
  }
}

program.command('use').action(async () => {
  const config = await readConfig()

  if (config.profiles.length === 0) {
    console.log(
      'There are no profiles to use, add one with  `git-switcher add`',
    )
    return
  }

  const {
    profileNameToUse,
  }: {
    profileNameToUse: string
  } = await inquirer.prompt([
    {
      type: 'list',
      choices: config.profiles.map((profile): ChoiceOptions => {
        return {
          name: profile.profileName,
          value: profile.profileName,
        }
      }),
      loop: true,
      message: 'Profile to use',
      name: 'profileNameToUse',
    },
  ])

  const profile = config.profiles.find(
    (profile) => profile.profileName === profileNameToUse,
  )

  if (!profile) {
    console.log('Profile not found')
    return
  }

  await simpleGit()
    .addConfig('user.email', profile.email)
    .addConfig('user.name', profile.name)

  console.log('✅ Profile changed')
})

program.command('add').action(async () => {
  await mkdir(CONFIG_DIR, { recursive: true })

  const {
    profileName,
    email,
    name,
  }: {
    profileName: string
    email: string
    name: string
  } = await inquirer.prompt([
    {
      type: 'input',
      name: 'profileName',
      message: 'Profile name (unique identifier)',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Profile email',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Profile username',
    },
  ])

  const config = await readConfig()

  const exists = config.profiles.find(
    (profile) => profile.profileName === profileName,
  )

  if (exists) {
    console.log('Profile already exists')
    return
  }

  await Bun.write(
    resolve(CONFIG_DIR, 'config.json'),
    JSON.stringify(
      {
        ...config,
        profiles: [
          ...config.profiles,
          {
            profileName,
            email,
            name,
          },
        ],
      } satisfies Config,
      null,
      2,
    ),
  )
})

program.parse()
