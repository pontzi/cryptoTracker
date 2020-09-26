import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from '../../resources/colors';
import FavoritesEmptyState from './FavoritesEmptyState';

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <FavoritesEmptyState />
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
