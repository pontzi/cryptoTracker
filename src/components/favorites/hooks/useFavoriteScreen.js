import {useEffect, useState} from 'react';
import Storage from '../../../libraries/storage';

const useFavoriteScreen = (props) => {
  const [state, setState] = useState({favorites: []});

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllkeys();
      const keys = allKeys.filter((key) => key.includes('favorite-'));
      const favs = await Storage.instance.multiGet(keys);
      const favorites = favs.map((fav) => JSON.parse(fav[1]));
      setState({
        ...state,
        favorites,
      });
    } catch (error) {
      console.log('Get favorites error', error);
    }
  };

  const handlePress = (coin) => {
    const favoriteLoading = true;
    props.navigation.navigate('Coin detail', {coin, favoriteLoading});
  };
  useEffect(() => {
    props.navigation.addListener('focus', getFavorites);
    return () => props.navigation.removeListener('focus', getFavorites);
  }, []);

  const {favorites} = state;
  return [favorites, handlePress];
};

export default useFavoriteScreen;
