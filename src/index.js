import { app } from './app.js'
import connectDB from './utils/db.js'

const port = process.env.PORT || 8080

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server is running on the port${port}`)
  })
}).catch((error) => {
    console.log("something went wrong while connecting to the database: " + error)
})
