import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Http from '../../libraries/Http';
import Colors from '../../resources/colors';
import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';

const CoinsScreen = (props) => {
  const [state, setState] = useState({
    coins: [],
    loading: false,
    allCoins: [],
  });

  const getData = async () => {
    setState({
      ...state,
      loading: true,
    });
    const response = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    setState({
      coins: response.data,
      loading: false,
      allCoins: response.data,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePress = (coin) => {
    props.navigation.navigate('CoinDetail', {coin});
  };

  const handleSearch = (query) => {
    const {allCoins} = state;
    const filteredCoins = allCoins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });
    setState({
      ...state,
      coins: filteredCoins,
    });
  };
  const {coins, loading} = state;

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
      {loading ? (
        <ActivityIndicator color="#fff" size="large" style={styles.loader} />
      ) : null}
      <FlatList
        data={coins}
        renderItem={({item}) => (
          <CoinsItem item={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
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
  loader: {
    marginTop: 60,
  },
});
export default CoinsScreen;
