let Order = require('../models/index');
Order = Order.order
const { Op} = require('sequelize');


exports.getOrdersWithCursor = async (id, limit) => {
  try {

    // Check if 'id' and 'limit' are provided
    if (!id || !limit) {
      throw new Error( `id and limit parameters are required`)
    }

    // Find the order by id
    const order = await Order.findByPk(id);

    // If no order is found, send an appropriate response
    if (!order) {
      throw new Error(`error: No order found with id ${id}`);
    }

    const orders = await Order.findAll({
      where: {
        id: {
          [Op.gt]: id   // Using Sequelize's Op.gt to get orders with id greater than the passed id
        }
      },
      limit: limit,
      order: [['id', 'ASC']]  // Sorting by 'id' in ascending order
    });

    // If no orders are found, send an appropriate response
    if (orders.length === 0) {
      throw new Error( `No orders found with id greater than ${id}`);
    }

    return {
      id: id,
      list: orders,
    }

  } catch (err) {
    throw new Error(err.message );
  }
};

