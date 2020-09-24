import React, {useEffect} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Http from '../../libraries/Http';

const CoinsScreen = (props) => {
  const getData = async () => {
    const coins = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    console.log(coins);
  };

  useEffect(() => {
    getData();
  }, []);

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
