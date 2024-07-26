import { Router } from 'express';
import { getAllStores, createStore, getStore, updateStore, deleteStore, submitRating } from '../controllers/storeController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

router.route('/')
  .get(protect, getAllStores)
  .post(protect, authorize('System Admin'), createStore);

router.route('/:id')
  .get(protect, getStore)
  .put(protect, authorize('System Admin'), updateStore)
  .delete(protect, authorize('System Admin'), deleteStore);

router.route('/:id/rate')
  .post(protect, submitRating);

export default router;
