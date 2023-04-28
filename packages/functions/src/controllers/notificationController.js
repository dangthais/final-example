import {
  getNotifications,
  getNotificationsByDomain
} from '../repositories/notificationRepository';
import {getSetting} from '../repositories/settingRepository';

/**
 *
 * @param ctx
 * @returns {Promise<{data: *[], success: boolean}|{data: *, success: boolean}>}
 */
export async function get(ctx) {
  try {
    const notifications = await getNotifications();
    return (ctx.body = {
      data: notifications,
      success: true
    });
  } catch (e) {
    ctx.status = 400;
    return (ctx.body = {
      data: [],
      success: false
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean}|{settings: (*|null), notifications: (*|null)}>}
 */
export async function list(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const notifications = await getNotificationsByDomain(shopifyDomain);
    const getSettings = await getSetting(notifications[0].shopId);
    return (ctx.body = {
      notifications: notifications,
      settings: getSettings
    });
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
