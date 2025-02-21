import express, { Request, Response } from 'express'
import path from 'path'

const app: express.Application = express()
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 0

/**
 * Middleware to serve static files from the frontend directory
 * 
 * @param {string} staticPath - Path to the static files directory
 */
app.use(
  express.static(
    path.join(__dirname, '../frontend/public')
  )
)

/**
 * Route to serve the main page
 * 
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
app.get('/', (req: Request, res: Response): void => {
  res.sendFile(
    path.join(__dirname, '../frontend/public/index.html'),
    (err) => {
      if (err) {
        res.status(500).send('Error loading the page')
        console.error('Error serving the page:', err)
      }
    })
})

/**
 * Catch-all route to handle all other requests
 * 
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
app.get('*', (req: Request, res: Response): void => {
  res.sendFile(
    path.join(__dirname, '../frontend/public/index.html')
  )
})

/**
 * Start the server and log the port it is running on
 * 
 * @param {number} port - The port to listen on
 */
const server = app.listen(port, (): void => {
  const actualPort = (server.address() as any).port
  console.log(`Server is running at http://localhost:${actualPort}`)
})
