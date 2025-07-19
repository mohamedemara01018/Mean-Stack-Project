import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRoutes from './Routes/user.routes.js'
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/E-Commerce')
    .then(() => { console.log('connection with database happen with successfully') })
    .catch((rej) => { console.log(`there are error ${rej}`) })



dotenv.config();
app.use(express.json());
app.use('/users', userRoutes)




app.listen(process.env.PORT, () => {
    console.log(`successfuly ${process.env.PORT}`)
})