// import mongoose, { Schema } from 'mongoose';


// const orderSchema = new Schema(
//   {
//     user_id: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     total_amount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
//       default: 'pending',
//     },

//   },
//   {
//     timestamps: {
//       createdAt: 'created_at',
//       updatedAt: 'updated_at',
//     },
//   }
// );

// orderSchema.index({ user_id: 1 });
// orderSchema.index({ status: 1 });
// orderSchema.index({ created_at: -1 });

// const Order = mongoose.model('Order', orderSchema);
// export default Order


import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

orderSchema.index({ user_id: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ created_at: -1 });

const Order = mongoose.model('Order', orderSchema);
export default Order;
