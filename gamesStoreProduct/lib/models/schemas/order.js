const moment = require("moment");

orderSchema = order => {
    return {
        userId: order.userId,
        cart: order.cart,
        totalPrice: order.totalPrice,
        date: moment().format()
    };
};

module.exports = { orderSchema };
