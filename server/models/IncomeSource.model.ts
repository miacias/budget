import { Schema, Types, model } from 'mongoose';

const incomeSourceSchema = new Schema({
  name: { type: String, required: true },
  monthlyGrossPay: { type: Number, required: true },
  monthlyTaxes: { type: Number, required: true },
  hourlyWage: { type: Number, required: false },
  salary: { type: Number, required: false },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
}, {
  toJSON: { virtuals: true },
  timestamps: true,
});

// compiled model
const IncomeSource = model('IncomeSource', incomeSourceSchema);

export { IncomeSource };