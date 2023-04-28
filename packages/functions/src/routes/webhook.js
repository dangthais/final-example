import Router from 'koa-router';
import * as webhookController from '../controllers/webhookController';

const router = new Router({
  prefix: '/webhook'
});

// router.use(verifyWebhook);
router.post('/orders/new', webhookController.listenNewOrder);
export default router;
