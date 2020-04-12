
const isEmpty = string => string.trim() === ''

module.exports.validator = (data) => {

    let errors = {}
    if (isEmpty(data.email)) {
        errors.email = "Email field must not be empty"
    } if (isEmpty(data.password)) {
        errors.password = "Password field must not be empty"
    }
    return { error: errors, valid: Object.keys(errors).length === 0 ? true : false }
}