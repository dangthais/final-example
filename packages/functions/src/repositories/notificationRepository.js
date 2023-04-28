import {Firestore} from '@google-cloud/firestore';
import {getShopify} from '../helpers/shopify';
import moment from 'moment';

const firestore = new Firestore();
const notificationsRef = firestore.collection('notifications');

/**
 *
 * @returns {Promise<null>}
 */
export async function checkIsEmptyNotifications() {
  const notificationDocs = await notificationsRef.limit(1).get();
  if (notificationDocs.empty) return null;
}
/**
 *
 * @returns {Promise<*>}
 */
export async function getNotifications() {
  const checkIsEmpty = await checkIsEmptyNotifications();
  if (!checkIsEmpty) {
    const notificationDocs = await notificationsRef.get();
    return notificationDocs.docs.map(doc => {
      return {
        ...doc.data(),
        id: doc.id
      };
    });
  }
}
/**
 * @param shopId
 * @param shopifyDomain
 * @param accessToken
 * @returns {Promise<*>}
 */
export const syncNotificationsFromOrders = async (
  shopId,
  shopifyDomain,
  accessToken
) => {
  const notifications = await getNotifications();
  if (notifications.length === 0) {
    const shopify = getShopify(shopifyDomain, accessToken);
    const ordersList = await shopify.order.list({limit: 30});
    const productIdsList = ordersList.map(item => {
      return item.line_items[0].product_id;
    });
    const productIds = [...new Set(productIdsList)].join(',');
    const orders = await getNotificationsToOrder({
      orderData: ordersList,
      productIds,
      shopify
    });
    return orders.map(order => {
      return notificationsRef.add({
        ...order,
        shopId: shopId,
        shopifyDomain: shopifyDomain
      });
    });
  }
};
/**
 *
 * @param shopify
 * @param orderData
 * @returns {Promise<*>}
 */
export const getNotificationItem = async (shopify, orderData) => {
  const productIds = orderData[0].line_items[0].product_id;
  return getNotificationsToOrder({orderData, productIds, shopify});
};

/**
 *
 * @param orderData
 * @param productIds
 * @param shopify
 * @returns {Promise<*>}
 */
export const getNotificationsToOrder = async ({
  orderData,
  productIds,
  shopify
}) => {
  const products = await shopify.product.list({
    limit: 30,
    ids: productIds
  });
  return orderData.map(order => {
    const productFirst = order.line_items[0];
    const product = products.find(item => item.id === productFirst.product_id);
    return {
      productId: productFirst.product_id,
      city: order.billing_address.city,
      country: order.billing_address.country,
      firstName: order.billing_address.first_name,
      productImage:
        product?.image.src ||
        'https://kienthuc5s.com/wp-content/uploads/2022/01/11_hinh-anh-cho.jpg',
      productName: productFirst.name,
      timestamp: order.created_at
    };
  });
};

export const addNotifications = async ({shopId, shopifyDomain, data}) => {
  return notificationsRef.add({
    ...data,
    shopId: shopId,
    shopifyDomain: shopifyDomain
  });
};

/**
 *
 * @param shopifyDomain
 * @returns {Promise<*|null>}
 */
export const getNotificationsByDomain = async shopifyDomain => {
  const checkIsEmpty = await checkIsEmptyNotifications();
  if (!checkIsEmpty) {
    const notificationsDocs = await notificationsRef
      .where('shopifyDomain', '==', shopifyDomain)
      .get();
    return notificationsDocs.docs.map(doc => {
      return {
        ...doc.data(),
        shopId: doc.data().shopId,
        timestamp: moment(doc.data().timestamp).fromNow()
      };
    });
  }
};
