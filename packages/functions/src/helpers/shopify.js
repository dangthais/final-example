import Shopify from 'shopify-api-node';

export const getShopify = (shopifyDomain, accessToken) => {
  return new Shopify({
    shopName: shopifyDomain,
    accessToken: accessToken
  });
};
