import { find, create, findById, findByIdAndUpdate, findByIdAndDelete } from '../models/Store';

export async function getAllStores(req, res) {
  try {
    const stores = await find().populate('ownerId', 'name');
    res.status(200).json({ success: true, data: stores });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function createStore(req, res) {
  try {
    const store = await create(req.body);
    res.status(201).json({ success: true, data: store });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function getStore(req, res) {
  try {
    const store = await findById(req.params.id).populate('ownerId', 'name');
    res.status(200).json({ success: true, data: store });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function updateStore(req, res) {
  try {
    const store = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: store });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function deleteStore(req, res) {
  try {
    await findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function submitRating(req, res) {
  try {
    const { rating } = req.body;
    const store = await findById(req.params.id);
    const existingRating = store.ratings.find(r => r.userId.toString() === req.user.id);
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      store.ratings.push({ userId: req.user.id, rating });
    }
    await store.save();
    res.status(200).json({ success: true, data: store });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}
