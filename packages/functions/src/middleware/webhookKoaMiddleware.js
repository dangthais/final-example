export default async function(ctx, next) {
  try {
    const rawBody = ctx.rawBody;
    const secret = await getSecret(ctx);
    const hmac = getHmac(ctx);
  } catch (e) {}
}
