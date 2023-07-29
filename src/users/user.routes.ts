import { Router } from 'express';
import {onDeleteUser, onGet, onGetUser, onPatchUser, onPost, onPutUser} from './user.handlers.js';

const router = Router();

router.get('/', onGet);
router.post('/', onPost);
router.get('/:userId', onGetUser);
router.delete('/:userId', onDeleteUser);
router.put('/:userId', onPutUser);
router.patch('/:userId', onPatchUser);

export default router;