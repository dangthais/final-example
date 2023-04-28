import {getCurrentUserInstance} from '../helpers/auth';
import {getSetting, updateSetting} from '../repositories/settingRepository';
export async function getSettings(ctx) {
  try {
    const {shopID} = getCurrentUserInstance(ctx);
    const settings = await getSetting(shopID);
    return (ctx.body = {
      data: settings,
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
export async function updateSettings(ctx) {
  try {
    const updateData = ctx.req.body;
    const {shopID} = getCurrentUserInstance(ctx);
    await updateSetting(shopID, updateData);
    return (ctx.body = {
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
