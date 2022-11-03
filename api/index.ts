// import {sequelize} from './src/db';
import app from './src/app';
import mongoose from 'mongoose';
import config from './lib/config';

mongoose
.connect(`mongodb+srv://deboKollman:${config.mongo_password}@cluster0.o636h0f.mongodb.net/${config.mongo_db}?retryWrites=true&w=majority`)
.then(() =>
  app.listen(config.port, () =>
    console.log(`Server running on http://localhost:${config.port}`)
  )
)
.catch(error => {
  throw error
})