export const errorsList = {
  ServiceError: {
    code: 'INTERNAL_SERVER_ERROR',
    detail: 'An unexpected error prevented the server from fulfilling the request'
  },
  userNotFound: {
    code: 'User_NOT_FOUND',
    detail: 'User with the specified username not found'
  },
  duplicateID: {
    code: 'ALREADY_EXIST',
    detail: 'User with the specified ID already exist'
  },
  PasswordNotFound: {
    code: 'PASSWORD_NOT_FOUND',
    detail: 'Password not found'
  },
  usernameNotFound: {
    code: 'Username_NOT_FOUND',
    detail: 'Username not found'
  },
  passwordInvalid: {
    code: 'PASSWORD_NOT_VALID',
    detail: 'Password not valid'
  },
  usernameInvalid: {
    code: 'Username_NOT_VALID',
    detail: 'Username not valid'
  }
}
