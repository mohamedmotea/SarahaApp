import mongoose from "mongoose";

const db_connection =  async()=>{
  await mongoose.connect(process.env.URL_CONNECTION)
  // await mongoose.connect('mongodb+srv://te3a:vipte3a@learnmongodb.reyowfl.mongodb.net/?retryWrites=true&w=majority')
  .then(()=> console.log('DB CONNECTION SUCCESSFULLY'))
  .catch(()=> console.log('DB CONNECTION FAiL'))
}

export default db_connection