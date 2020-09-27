import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Colors from '../../resources/colors';
import FavoritesEmptyState from './FavoritesEmptyState';
import Storage from '../../libraries/storage';
import CoinsItem from '../coins/CoinsItem';
const FavoritesScreen = (props) => {
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
    props.navigation.navigate('CoinDetail', {coin, favoriteLoading});
  };
  useEffect(() => {
    props.navigation.addListener('focus', getFavorites);
    return () => props.navigation.removeListener('focus', getFavorites);
  }, []);

  const {favorites} = state;
  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <FavoritesEmptyState />
      ) : (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
});
export default FavoritesScreen;
