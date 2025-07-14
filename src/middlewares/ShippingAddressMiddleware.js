import { ShippingAddress } from '../models/models.js'

export const checkShippingAddressOwnership = async (req, res, next) => {
  try {
    const shippingAddres = await ShippingAddress.findByPk(req.params.shippingAddressId)
    if (req.user.id === shippingAddres.userId) {
      return next()
    }
    return res.status(403).send('Not enough privileges. This entity does not belong to you')
  } catch (err) {
    return res.status(500).send(err)
  }
}
