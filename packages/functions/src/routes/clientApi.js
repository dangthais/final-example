import Router from 'koa-router';
import * as notificationsController from '../controllers/notificationController';
const router = new Router({
  prefix: '/clientApi'
});

// router.use(verifyWebhook);
router.get('/notifications', notificationsController.list);
export default router;
