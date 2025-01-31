import express from 'express'
import path from 'path'
const app = express()
const port = 3000
app.use(express.static(path.join(__dirname, '../frontend/public')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'), (err) => {
    if (err) {
      res.status(500).send('Error loading the page')
      console.error('Error serving the page:', err)
    }
  })
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'))
})
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
