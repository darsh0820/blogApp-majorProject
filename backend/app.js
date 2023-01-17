import express from 'express';
import mongoose from 'mongoose'
import blogRouter from './routes/blog-routes';
import router from './routes/user-routes';
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/user",router)
app.use("/api/blog",blogRouter)
mongoose.connect('mongodb+srv://admin:9i3GGbKPFZXgLuAA@cluster0.90spnyq.mongodb.net/Blog?retryWrites=true&w=majority')
    .then(() => app.listen(5050))
    .then(() => console.log("Connected to the database and listening to localhost 5050"))
    .catch((err) => console.log(err))


// 9i3GGbKPFZXgLuAA