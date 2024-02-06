import mongoose from "mongoose";

const db_connection =  async()=>{
  await mongoose.connect(process.env.URL_CONNECTION)
  .then(()=> console.log('DB CONNECTION SUCCESSFULLY'))
  .catch(()=> console.log('DB CONNECTION FAiL'))
}

export default db_connection