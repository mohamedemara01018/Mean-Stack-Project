import mongoose, { Schema } from 'mongoose';



const orderItemSchema = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
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

  },
  {
    timestamps: false,
  }
);

orderItemSchema.index({ order_id: 1 });
orderItemSchema.index({ product_id: 1 });

orderItemSchema.index({ order_id: 1, product_id: 1 }, { unique: true });

export const OrderItem = mongoose.model('OrderItem', orderItemSchema);
