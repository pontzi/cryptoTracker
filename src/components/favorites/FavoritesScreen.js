import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Colors from '../../resources/colors';
import FavoritesEmptyState from './FavoritesEmptyState';
import useFavoriteScreen from '../favorites/hooks/useFavoriteScreen';

import CoinsItem from '../coins/CoinsItem';
const FavoritesScreen = (props) => {
  const [favorites, handlePress] = useFavoriteScreen(props);
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
