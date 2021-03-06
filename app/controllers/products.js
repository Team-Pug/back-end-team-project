'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Product = models.product

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const create = (req, res, next) => {
  const product = Object.assign(req.body.product, {
    _owner: req.user._id
  })
  Product.create(product)
    .then(product =>
      res.status(201)
        .json({
          product: product.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const index = (req, res, next) => {
  Product.find()
    .then(products => res.json({
      products: products.map((product) =>
        product.toJSON({ virtuals: true }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    product: req.product.toJSON({ virtuals: true, user: req.user })
  })
}

const update = (req, res, next) => {
  delete req.body._owner
  req.product.update(req.body.product)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  // put the requested product into a variable
  const prod = req.product
  // delete the product
  req.product.remove()
  // return a json response with the product data, just like with show
  res.json({
    product: prod.toJSON({ virtuals: true, user: req.user })
  })
    .then(res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  create,
  index,
  show,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Product), only: ['show', 'update'] },
  { method: setModel(Product, { forUser: true }), only: ['destroy'] }
] })
