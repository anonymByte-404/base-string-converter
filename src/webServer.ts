import express from 'express'
import path from 'path'

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../public')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})
app.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/history.html'))
})
app.get('/convert', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/convert.html'))
})
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
