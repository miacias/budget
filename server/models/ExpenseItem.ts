import { Schema, Types, model } from 'mongoose';

const expenseItemSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  expenseGroupId: { type: Types.ObjectId, ref: 'ExpenseGroup', required: true },
}, {
  toJSON: { virtuals: true },
  timestamps: true,
});

// schema only for ExpenseGroup (not compiled model)
export { expenseItemSchema };