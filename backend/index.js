import express, { json } from 'express';
import { connect } from 'mongoose';
import userRouter from './routes/userRoutes';
import storeRouter from './routes/storeRoutes';
import authRouter from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

connect('mongodb://localhost:27017/rating_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(json());

app.use('/api/users', userRouter);
app.use('/api/stores', storeRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
