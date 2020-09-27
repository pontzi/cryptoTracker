import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../resources/colors';
import Http from '../../libraries/Http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libraries/storage';

const CoinDetailScreen = (props) => {
  const {coin, favoriteLoading} = props.route.params;
  const [currentCoin, setCurrentCoin] = useState(coin);
  const [markets, setMarkets] = useState({marketsData: [], loading: false});
  const [favorite, setFavorite] = useState(favoriteLoading);

  const {marketsData, loading} = markets;

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
    setMarkets({
      ...markets,
      loading: true,
    });
    try {
      const url = `https://api.coinlore.net/api/coin/markets/?id=${coinID}`;
      const markets = await Http.instance.get(url);

      setMarkets({
        marketsData: markets,
        loading: false,
      });
    } catch (error) {
      setMarkets({
        marketsData: [],
        loading: false,
      });
    }
    console.log('markets', markets);
  };

  const removeFromFavorites = async () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${currentCoin.id}`;
          await Storage.instance.remove(key);
          setFavorite(false);
        },
      },
    ]);
  };

  const addToFavorites = async () => {
    const coin = JSON.stringify(currentCoin);
    const key = `favorite-${currentCoin.id}`;

    const stored = await Storage.instance.store(key, coin);
    if (stored) {
      setFavorite(true);
    }
  };

  const getFavorite = async () => {
    try {
      const key = `favorite-${currentCoin.id}`;
      const favoriteCoin = await Storage.instance.get(key);
      if (favoriteCoin != null) {
        setFavorite(true);
      }
    } catch (error) {
      console.log('Get favorites error', error);
    }
  };

  const toggleFavorite = () => {
    if (favorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };

  useEffect(() => {
    getFavorite();
    getMarkets(currentCoin.id);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImg}
            source={{uri: getSymbolIcon(currentCoin.nameid)}}
          />
          <Text style={styles.titleText}>{currentCoin.name}</Text>
        </View>
        <Pressable
          onPress={toggleFavorite}
          style={[
            styles.favoriteBtn,
            favorite === true
              ? styles.favoriteRemoveBtn
              : styles.favoriteAddBtn,
          ]}>
          <Text style={styles.favoriteTextBtn}>
            {favorite === true ? 'Remove from favorites' : 'Add to favorites'}
          </Text>
        </Pressable>
      </View>

      <SectionList
        style={styles.section}
        sections={getSections(currentCoin)}
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
      {loading ? (
        <ActivityIndicator color="#fff" size="large" style={styles.loader} />
      ) : null}
      <FlatList
        style={styles.list}
        horizontal={true}
        data={marketsData}
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
  loader: {
    marginTop: 60,
  },
});
export default CoinDetailScreen;
