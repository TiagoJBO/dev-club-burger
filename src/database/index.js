import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import Product from '../app/models/Product'
import User from '../app/models/User'


import configDatabase from '../config/database'
import Category from '../app/models/Category'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize('postgresql://postgres:KfEAgbFHTEsOEKNjFqCpPWcliZCYsmKm@monorail.proxy.rlwy.net:48028/railway')
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }
  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:yiCjNVALWXMJgCqSOydTAymfIxQnNGom@roundhouse.proxy.rlwy.net:45470',
     
      
    )
  }
}

export default new Database()
