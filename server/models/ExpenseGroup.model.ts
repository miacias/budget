import { Schema, Types, model } from 'mongoose';
import { expenseItemSchema } from './ExpenseItem.js';

const expenseGroupSchema = new Schema({
  name: { type: String, required: true },
  items: [expenseItemSchema],
  userId: { type: Types.ObjectId, ref: 'User', required: true },
}, {
  toJSON: { virtuals: true },
  timestamps: true,
});

expenseGroupSchema.virtual('total').get(() => {
  if (!this.items || !this.items.length) return 0;
  return this.items.reduce((sum, item) => sum + item.amount, 0);
})

// compiled model
const ExpenseGroup = model('ExpenseGroup', expenseGroupSchema);

export { ExpenseGroup };