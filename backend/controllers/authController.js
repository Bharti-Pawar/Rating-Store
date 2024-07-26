import { create, findOne } from '../models/User';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export async function signup(req, res) {
  try {
    const { name, email, password, address } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = await create({ name, email, password: hashedPassword, address });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: 'Invalid credentials' });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, error: 'Invalid credentials' });
    }
    const token = sign({ id: user._id }, 'secret', { expiresIn: '1d' });
    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}
