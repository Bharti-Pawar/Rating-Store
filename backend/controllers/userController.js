import { find, create, findById, findByIdAndUpdate, findByIdAndDelete } from '../models/User';

export async function getAllUsers(req, res) {
  try {
    const users = await find();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function createUser(req, res) {
  try {
    const user = await create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function getUser(req, res) {
  try {
    const user = await findById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const user = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    await findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}
