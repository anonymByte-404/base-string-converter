import express, { Request, Response } from 'express'
import path from 'path'

const app: express.Application = express()
const port: number = 3000

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(port, (): void => {
  console.log(`Server is running at http://localhost:${port}`)
})
