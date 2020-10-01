import {useEffect, useState} from 'react';
import Http from '../../../libraries/Http';
import Storage from '../../../libraries/storage';
import {Alert} from 'react-native';

const useDetailScreen = (coin, favoriteLoading) => {
  const [currentCoin, setCurrentCoin] = useState(coin);
  const [markets, setMarkets] = useState({marketsData: [], loading: false});
  const [favorite, setFavorite] = useState(favoriteLoading);
  const {marketsData, loading} = markets;

  const getSymbolIcon = (coinNameID) => {
    if (coinNameID) {
      return `https://c1.coinlore.com/img/16x16/${coinNameID}.png`;
    }
  };

  const getSections = (coin) => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return sections;
  };
  const getMarkets = async (coinID) => {
    setMarkets({
      ...markets,
      loading: true,
    });
    try {
      const url = `https://api.coinlore.net/api/coin/markets/?id=${coinID}`;
      const markets = await Http.instance.get(url);

      setMarkets({
        marketsData: markets,
        loading: false,
      });
    } catch (error) {
      setMarkets({
        marketsData: [],
        loading: false,
      });
    }
  };

  const removeFromFavorites = async () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${currentCoin.id}`;
          await Storage.instance.remove(key);
          setFavorite(false);
        },
      },
    ]);
  };

  const addToFavorites = async () => {
    const coin = JSON.stringify(currentCoin);
    const key = `favorite-${currentCoin.id}`;

    const stored = await Storage.instance.store(key, coin);
    if (stored) {
      setFavorite(true);
    }
  };

  const getFavorite = async () => {
    try {
      const key = `favorite-${currentCoin.id}`;
      const favoriteCoin = await Storage.instance.get(key);
      if (favoriteCoin != null) {
        setFavorite(true);
      }
    } catch (error) {
      console.log('Get favorites error', error);
    }
  };

  const toggleFavorite = () => {
    if (favorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };

  useEffect(() => {
    getFavorite();
    getMarkets(currentCoin.id);
  }, []);

  return [
    toggleFavorite,
    getSections,
    getSymbolIcon,
    marketsData,
    loading,
    currentCoin,
    favorite,
  ];
};

export default useDetailScreen;
