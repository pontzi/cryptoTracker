import {useEffect, useState} from 'react';
import Http from '../../../libraries/Http';
const useCoinsScreen = (props) => {
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
    const favoriteLoading = false;
    props.navigation.navigate('Coin detail', {coin, favoriteLoading});
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

  return [handlePress, handleSearch, coins, loading];
};

export default useCoinsScreen;
