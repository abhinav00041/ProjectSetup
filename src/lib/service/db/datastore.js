import Mongoose from 'mongoose'
import config from 'config'
import bluebird from 'bluebird'

export default datastore()

function datastore () {
  const mongoDBHost = config.get('MONGODB_HOST')
  const mongoDBPort = config.get('MONGODB_PORT')
  Mongoose.connect(`mongodb://${mongoDBHost}:${mongoDBPort}/flexin`, { useMongoClient: true })
  Mongoose.Promise = bluebird
  Mongoose.set('debug', true)
  return {
    addToStore: async function addToStore (obj) {
      console.log('Object to save   ' + JSON.stringify(obj))
      return new Promise((resolve, reject) => {
        obj.save(function (err, doc) {
          if (err) {
            reject(err)
          } else {
            resolve(doc)
          }
        })
      })
    },
    findAll: async function findAll (model) {
      return new Promise((resolve, reject) => {
        model.find({}, (err, doc) => {
          if (err) {
            reject(err)
          } else {
            resolve(doc)
          }
        })
      })
    },
    findOne: async function findOne (model, user) {
      return new Promise((resolve, reject) => {
        console.log(model)
        model.findOne({ username: user.username }, (err, doc) => {
          if (err) {
            reject(err)
          } else {
            // (doc) ? resolve(doc) : reject('username with id: ' + user.username + ' not found!')
            if (doc) {
              if (model.matchPassword(doc.password, user.password)) {
                resolve(doc)
              } else {
                reject(String('Invalid Passwword'))
              }
            } else {
              reject(String('id not found'))
            }
          }
        })
      })
    }
  }
}
