import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'
import crypto from 'crypto'

export default userModel()

function userModel () {
  const Schema = Mongoose.Schema

  const UserSchema = new Schema({

    username: {
      type: String,
      required: true,
      unique: true,
      dropDups: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true

    },
    admin: Boolean,
    creationDate: Date

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
// "security":[{"OAuth2":['read']}]
