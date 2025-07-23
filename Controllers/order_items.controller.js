import { OrderItem } from "../Models/order_items.model.js";

// Add a new order item
export const addOrderItem = async (req, res) => {
  try {
    const { quantity, price, product_id, order_id } = req.body;

    const existingItem = await OrderItem.findOne({ order_id, product_id });
    if (existingItem) {
      return res
        .status(400)
        .json({ message: "This product is already added to the order." });
    }

    const orderItem = new OrderItem({ quantity, price, product_id, order_id });
    await orderItem.save();

    res.status(201).json(orderItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all items for an order
export const getOrderItems = async (req, res) => {
  try {
    const { orderId } = req.params;
    const items = await OrderItem.find({ order_id: orderId })
      .populate("product_id", "title price");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an order item
export const deleteOrderItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await OrderItem.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Order item not found" });
    }

    await item.deleteOne();
    res.json({ message: "Order item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
