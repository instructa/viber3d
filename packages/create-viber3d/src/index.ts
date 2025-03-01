import { existsSync } from 'node:fs'
import process from 'node:process'
import { execSync } from 'node:child_process'

import { defineCommand, runMain } from 'citty'
import { consola } from 'consola'
import { colors } from 'consola/utils'
import { resolve, relative } from 'pathe'
import fs from 'fs-extra'
import { fileURLToPath } from 'node:url'
import { dirname } from 'pathe'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const templateDir = resolve(__dirname, '../template')
const viber3dDir = resolve(__dirname, '../../viber3d')

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
  _cursorignore: '.cursorignore',
  _prettierrc: '.prettierrc',
  _prettierignore: '.prettierignore',
  _eslintrc: '.eslintrc.js',
}

// Package manager options
const packageManagerOptions = ['npm', 'yarn', 'pnpm'] as const
type PackageManagerName = typeof packageManagerOptions[number]

const main = defineCommand({
  meta: {
    name: 'create-viber3d',
    description: 'Initialize a fresh Viber3D project',
  },
  args: {
    cwd: {
      type: 'string',
      description: 'The working directory. Defaults to the current directory.',
      default: process.cwd(),
      alias: 'c',
    },
    dir: {
      type: 'positional',
      description: 'Project directory',
      default: '',
    },
    name: {
      type: 'string',
      description: 'Project name',
    },
    force: {
      type: 'boolean',
      alias: 'f',
      description: 'Override existing directory',
    },
    install: {
      type: 'boolean',
      default: true,
      description: 'Skip installing dependencies',
    },
    gitInit: {
      type: 'boolean',
      description: 'Initialize git repository',
    },
    packageManager: {
      type: 'string',
      description: 'Package manager choice (npm, pnpm, yarn)',
    },
    yes: {
      type: 'boolean',
      default: false,
      description: 'Skip confirmation prompt',
      alias: 'y',
    },
    defaults: {
      type: 'boolean',
      default: false,
      description: 'Use default configuration',
      alias: 'd',
    },
    silent: {
      type: 'boolean',
      default: false,
      description: 'Mute output',
      alias: 's',
    },
    help: {
      type: 'boolean',
      description: 'Display help for command',
      alias: 'h',
    },
  },
  async run(ctx) {
    // Handle help option
    if (ctx.args.help) {
      // The citty framework will automatically display help information
      return
    }
    
    // Get the current working directory
    const argsCwd = ctx.args.cwd || '.'
    const cwd = resolve(argsCwd)

    // Configure console output based on silent mode
    if (ctx.args.silent) {
      consola.level = 0 // Mute all output
    }

    try {
      // Get project name from args or prompt
      let projectName = ctx.args.name || ctx.args.dir || ''
      
      // If using defaults, use default project name without prompting
      if (!projectName && ctx.args.defaults) {
        projectName = 'my-viber3d-game'
      } else if (!projectName && !ctx.args.yes) {
        projectName = await consola.prompt('Where would you like to create your Viber3D project?', {
          placeholder: 'my-viber3d-game',
          type: 'text',
          default: 'my-viber3d-game',
        })
      } else if (!projectName) {
        projectName = 'my-viber3d-game'
      }

      if (!projectName) {
        consola.error('Project name is required')
        process.exit(1)
      }

      // Project directory
      const root = resolve(cwd, projectName)
      consola.info(`Creating a new project in ${colors.cyan(relative(cwd, root) || root)}.`)

      // Check if directory exists
      let shouldForce = Boolean(ctx.args.force)
      if (!shouldForce && existsSync(root) && !ctx.args.yes && !ctx.args.defaults) {
        const selectedAction = await consola.prompt(
          `The directory ${colors.cyan(root)} already exists. What would you like to do?`,
          {
            type: 'select',
            options: ['Override its contents', 'Select different directory', 'Abort'],
          },
        )

        switch (selectedAction) {
          case 'Override its contents':
            shouldForce = true
            break
          case 'Select different directory': {
            const newDir = await consola.prompt('Please specify a different directory:', {
              type: 'text',
            })
            if (!newDir) process.exit(1)
            projectName = newDir
            break
          }
          default:
            process.exit(1)
        }
      } else if (!shouldForce && existsSync(root) && (ctx.args.yes || ctx.args.defaults)) {
        // If --yes or --defaults is set and directory exists, force override
        shouldForce = true
      }

      // Create project directory if it doesn't exist
      if (!existsSync(root)) {
        fs.mkdirSync(root, { recursive: true })
      } else if (shouldForce) {
        // Clear directory if force option is enabled
        fs.emptyDirSync(root)
      }

      // Copy viber3d template files
      consola.info('Copying Viber3D template files...')
      
      // Copy the viber3d package files to the new project
      await fs.copy(viber3dDir, root, {
        filter: (src) => {
          // Skip node_modules, .git, and other unnecessary directories
          const excludeDirs = [
            'node_modules',
            '.git',
            'dist',
            'build',
            '.cursor',
            'docs',
            'codefetch'
          ]
          
          for (const dir of excludeDirs) {
            if (src.includes(`/${dir}/`) || src.endsWith(`/${dir}`)) {
              return false
            }
          }
          
          // Skip package manager lock files
          const excludeFiles = [
            'package-lock.json',
            'yarn.lock',
            'pnpm-lock.yaml',
            '.npmrc',
            '.yarnrc',
            '.pnpmrc'
          ]
          
          for (const file of excludeFiles) {
            if (src.endsWith(`/${file}`)) {
              return false
            }
          }
          
          // Skip README.md as we'll create a custom one
          if (src.endsWith('/README.md')) {
            return false
          }
          
          return true
        }
      })

      // Get project details
      let description = `A Viber3D game called ${projectName}`
      let authorName = getGitUser() || 'Viber3D Developer'
      
      if (!ctx.args.defaults && !ctx.args.yes) {
        description = await consola.prompt('Enter project description:', {
          default: description,
          type: 'text',
        }) || description
        
        authorName = await consola.prompt('Enter author name:', {
          default: authorName,
          type: 'text',
        }) || authorName
      }

      // Process template files
      const templateVariables = {
        PROJECT_NAME: projectName,
        DESCRIPTION: description,
        AUTHOR_NAME: authorName,
        CURRENT_YEAR: new Date().getFullYear(),
      }

      // Process template files (like README.md.mustache)
      processTemplateFiles(templateDir, root, templateVariables)

      // Update package.json
      updatePackageJson(root, projectName, description, authorName)

      // Install dependencies
      if (ctx.args.install !== false) {
        // Resolve package manager
        const packageManagerArg = ctx.args.packageManager as PackageManagerName
        
        // Determine which package manager to use
        let selectedPackageManager: PackageManagerName | undefined
        
        if (packageManagerOptions.includes(packageManagerArg as any)) {
          // Use the specified package manager if valid
          selectedPackageManager = packageManagerArg
        } else if (ctx.args.defaults) {
          // Default to npm when using --defaults
          selectedPackageManager = 'npm' as const
        } else if (ctx.args.yes) {
          // Default to npm when using --yes
          selectedPackageManager = 'npm' as const
        } else {
          // Otherwise prompt the user
          const pmChoice = await consola.prompt('Which package manager would you like to use?', {
            type: 'select',
            options: [...packageManagerOptions] as string[],
          })
          
          if (pmChoice && packageManagerOptions.includes(pmChoice as any)) {
            selectedPackageManager = pmChoice as PackageManagerName
          } else {
            selectedPackageManager = 'npm' as const
          }
        }

        if (selectedPackageManager) {
          consola.info(`Installing dependencies with ${selectedPackageManager}...`)
          try {
            let command = ''
            switch (selectedPackageManager) {
              case 'npm':
                command = 'npm install'
                break
              case 'yarn':
                command = 'yarn'
                break
              case 'pnpm':
                command = 'pnpm install'
                break
            }
            execSync(command, { cwd: root, stdio: 'inherit' })
            consola.success('Dependencies installed successfully!')
          } catch (error) {
            consola.error('Failed to install dependencies:', error)
          }
        }
      } else {
        consola.info('Skipping install dependencies step.')
      }

      // Initialize git repository
      let shouldInitGit = ctx.args.gitInit
      
      if (shouldInitGit === undefined) {
        if (ctx.args.defaults) {
          shouldInitGit = true // Default to true when using --defaults
        } else if (ctx.args.yes) {
          shouldInitGit = true // Default to true when using --yes
        } else {
          shouldInitGit = await consola.prompt('Initialize git repository?', {
            type: 'confirm',
          })
        }
      }
      
      if (shouldInitGit) {
        consola.info('Initializing git repository...')
        try {
          execSync('git init', { cwd: root, stdio: 'inherit' })
        } catch (err) {
          consola.warn(`Failed to initialize git repository: ${err}`)
        }
      }

      // Display next steps
      const relativeRoot = relative(process.cwd(), root) || '.'
      consola.box(`
Viber3D project created successfully! 🎉

Project: ${projectName}
Location: ${root}

Next steps:
${relativeRoot !== '.' ? `1. cd ${relativeRoot}` : ''}
${relativeRoot !== '.' ? '2' : '1'}. npm run dev (or yarn dev, pnpm dev)
${relativeRoot !== '.' ? '3' : '2'}. Open your browser at http://localhost:5173

Happy game development! 🚀
      `)
    } catch (error) {
      consola.error(error)
      process.exit(1)
    }
  },
})

