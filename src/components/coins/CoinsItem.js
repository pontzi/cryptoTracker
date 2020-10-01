import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import CoinsItemStyles from './styles/CoinsItemStyles';
const CoinsItem = ({item, onPress}) => {
  const getArrowImg = () => {
    if (item.percent_change_1h > 0) {
      return require('../../assets/arrow_up.png');
    } else {
      return require('../../assets/arrow_down.png');
    }
  };
  return (
    <Pressable onPress={onPress} style={CoinsItemStyles.container}>
      <View style={CoinsItemStyles.row}>
        <Text style={CoinsItemStyles.symbolText}>{item.symbol}</Text>
        <Text style={CoinsItemStyles.nameText}>{item.name}</Text>
        <Text style={CoinsItemStyles.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={CoinsItemStyles.row}>
        <Text style={CoinsItemStyles.percentText}>
          {item.percent_change_1h}
        </Text>
        <Image style={CoinsItemStyles.imgIcon} source={getArrowImg()} />
      </View>
    </Pressable>
  );
};

export default CoinsItem;
