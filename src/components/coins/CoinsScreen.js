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

const CoinsScreen = (props) => {
  const [state, setState] = useState({
    coins: [],
    loading: false,
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
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePress = () => {
    props.navigation.navigate('CoinDetail');
  };

  const {coins, loading} = state;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color="#fff" size="large" style={styles.loader} />
      ) : null}
      <FlatList
        data={coins}
        renderItem={({item}) => <CoinsItem item={item} />}
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
