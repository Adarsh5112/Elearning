import express from 'express'
import dotenv from 'dotenv'
import connectdb from './db/connectdb.js'
import userRoutes from './routes/user.js'
import courseRoutes from './routes/courses.js'
import adminRoutes from './routes/admin.js'
import Razorpay from 'razorpay'
import cors from 'cors'

dotenv.config()

export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret,
})

const app = express()
const port = process.env.PORT || 5000 
const DATABASE_URL = process.env.DATABASE_URL ||'mongodb://localhost:27017'

app.use(express.json())
app.use(cors())

connectdb(DATABASE_URL)

app.get('/',(req,res)=>{
    res.send("Server is working")
})

app.use("/uploads",express.static("uploads"))

// using routes 
app.use("/api", userRoutes)
app.use("/api", courseRoutes)
app.use("/api", adminRoutes)


app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
})