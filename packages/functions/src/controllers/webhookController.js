import {getShopByDomain} from '../repositories/shopRepository';
import {
  addNotifications,
  getNotificationItem
} from '../repositories/notificationRepository';
import {getShopify} from '../helpers/shopify';

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean}|{data: *[], success: boolean}>}
 * @constructor
 */
export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = [ctx.req.body];
    const {accessToken, shopId} = await getShopByDomain(shopifyDomain);
    const shopify = getShopify(shopifyDomain, accessToken);
    const notification = await getNotificationItem(shopify, orderData);
    await addNotifications({
      shopId,
      shopifyDomain,
      data: notification[0],
      shopify
    });
    return (ctx.body = {
      success: true
    });
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
