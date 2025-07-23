import mongoose, { Schema } from 'mongoose';



const orderItemSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    order_id: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

orderItemSchema.index({ order_id: 1 });
orderItemSchema.index({ product_id: 1 });

orderItemSchema.index({ order_id: 1, product_id: 1 }, { unique: true });

export const OrderItem = mongoose.model('OrderItem', orderItemSchema);
