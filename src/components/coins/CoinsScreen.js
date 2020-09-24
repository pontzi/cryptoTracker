import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

const CoinsScreen = (props) => {
  const handlePress = () => {
    console.log('Go to detail', props);
    props.navigation.navigate('CoinDetail');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Coins Screen</Text>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Go to detail</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
export default CoinsScreen;
