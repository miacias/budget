import { Schema, Types, model } from 'mongoose';
import { expenseItemSchema } from './ExpenseItem.js';

interface ExpenseItem {
  amount: number;
  [key: string]: any;
}

interface ExpenseGroup {
  name: string;
  items: ExpenseItem[];
  userId: Types.ObjectId;
  total?: number;
}

const expenseGroupSchema = new Schema<ExpenseGroup>({
  name: { type: String, required: true },
  items: [expenseItemSchema],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  toJSON: { virtuals: true },
  timestamps: true,
});

expenseGroupSchema.virtual('total').get(function(this: ExpenseGroup) {
  if (!this.items || !this.items.length) return 0;
  return this.items.reduce((sum, item: ExpenseItem) => sum + item.amount, 0);
})

// compiled model
const ExpenseGroup = model<ExpenseGroup>('ExpenseGroup', expenseGroupSchema);

export { ExpenseGroup };
export type { ExpenseGroup as ExpenseGroupType, ExpenseItem as ExpenseItemType };