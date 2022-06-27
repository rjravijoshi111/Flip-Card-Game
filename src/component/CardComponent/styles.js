import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');
import colors from '../../constant/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light_white,
    margin: 10,
    borderRadius: 10,
  },
  cardContainer: {
    width: width * 0.29,
    height: height * 0.198,
  },
  card: {
    width: width * 0.29,
    height: height * 0.198,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: colors.white,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card1: {
    backgroundColor: colors.blue,
  },
  card2: {
    backgroundColor: colors.white,
  },
  label: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'System',
    color: colors.white,
    backgroundColor: 'transparent',
  },
  label1: {
    color: colors.white,
  },
  label2: {
    color: colors.black,
  },
});
