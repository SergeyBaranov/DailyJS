import { createContext } from "react";
import { useEffect, useState } from 'react';
import { fetchfakeCrypto, fetchFakeCryptoAssets } from '../api';
import { percentDifference } from '../utils';

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider ({children}) {

  const [loading, setLoading] = useState(false); //индикатор загрузки, т.к. загрузка идет 2 секунды
  const [crypto, setCryptoData] = useState([]); //массив с информацией про крус и т.д.
  const [assets, setAssets] = useState([]); // сколько и какая крипта есть у пользователя

  useEffect(() => {
    setLoading(true); //начали загрузку
    async function preload() {
      const {result} = await fetchfakeCrypto(); // массив result с информацией про курс  и т.д.
      const assets = await fetchFakeCryptoAssets();

      setAssets(
        assets.map(asset => {
          const coin = result.find ((c) => c.id === asset.id)  //получить данные моенты из массива result по asset_id
          return {
            grow: asset.price < coin.price, //был ли рост цены монеты или она упала в стоимости
            growPercent: percentDifference(asset.price, coin.price), //процент роста или падения
            totalAmount: asset.amount * coin.price, //общая стоимость монеты
            totalProfit: asset.amount * coin.price - asset.amount * asset.price, //общая прибыль по монете/ сравниваем сколько стоит сейчас и сколько стоило ранее
            ...asset,
            ...result.find(item => item.asset_id === asset.asset_id)
        };
      })); // портфолио пользователя
      setCryptoData(result); //данные с криптобиржи
      setLoading(false);//загрузка закончилась
    }
    preload();
  }, []);


  return (
    <CryptoContext.Provider value={{loading, crypto, assets}}>
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoContext;