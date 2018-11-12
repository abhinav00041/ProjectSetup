import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'
import crypto from 'crypto'

export default authModel()

function authModel () {
  const Schema = Mongoose.Schema

  const AuthSchema = new Schema({

    local: {
      email: String,
      password: String
    },
    facebook: {
      id: String,
      token: String,
      name: String,
      email: String
    },
    twitter: {
      id: String,
      token: String,
      displayName: String,
      username: String
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String
    }

  })

  UserSchema.statics.matchPassword = (password, userPassword) => {
    const decipher = crypto.createDecipher('aes192', 'password')
    let decrypted = decipher.update(password, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    if (userPassword === decrypted) {
      return true
    } else {
      return false
    }
  }
  return { createNew: async function createNew (user) {
    console.log(user)
    // await validateSchema(objTypes.REQOBJ, pricingPlan) // Let's validate the incoming request for the supported standard
    // add other custom methods for formatting/validation to the schema object like PricingPlanSchema.methods.someMethod = function() {}
    UserSchema.pre('save', function (next) {
      const cipher = crypto.createCipher('aes192', 'password')

      let encrypted = cipher.update(this.password, 'utf8', 'hex')
      encrypted += cipher.final('hex')
      this.password = encrypted
      this.creationDate = new Date()
      next()
    })

    UserSchema.set('toJSON', {
      transform: function (doc, ret, options) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      }
    })
    const UserModel = Mongoose.model('userModel', UserSchema)
    return await datastore.addToStore(new UserModel(user))
  },
  getAll: async function getAll () {
    const userModel = Mongoose.model('userModel', UserSchema, 'usermodels')
    return await datastore.findAll(userModel)
  },
  getuser: async function getByname (username) {
    const userModel = Mongoose.model('userModel', UserSchema)
    return await datastore.findOne(userModel, username)
  }
  }
}
