import { Capacitor } from '@capacitor/core';
import { NativePurchases, PURCHASE_TYPE, type Transaction } from '@capgo/native-purchases';
import { DREAM_PASS } from '../data/dream';

/**
 * The one purchase, sold only in the iOS app (the website never sells anything): the whole Dream
 * team. It is non-consumable, so the App Store is the record of who owns it. The game asks the store
 * on every launch and on Restore, which means a reinstall, a new phone or wiped app storage can
 * never lose something a player paid for.
 */
export const canBuy = () => Capacitor.getPlatform() === 'ios';

const isPass = (t: Transaction | undefined | null) => t?.productIdentifier === DREAM_PASS.product;

/** The local price from the App Store, or null if the store can't be reached. */
export async function storePrice(): Promise<string | null> {
  if (!canBuy()) return null;
  try {
    const { products } = await NativePurchases.getProducts({ productIdentifiers: [DREAM_PASS.product], productType: PURCHASE_TYPE.INAPP });
    return products.find((p) => p?.identifier === DREAM_PASS.product)?.priceString ?? null;
  } catch (e) {
    console.warn('[vietbakeshop] store price unavailable', e);
    return null;
  }
}

/** Tells the store the purchase was delivered. Safe to call again for one already finished. */
async function finish(t: Transaction): Promise<void> {
  if (!t.transactionId) return;
  try {
    await NativePurchases.acknowledgePurchase({ purchaseToken: t.transactionId });
  } catch (e) {
    console.warn('[vietbakeshop] finishing a purchase failed', e);
  }
}

/** Does the App Store say this player owns the Dream team? */
async function owned(): Promise<boolean> {
  const { purchases } = await NativePurchases.getPurchases();
  return purchases.some(isPass);
}

export type BuyResult = { ok: true } | { ok: false; cancelled: boolean; message: string };

export async function buyDreamTeam(grant: () => void): Promise<BuyResult> {
  if (!canBuy()) return { ok: false, cancelled: false, message: 'The Dream team can only be bought in the iPhone and iPad app.' };
  try {
    const t = await NativePurchases.purchaseProduct({ productIdentifier: DREAM_PASS.product, productType: PURCHASE_TYPE.INAPP, quantity: 1, autoAcknowledgePurchases: false });
    if (!isPass(t)) return { ok: false, cancelled: false, message: 'The App Store couldn’t finish the purchase. Nothing was charged; please try again.' };
    grant();
    await finish(t);
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    const cancelled = /cancel/i.test(message);
    return { ok: false, cancelled, message: cancelled ? 'Purchase cancelled. Nothing was charged.' : /pending|deferred|ask to buy/i.test(message) ? 'Waiting for approval. The Dream team arrives as soon as it’s approved.' : 'The App Store couldn’t finish the purchase. Nothing was charged; please try again.' };
  }
}

/** Restore Purchases: asks the App Store again (it may ask the player to sign in). */
export async function restoreDreamTeam(grant: () => void): Promise<{ ok: boolean; message: string }> {
  if (!canBuy()) return { ok: false, message: 'There’s nothing to restore here.' };
  try {
    await NativePurchases.restorePurchases();
    if (await owned()) {
      grant();
      return { ok: true, message: 'Restored. The whole Dream team is yours.' };
    }
    return { ok: false, message: 'No Dream team purchase was found for this Apple Account.' };
  } catch (e) {
    console.warn('[vietbakeshop] restore failed', e);
    return { ok: false, message: 'The App Store isn’t answering right now. Please try again.' };
  }
}

/**
 * On launch, and whenever a purchase finishes while the game wasn't looking (approved by a parent
 * later, interrupted by a crash), check with the store and hand over the team. Returns a function
 * that stops listening.
 */
export function listenForPurchases(grant: () => void): () => void {
  if (!canBuy()) return () => undefined;
  let stop = () => undefined as void;
  let stopped = false;
  owned()
    .then((yes) => {
      if (yes && !stopped) grant();
    })
    .catch((e) => console.warn('[vietbakeshop] checking purchases failed', e));
  NativePurchases.addListener('transactionUpdated', (t) => {
    if (!isPass(t)) return;
    grant();
    void finish(t);
  })
    .then((h) => {
      stop = () => void h.remove();
      if (stopped) stop();
    })
    .catch((e) => console.warn('[vietbakeshop] purchase listener failed', e));
  return () => {
    stopped = true;
    stop();
  };
}
