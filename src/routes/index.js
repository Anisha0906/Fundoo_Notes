import express from 'express';
import userRoute from './user.route';
import notesRoute from './notes.route';
const router = express.Router();
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/notes', notesRoute);

  return router;
};

export default routes;
