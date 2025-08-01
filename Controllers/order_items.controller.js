import { OrderItem } from "../Models/order_items.model.js";


export const getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem
      .find()
      .populate('product_id', 'name description price -_id')
      .populate({
        path: 'order_id',
        select: '-_id',
        populate: {
          path:'user_id',
          select:'-_id username email role'
        }
      })
    res.status(200).json({ message: 'success', orderItems })
  } catch (error) {
    res.status(500).json('internal server error')
  }
}


// Get all items for an order
export const getOrderItemsById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const items = await OrderItem.find({ _id: orderId })
      .populate("product_id", "title price");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
