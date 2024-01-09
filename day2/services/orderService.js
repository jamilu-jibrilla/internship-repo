let Order = require('../models/index');
Order = Order.order

exports.getPaginatedOrders = async (page, limit, sort = 'id', direction = 'ASC') => {
    try {
      const offset = (page - 1) * limit;
  
      // Check if 'sort' is a valid field in the 'Order' model
      if (!Object.keys(Order.rawAttributes).includes(sort)) {
        throw new Error(`Invalid sort field: ${sort}`);
      }
  
      const orders = await Order.findAll({
        offset: offset,
        limit: limit,
        order: [[sort, direction]]
      });
  
      const total = await Order.count();
  
      return {
        total,
        page,
        list: orders,
      };
    } catch (err) {
      throw err;
    }
  };
  
