const{check}=require('express-validator')
const repo=require('./repository')
module.exports={
    validateDOB:check('dob')
 .trim()
 .isDate()
 .withMessage('Must Be a valid date')
}