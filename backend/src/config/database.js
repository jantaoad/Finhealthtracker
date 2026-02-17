import 'dotenv/config'
import { Sequelize } from 'sequelize'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../finhealthtracker.db'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false
})

export default sequelize
