import { Order } from "../Models/orders.model.js";

// Add a new order
export const addOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const user_id = req.user.userId;

    const order = new Order({ status, user_id, total_amount: 0 });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user_id", "name email");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get orders for a user
export const getUserOrders = async (req, res) => {
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
export const deleteOrder = async (req, res) => {
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
