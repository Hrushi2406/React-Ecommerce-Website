
const isEmpty = string => string.trim() === ''

module.exports.loginValidator = (data) => {

    let errors = {}
    if (isEmpty(data.email)) {
        errors.email = "Email field must not be empty"
    } if (isEmpty(data.password)) {
        errors.password = "Password field must not be empty"
    }
    return { error: errors, valid: Object.keys(errors).length === 0 ? true : false }
}


module.exports.signUpValidator = (data) => {

    let errors = {}
    if (isEmpty(data.name)) {
        errors.name = "Name field must not be empty"
    } if (isEmpty(data.email)) {
        errors.email = "Email field must not be empty"
    } if (isEmpty(data.password)) {
        errors.password = "Password field must not be empty"
    } if (isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm Password field must not be empty"
    } if (isEmpty(data.dob)) {
        errors.dob = "Date of Birth  must not be empty"
    } if (data.mobile === null) {
        errors.mobile = "Mobile No. field must not be empty"
    }
    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Confirm Password doesn't match with password"
    }
    return { error: errors, valid: Object.keys(errors).length === 0 ? true : false }
}