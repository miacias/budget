import { Schema, Types, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token?: string;
  incomeSources: Types.ObjectId[];
  expenseGroups: Types.ObjectId[];
  validatePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String },
  password: {
    type: String,
    required: true,
    allowNull: false,
  },
  incomeSources: [{ type: Types.ObjectId, ref: 'IncomeSource' }],
  expenseGroups: [{ type: Types.ObjectId, ref: 'ExpenseGroup' }],
}, {
  toJSON: { virtuals: true },
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err as Error);
  }
});

userSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate() as { password?: string };
  if (update && update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);
      this.setUpdate(update);
    } catch (err) {
      return next(err as Error);
    }
  }
  next();
});

userSchema.methods.validatePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
}

// compiled model
const User = model<UserDocument>('User', userSchema);

export { User, type UserDocument };
