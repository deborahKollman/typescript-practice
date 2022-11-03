import {Response, Request, Router, NextFunction} from 'express';
// import { User } from '../models/User';
import User, { IUser } from '../models/User';

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users : IUser[] = await User.find()
    res.status(200).json(users)
  } catch (error) {
    throw error
  }
});

router.post('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const user: IUser = new User({...body})
    await user.save()
    res.status(201).send('User created')
  } catch (error) {
    throw error
  }
});

router.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id:string = req.params.id;
    const user: IUser = req.body;
    await User.findByIdAndUpdate({ _id: id },user)
    res.status(200).send('User updated')
  } catch (error) {
    throw error
  }
});

router.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id:string = req.params.id;
    await User.findByIdAndDelete(id)
    res.status(200).send('User deleted')
  } catch (error) {
    throw error
  }
});

// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//   User.findAll()
//     .then((users) => {
//     res.send(users);
//     })
//     .catch((error) => next(error));
//   });
   
// router.post('/', (req: Request, res: Response, next: NextFunction) => {
//   const user = req.body;
//   User.create(user)
//     .then((createdUser) => {
//     res.send(createdUser);
//     })
//     .catch((error) => next(error));
// });

// router.put('/:id',async(req: Request, res: Response, next: NextFunction) => {
//   try {
//     const id:number = parseInt(req.params.id);
//     const user:User = req.body;
//     const userFound = await User.findByPk(id)
//     if(userFound){
//       await userFound.update(user,{
//         where:{id:id}
//       });
//       res.send('User updated')
//     }else{
//       res.status(500).send('User not found')
//     }
//   } catch (error) {
//     res.status(500).send(error)
//   }
  
// })

// router.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
//   try {
//     const id = parseInt(req.params.id);
//   const user = await User.findByPk(id)
//   if(user){
//     await user.destroy();
//     res.send('User deleted')
//   }else{
//     res.status(500).send('User not found')
//   }
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

export default router;