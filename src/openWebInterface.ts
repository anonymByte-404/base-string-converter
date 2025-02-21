import chalk from 'chalk'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import { main } from './main.js'
import { typewriterEffect } from './utils/textAnimation.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const openWebInterface = async (): Promise<void> => {
  try {
    console.log(chalk.blueBright('Opening the web interface...'))

    const scriptPath = getScriptPath()

    const reactProcess = spawnReactApp(scriptPath)

    handleReactAppErrors(reactProcess)

    const port = process.env.PORT || 3000
    const webLink = `http://localhost:${port}`
    const isServerUp = await checkServer(webLink)

    if (isServerUp) {
      console.log(chalk.green(`Web interface is ready at ${webLink}`))
    } else {
      console.error(chalk.red(`Failed to connect to the web interface at ${webLink}`))
      return
    }

    console.log(chalk.yellow('Tip: Copy and paste the link into your browser.'))
    await typewriterEffect('Returning to main menu...', 50)
    await main()

  } catch (error: unknown) {
    handleError(error, 'Error opening the web interface')
  }
}

/**
 * Retrieves the appropriate script based on the platform.
 * 
 * @returns {string} - The path to the script based on platform.
 */
const getScriptPath = (): string => {
  const isWindows = process.platform === 'win32'
  const script = isWindows ? './startFrontend.bat' : './startFrontend.sh'
  return path.resolve(__dirname, script)
}

/**
 * Starts the React app by spawning the appropriate process.
 * 
 * @param {string} scriptPath - The path to the script that will start the frontend.
 * @returns {ChildProcess} - The spawned process to run the React app.
 */
const spawnReactApp = (scriptPath: string) => {
  return spawn(scriptPath, {
    cwd: path.resolve(__dirname, '../frontend'),
    stdio: 'inherit',
    shell: true,
    detached: true,
  })
}

/**
 * Handles any errors or exit codes from the React app process.
 * 
 * @param {ChildProcess} reactProcess - The React app process to monitor.
 */
const handleReactAppErrors = (reactProcess: any): void => {
  reactProcess.unref()

  reactProcess.on('error', (err: Error) => {
    console.error(chalk.red(`Failed to start the React app: ${err.message}`))
  })

  reactProcess.on('exit', (code: number) => {
    if (code !== 0) {
      console.error(chalk.red(`React app exited with code: ${code}`))
    }
  })
}

/**
 * Function to check if the server is available.
 * 
 * @param {string} url - The URL to check if the server is up.
 * @param {number} retries - The number of retries to attempt (default is 5).
 * @param {number} delay - The delay between retries in milliseconds (default is 1000ms).
 * 
 * @returns {Promise<boolean>} - Returns true if the server is up, false if the retries fail.
 */
const checkServer = async (
  url: string,
  retries: number = 5,
  delay: number = 1000
): Promise<boolean> => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch (err) {
      console.log(chalk.yellow(`Attempt ${i + 1} failed, retrying...`))
    }
    await new Promise(resolve => setTimeout(resolve, delay))
  }
  return false
}

/**
 * Error handler to log errors with context.
 * 
 * @param {unknown} error - The error that occurred.
 * @param {string} context - The context in which the error occurred.
 */
const handleError = (error: unknown, context: string): void => {
  const errorMessage = error instanceof Error ? error.message : String(error)
  console.error(chalk.red(`${context}: ${errorMessage}`))
}
