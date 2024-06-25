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
  return res.status(200).json({ message: 'Hello to my first API' })
})

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware) // será chamados por todas as rotas ABAIXO

routes.post('/products', uploads.single('file'), productController.store)
routes.get('/products', productController.index)
routes.put('/products/:id', uploads.single('file'), productController.update)

routes.post('/categories', uploads.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', uploads.single('file'), CategoryController.update)

routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.get('/orders', OrderController.index)

export default routes
