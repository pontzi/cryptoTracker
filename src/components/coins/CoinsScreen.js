import React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import CoinsScreenStyles from '../coins/styles/CoinsScreenStyles';
import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';
import useCoinsScreen from '../coins/hooks/useCoinsScreen';

const CoinsScreen = (props) => {
  const [handlePress, handleSearch, coins, loading] = useCoinsScreen(props);

  return (
    <View style={CoinsScreenStyles.container}>
      <CoinsSearch onChange={handleSearch} />
      {loading ? (
        <ActivityIndicator
          color="#fff"
          size="large"
          style={CoinsScreenStyles.loader}
        />
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

export default CoinsScreen;
