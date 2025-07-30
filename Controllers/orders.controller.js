import Order from '../Models/orders.model.js'

const addOrder = async (req, res) => {
  try {
    const { status, user_id } = req.body;

    if (!status || !user_id) {
      return res.status(400).json({ message: 'Status and user_id are required' });
    }

    const order = await Order.create({
      status,
      user_id,
      total_amount: 0
    });

    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user_id", "name email");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get orders for a user
const getUserOrders = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const orders = await Order.find({ user_id }).populate(
      "user_id",
      "name email"
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user_id.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this order" });
    }

    await order.deleteOne();
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  addOrder,
  getAllOrders,
  getUserOrders,
  deleteOrder
};
