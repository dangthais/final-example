import Router from 'koa-router';
import * as settingsController from '../controllers/settingController';
import * as notificationsController from '../controllers/notificationController';

import {verifyRequest} from '@avada/shopify-auth';

const router = new Router({
  prefix: '/api'
});

router.use(verifyRequest());
router.get('/settings', settingsController.getSettings);
router.put('/settings', settingsController.updateSettings);
router.get('/notifications', notificationsController.get);

export default router;
