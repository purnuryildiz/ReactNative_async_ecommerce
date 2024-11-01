import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../themes/colors';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';

const ProductCard = ({data}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{width: '48%', marginVertical: 14}}
      onPress={() =>
        navigation.navigate(ScreenName.productInfo, {productID: data.id})
      }>
      <View style={styles.cart}>
        {data.isOff && (
          <View style={styles.bgOffset}>
            <Text style={styles.textOffPercent}>{data.offPercentage} % </Text>
          </View>
        )}

        <Image
          source={data.productImage}
          style={styles.cartImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.productText}>{data.productName} </Text>
      <Text style={{color: colors.black, opacity: 0.7, marginTop: 3}}>
        {data.productPrice} ₺
      </Text>
      <Text></Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cart: {
    backgroundColor: colors.backgroundLight,
    position: 'relative',
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cartImage: {
    width: '80%',
    height: '80%',
  },
  textOffPercent: {
    fontSize: 12,
    color: colors.white,
  },
  bgOffset: {
    backgroundColor: colors.green,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '20%',
    height: '24%',
    justifyContent: 'center',
    alignContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  productText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '600',
    marginVertical: 4,
  },
});
