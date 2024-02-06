
const reqKeys = ['body','query','params','headers','file','files'];

const vld = (schema)=>{
  return (req,res,next)=>{
    const errArr = []

    for(const key of reqKeys){

      const validationResult = schema[key]?.validate(req[key],{abortEarly:false})

      if(validationResult?.error){
        errArr.push(...validationResult.error.details)
      }

    }
    if(errArr.length){
    return  res.status(404).json({error:errArr.map((err)=> err.message)})
    }

    next()
  }
}
export default vld