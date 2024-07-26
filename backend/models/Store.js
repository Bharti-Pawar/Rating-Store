import { Schema, model } from 'mongoose';

const storeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  ratings: [{ userId: Schema.Types.ObjectId, rating: { type: Number, min: 1, max: 5 } }],
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
});

storeSchema.virtual('averageRating').get(function () {
  const total = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return total / this.ratings.length;
});

const Store = model('Store', storeSchema);
export default Store;
