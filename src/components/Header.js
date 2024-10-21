import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../themes/colors';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 16,
      }}>
      <TouchableOpacity>
        <Entypo
          name="shopping-bag"
          size={22}
          color={colors.backgroundMedium}
          style={{
            backgroundColor: colors.backgroundLight,
            padding: 12,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(ScreenName.myCart)}>
        <Entypo
          name="shopping-cart"
          size={22}
          color={colors.backgroundMedium}
          style={{
            padding: 12,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.backgroundLight,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
