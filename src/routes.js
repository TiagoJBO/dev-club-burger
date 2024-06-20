import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'

import SessionController from './app/controllers/SessionController'
import productController from './app/controllers/productController'
import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderController'

import authMiddleware from './app/middlewares/auth'

const uploads = multer(multerConfig)

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello to my first API' })
})

routes.post('/users', UserController.store)

routes.post('/Sessions', SessionController.store)

routes.use(authMiddleware) // será chamados por todas as rotas ABAIXO

routes.post('/Products', uploads.single('file'), productController.store)
routes.get('/Products', productController.index)
routes.put('/Products/:id', uploads.single('file'), productController.update)

routes.post('/Categories', uploads.single('file'), CategoryController.store)
routes.get('/Categories', CategoryController.index)
routes.put('/Categories/:id', uploads.single('file'), CategoryController.update)

routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.get('/orders', OrderController.index)

export default routes
