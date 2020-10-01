import React, {useState} from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';
import Colors from '../../resources/colors';

const CoinsSearch = (props) => {
  const [query, setQuery] = useState('');
  const handleChangeText = (query) => {
    setQuery(query);
    if (props.onChange) {
      props.onChange(query);
    }
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS == 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleChangeText}
        value={query}
        placeholder="Search coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});
export default CoinsSearch;
