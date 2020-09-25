import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, SectionList} from 'react-native';
import Colors from '../../resources/colors';

const CoinDetailScreen = (props) => {
  const [state, setState] = useState({coin: {}});

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
  useEffect(() => {
    const {coin} = props.route.params;
    props.navigation.setOptions({title: coin.symbol});
    setState({
      coin,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image
          style={styles.iconImg}
          source={{uri: getSymbolIcon(state.coin.nameid)}}
        />
        <Text style={styles.titleText}>{state.coin.name}</Text>
      </View>

      <SectionList
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default CoinDetailScreen;
