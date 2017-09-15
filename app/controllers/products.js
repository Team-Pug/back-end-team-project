'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Product = models.product_name

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const create = {

}

const show = (req, res) => {
  res.json({
    product: req.product.toJSON({ virtuals: true, user: req.user })
  })
}

const index = {

}

const update = {

}

const destroy = {

}

module.exports = controller({
  create,
  show,
  index,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Product), only: ['show'] },
  { method: setModel(Product, { forUser: true }), only: ['update', 'destroy'] }
] })
