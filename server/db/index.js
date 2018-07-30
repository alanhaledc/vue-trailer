const mongoose = require('mongoose')
const User = require('./models/user')
const {md5Pwd} = require('../utils')

const DB_URL = 'mongodb://127.0.0.1:27017/trailer'

mongoose.connect(DB_URL)

const connection = mongoose.connection

connection.on('connected', () => {
  console.log('MongoDb server connected successfully!')
})

connection.on('error', () => {
  console.log('MongoDB server connected failed.')
})

connection.on('disconnected', () => {
  console.log('MongoDB server is disconnected.')
})

const initAdmin = async () => {
  let user = await User.findOne({
    username: 'Hale'
  })
  if (!user) {
    const user = new User({
      username: 'Hale',
      email: 'admin@qq.com',
      password: md5Pwd('123456'),
      role: 'admin'
    })

    await user.save()
  }
}

module.exports = {
  connection,
  initAdmin: initAdmin()
}
