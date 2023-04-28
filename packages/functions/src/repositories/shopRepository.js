import {Firestore} from '@google-cloud/firestore';
const firestore = new Firestore();
const shopsRef = firestore.collection('shops');

/**
 *
 * @param shopifyDomain
 * @returns {Promise<(*&{shopId, accessToken: string})|null>}
 */
export const getShopByDomain = async shopifyDomain => {
  const shopsDocs = await shopsRef
    .where('shopifyDomain', '==', shopifyDomain)
    .limit(1)
    .get();
  if (shopsDocs.empty) {
    return null;
  }
  const shopsDoc = shopsDocs.docs[0];
  return {
    shopId: shopsDoc.id,
    ...shopsDoc.data()
  };
};
