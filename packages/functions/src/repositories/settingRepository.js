import {Firestore} from '@google-cloud/firestore';
const firestore = new Firestore();
const settingsRef = firestore.collection('settings');

/**
 *
 * @param shopId
 * @returns {Promise<(*&{id})|null>}
 */
export async function getSetting(shopId) {
  const settingDocs = await settingsRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  if (settingDocs.empty) {
    return null;
  }
  const settingDoc = settingDocs.docs[0];
  return {
    ...settingDoc.data(),
    id: settingDoc.id
  };
}

/**
 *
 * @param shopId
 * @param updateData
 * @returns {Promise<*|null>}
 */
export async function updateSetting(shopId, updateData) {
  const settingDocs = await settingsRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  const settingDoc = settingDocs.docs[0].data();
  if (settingDoc.empty) {
    return null;
  }
  const docRefs = settingDocs.docs[0].ref;
  return docRefs.update({
    ...settingDoc,
    ...updateData
  });
}

/**
 *
 * @param shopId
 * @param defaultSettings
 * @returns {Promise<*>}
 */
export const addDefaultSettings = async (shopId, defaultSettings) => {
  const setting = await getSetting(shopId);
  if (!setting) {
    return settingsRef.add({
      ...defaultSettings,
      shopId: shopId
    });
  }
};
