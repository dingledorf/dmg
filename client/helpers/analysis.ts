/**
 * 1 ExaHash = 1 million Terahash
 * 1 bitcoin every 10/7 ExaHash
 */

const TOTAL_EXAHASH_PER_BITCOIN = 10/7;
const TOTAL_TERAHASH_PER_EXAHASH = 1000000;
export const TERAHASH_TO_WIN = TOTAL_TERAHASH_PER_EXAHASH * TOTAL_EXAHASH_PER_BITCOIN;

export const calculateExpectedBitcoin = (hashRate: number, time: number) => {
  return time / (TERAHASH_TO_WIN / hashRate);
}

export const calculateHashrateToWin = (time: number) => {
  return TERAHASH_TO_WIN / time;
}