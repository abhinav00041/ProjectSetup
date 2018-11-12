import users from '../../lib/models/users'
import userSerializer from '../../lib/serializers/userSerializer'
import { errorsList } from '../../lib/errors/errorsList'

export async function createUser (req, res) {
  const reqbody = req.swagger.params.user.value
  try {
    const deserializeData = await userSerializer.deserialize(reqbody)
    console.log(deserializeData)
    const userResponse = await users.createNew(deserializeData[0])
    const serializedUserResponse = await userSerializer.serialize(userResponse)
    res.status(201).send(serializedUserResponse)
  } catch (err) {
    console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      // TODO: do something better here
      // console.log(err)
      res.status(409).json(errorsList.duplicateID)
    } else {
      res.status(500).json(errorsList.ServiceError)
    }
  }
}

export async function getAll (req, res) {
  try {
    const userResponse = await users.getAll()
    const serializedUserResponse = await userSerializer.serialize(userResponse)
    res.status(200).json(serializedUserResponse)
  } catch (err) {
    // TODO: do something better here
    // console.log(err)
    res.status(500).json(errorsList.ServiceError)
  }
}

export async function getUser (req, res) {
  try {
    const request = req.swagger.params.user.value
    if (!request.username) { throw String('blank username') }
    if (!request.password) { throw String('blank password') }
    const userResponse = await users.getuser(request)
    res.status(200).json(userResponse)
  } catch (error) {
    console.log(error)
    if (error === 'blank username') {
      res.status(203).json(errorsList.usernameNotFound)
    } else if (error === 'blank password') {
      res.status(203).json(errorsList.PasswordNotFound)
    } else if (error === 'id not found') {
      res.status(204).json(errorsList.usernameNotFound)
    } else if (error === 'Invalid Passwword') {
      res.status(401).json(errorsList.passwordInvalid)
    } else { res.status(500).json(errorsList.ServiceError) }
  }
}
