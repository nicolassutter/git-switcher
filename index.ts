import { program } from 'commander'
import { resolve } from 'node:path'
import { readFile, mkdir } from 'node:fs/promises'
import { homedir } from 'node:os'

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
    profiles: []
  }

  try {
    const config = await readFile(resolve(CONFIG_DIR, 'config.json'))
    const parsed: Config = JSON.parse(config.toString())
    return {
      ...defaultConfig,
      ...(parsed ?? {})
    }
  } catch (error) {
    return defaultConfig
  }
}

program
  .command('use')
  .argument('<string>', 'profile name')
  .action(async (profileName) => {
    const config = await readConfig()
    const profile = config.profiles.find(profile => profile.profileName === profileName)
    
    if (!profile) {
      console.log('Profile not found')
      return
    }

    const nameProc = Bun.spawn(['git', 'config', 'user.name', `${profile.name}`], {
      cwd: process.cwd(),
    })

    const emailProc = Bun.spawn(['git', 'config', 'user.email', `${profile.email}`], {
      cwd: process.cwd(),
    })

    await Promise.all([nameProc.exited, emailProc.exited])
    console.log('✅ Profile changed')
  })

program
  .command('add')
  .requiredOption('--profile-name <string>', 'profile name')
  .requiredOption('--email <string>', 'profile email')
  .requiredOption('--name <string>', 'profile user email')
  .action(async (options) => {
    await mkdir(CONFIG_DIR, { recursive: true })

    const config = await readConfig()
    
    const exists = config.profiles.find(profile => profile.profileName === options.profileName)

    if (exists) {
      console.log('Profile already exists')
      return
    }

    await Bun.write(
      resolve(CONFIG_DIR, 'config.json'), 
      JSON.stringify({
        ...config,
        profiles: [...config.profiles, options]
      } satisfies Config, null, 2)
    )
  })

program.parse()