function getGitUser() {
  try {
    const name = execSync('git config user.name').toString().trim()
    return name
  } catch (e) {
    return ''
  }
}

function processTemplateFiles(
  templateDir: string,
  targetDir: string,
  variables: Record<string, any>
) {
  const files = fs.readdirSync(templateDir, { withFileTypes: true })
  
  for (const file of files) {
    const srcPath = resolve(templateDir, file.name)
    const destPath = resolve(targetDir, renameFiles[file.name] || file.name)
    
    if (file.isDirectory()) {
      fs.ensureDirSync(destPath)
      processTemplateFiles(srcPath, destPath, variables)
    } else if (file.name.endsWith('.mustache')) {
      const content = fs.readFileSync(srcPath, 'utf-8')
      const rendered = renderTemplate(content, variables)
      fs.writeFileSync(destPath.replace(/\.mustache$/g, ''), rendered)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function renderTemplate(template: string, variables: Record<string, any>): string {
  return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, key) => {
    return variables[key.trim()] || ''
  })
}

function updatePackageJson(
  root: string,
  projectName: string,
  description: string,
  authorName: string
) {
  const packageJsonPath = resolve(root, 'package.json')
  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    
    // Update package.json with new project details
    packageJson.name = projectName
    packageJson.description = description
    packageJson.author = authorName
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  }
}

runMain(main)