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

router.put('/:id',async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id:number = parseInt(req.params.id);
    const user:User = req.body;
    const userFound = await User.findByPk(id)
    if(userFound){
      await userFound.update(user,{
        where:{id:id}
      });
      res.send('User updated')
    }else{
      res.status(500).send('User not found')
    }
  } catch (error) {
    res.status(500).send(error)
  }
  
})

router.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
  const user = await User.findByPk(id)
  if(user){
    await user.destroy();
    res.send('User deleted')
  }else{
    res.status(500).send('User not found')
  }
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router;