import { Router } from 'express';
import { getAllUsers, createUser, getUser, updateUser, deleteUser } from '../controllers/userController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

router.route('/')
  .get(protect, authorize('System Admin'), getAllUsers)
  .post(protect, authorize('System Admin'), createUser);

router.route('/:id')
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, authorize('System Admin'), deleteUser);

export default router;
