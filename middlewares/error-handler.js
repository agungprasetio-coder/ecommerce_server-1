module.exports = function (err, req, res, next){
    let status = err.status || 500
    let msg = err.msg || 'Internal Server Error'
    if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
        msg = err.errors.map(error=>{
            return error.message
        }).join(', ')
        status = 400
    }
    res.status(status).json({msg})
}