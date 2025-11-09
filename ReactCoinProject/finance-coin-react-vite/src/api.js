import { cryptoAssets, cryptoData } from "./data";

export function fetchfakeCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 1000);
  });
}

export function fetchFakeCryptoAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 2000);
  });
}