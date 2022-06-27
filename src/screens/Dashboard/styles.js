import {StyleSheet} from 'react-native';
import colors from '../../constant/colors';
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '7%',
    marginHorizontal: 20,
  },
  stepsLabel: {
    fontSize: 20,
    color: colors.white,
  },
  countLabel: {
    fontSize: 25,
    color: colors.blue,
  },
});
