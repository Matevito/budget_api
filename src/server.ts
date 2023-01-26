import app from './app'

const port: number = Number(process.env.PORT)

app.listen(port, () => {
  console.log(`API running on port: ${port} or http://localhost:${port}/`)
})
