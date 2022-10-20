import {Response, Request, Router, NextFunction} from 'express';
import { User } from '../models/User';

const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  User.findAll()
    .then((users) => {
    res.send(users);
    })
    .catch((error) => next(error));
  });
   
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  User.create(user)
    .then((createdUser) => {
    res.send(createdUser);
    })
    .catch((error) => next(error));
});

router.put('/',(req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  const id = req.query;
  console.log(req.body,req.query)
  User.update(user,{
    where:id
  })
  .then(() => {
  res.send('User updated successfully');
  })
  .catch((error) => next(error));
})

router.delete('/',(req: Request, res: Response, next: NextFunction) => {
  const id = req.query;
  User.destroy({
    where:id
  })
  .then(() => {
  res.send('User deleted successfully');
  })
  .catch((error) => next(error));
})

export default router;