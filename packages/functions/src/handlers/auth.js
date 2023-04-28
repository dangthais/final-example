import App from 'koa';
import 'isomorphic-fetch';
import {shopifyAuth} from '@avada/shopify-auth';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '../middleware/errorHandler';
import firebase from 'firebase-admin';
import * as errorService from '../services/errorService';
import api from './api';
import {addDefaultSettings} from '../repositories/settingRepository';
import {getShopByDomain} from '../repositories/shopRepository';
import {syncNotificationsFromOrders} from '../repositories/notificationRepository';
import {defaultSettings} from '../config/defaultSettings';
import shopifyConfig from '../config/shopify';
import {getShopify} from '../helpers/shopify';

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}
// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    initialPlan: {
      features: {},
      id: 'free',
      name: 'Free plan',
      periodDays: 3650,
      price: 0,
      trialDays: 0
    },
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/',
    afterInstall: async ctx => {
      try {
        const {accessToken, shop} = ctx.state.shopify;
        const {shopId} = await getShopByDomain(shop);
        const shopify = getShopify(shop, accessToken);
        await Promise.all([
          addDefaultSettings(shopId, defaultSettings),
          syncNotificationsFromOrders(shopId, shop, accessToken),
          shopify.webhook.create({
            address:
              'https://b4e4-113-190-27-55.ngrok-free.app/webhook/orders/new',
            topic: 'orders/create',
            format: 'json'
          }),
          shopify.scriptTag.create({
            event: 'onload',
            src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js'
          })
        ]);
      } catch (e) {
        console.error(e);
      }
    }
  }).routes()
);

// Handling all errors
api.on('error', errorService.handleError);

export default app;
