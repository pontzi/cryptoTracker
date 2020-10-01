import {StyleSheet} from 'react-native';
import Colors from '../../../resources/colors';
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

export default styles;
