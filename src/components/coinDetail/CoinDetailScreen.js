import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
} from 'react-native';
import Colors from '../../resources/colors';
import Http from '../../libraries/Http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libraries/storage';

const CoinDetailScreen = (props) => {
  const {coin} = props.route.params;
  const [state, setState] = useState({coin, markets: [], isFavorite: false});

  const getSymbolIcon = (coinNameID) => {
    if (coinNameID) {
      return `https://c1.coinlore.com/img/16x16/${coinNameID}.png`;
    }
  };

  const getSections = (coin) => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return sections;
  };

  const getMarkets = async (coinID) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinID}`;
    const markets = await Http.instance.get(url);
    setState({
      ...state,
      markets,
    });
  };

  const removeFromFavorites = () => {};

  const addToFavorites = () => {
    const coin = JSON.stringify(state.coin);
    const key = `favorite-${state.coin.id}`;

    const stored = Storage.instance.store(key, coin);
    if (stored) {
      setState({
        ...state,
        isFavorite: true,
      });
    }
  };

  const toggleFavorite = () => {
    if (state.isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };

  useEffect(() => {
    props.navigation.setOptions({title: coin.symbol});
    getMarkets(coin.id);
  }, []);
  const {isFavorite, markets} = state;

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImg}
            source={{uri: getSymbolIcon(state.coin.nameid)}}
          />
          <Text style={styles.titleText}>{state.coin.name}</Text>
        </View>
        <Pressable
          onPress={toggleFavorite}
          style={[
            styles.favoriteBtn,
            isFavorite ? styles.favoriteRemoveBtn : styles.favoriteAddBtn,
          ]}>
          <Text style={styles.favoriteTextBtn}>
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </Text>
        </Pressable>
      </View>

      <SectionList
        style={styles.section}
        sections={getSections(state.coin)}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={styles.marketsTitle}>Markets</Text>
      <FlatList
        style={styles.list}
        horizontal={true}
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
        keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketsTitle: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  favoriteBtn: {
    padding: 8,
    borderRadius: 8,
  },
  favoriteAddBtn: {
    backgroundColor: Colors.picton,
  },
  favoriteRemoveBtn: {
    backgroundColor: Colors.carmine,
  },
  favoriteTextBtn: {
    color: Colors.white,
  },
});
export default CoinDetailScreen;
