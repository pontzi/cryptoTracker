import React from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import DetailScrenStyles from '../coinDetail/styles/DetailScreenStyles';
import CoinMarketItem from './CoinMarketItem';
import useDetailScreen from './hooks/useDetailScreen';

const CoinDetailScreen = (props) => {
  const {coin, favoriteLoading} = props.route.params;
  const [
    toggleFavorite,
    getSections,
    getSymbolIcon,
    marketsData,
    loading,
    currentCoin,
    favorite,
  ] = useDetailScreen(coin, favoriteLoading);

  return (
    <View style={DetailScrenStyles.container}>
      <View style={DetailScrenStyles.subHeader}>
        <View style={DetailScrenStyles.row}>
          <Image
            style={DetailScrenStyles.iconImg}
            source={{uri: getSymbolIcon(currentCoin.nameid)}}
          />
          <Text style={DetailScrenStyles.titleText}>{currentCoin.name}</Text>
        </View>
        <Pressable
          onPress={toggleFavorite}
          style={[
            DetailScrenStyles.favoriteBtn,
            favorite === true
              ? DetailScrenStyles.favoriteRemoveBtn
              : DetailScrenStyles.favoriteAddBtn,
          ]}>
          <Text style={DetailScrenStyles.favoriteTextBtn}>
            {favorite === true ? 'Remove from favorites' : 'Add to favorites'}
          </Text>
        </Pressable>
      </View>

      <SectionList
        style={DetailScrenStyles.section}
        sections={getSections(currentCoin)}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <View style={DetailScrenStyles.sectionItem}>
            <Text style={DetailScrenStyles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={DetailScrenStyles.sectionHeader}>
            <Text style={DetailScrenStyles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={DetailScrenStyles.marketsTitle}>Markets</Text>
      {loading ? (
        <ActivityIndicator
          color="#fff"
          size="large"
          style={DetailScrenStyles.loader}
        />
      ) : null}
      <FlatList
        style={DetailScrenStyles.list}
        horizontal={true}
        data={marketsData}
        renderItem={({item}) => <CoinMarketItem item={item} />}
        keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
      />
    </View>
  );
};

export default CoinDetailScreen;
