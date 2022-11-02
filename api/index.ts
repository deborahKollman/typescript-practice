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
// sequelize
//  .sync({force: false, logging: false})
//  .then(() => {
//   console.log('base de datos conectada! :D');
//   app.listen(3001, function () {
//    console.log('App is listening on port 3001!');
//   });
//  })
//  .catch((err) => console.error(err));