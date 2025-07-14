import { ShippingAddress } from '../models/models.js'
import { } from 'sequelize'

const ShippingAddressController = {
  async index (req, res) {
    try {
      const shippingAddres = await ShippingAddress.findAll({
        where: {
          userId: req.user.id
        }
      }
      )
      res.json(shippingAddres)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async create (req, res) {
    try {
      const oneShippingAddress = await ShippingAddress.count({ where: { userId: req.user.id } })

      if (oneShippingAddress === 0) {
        const newShippingAddress = await ShippingAddress.create({
          alias: req.body.alias,
          street: req.body.street,
          city: req.body.city,
          zipCode: req.body.zipCode,
          province: req.body.province,
          isDefault: true,
          userId: req.user.id
        })
        res.json(newShippingAddress)
      } else {
        const newShippingAddress = await ShippingAddress.create({
          alias: req.body.alias,
          street: req.body.street,
          city: req.body.city,
          zipCode: req.body.zipCode,
          province: req.body.province,
          isDefault: req.body.isDefault,
          userId: req.user.id
        })
        res.json(newShippingAddress)
      }
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async update (req, res) {
    res.status(500).send('Not implemented')
  },

  async destroy (req, res) {
    try {
      const result = await ShippingAddress.destroy({ where: { id: req.params.shippingAddressId } })
      let message = ''
      if (result === 1) {
        message = 'Sucessfuly deleted shippingAddress id.' + req.params.shippingAddressId
      } else {
        message = 'Could not delete shippingAddress.'
      }
      res.json(message)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async markDefault (req, res) {
    try {
      const shippingAddres = await ShippingAddress.findByPk(req.params.shippingAddressId)
      if (!shippingAddres.isDefault) {
        const allShippingAddresTrue = await ShippingAddress.findAll({ where: { isDefault: true } })
        for (const address of allShippingAddresTrue) {
          await ShippingAddress.update({ isDefault: false }, { where: { id: address.id } })
        }

        await ShippingAddress.update({ isDefault: true }, { where: { id: shippingAddres.id } })
        const updatedShippingAddres = await ShippingAddress.findByPk(req.params.shippingAddressId)
        res.json(updatedShippingAddres)
      } else {
        shippingAddres.isDefault = true
        const updatedShippingAddress = await shippingAddres.save()
        res.json(updatedShippingAddress)
      }
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

export default ShippingAddressController
