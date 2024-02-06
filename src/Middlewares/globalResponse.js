
const globalResponse = (err,req,res,next)=>{
    if(err){
      return res.status(err['cause'] || 500).json({errMsg:err.message})
    }
  
}
export default globalResponse