import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

const CoinDetailScreen = (props) => {
  useEffect(() => {
    console.log('coin', props.route.params);
  }, []);

  return (
    <View>
      <Text>Coin Detail Screen</Text>
    </View>
  );
};

export default CoinDetailScreen;
