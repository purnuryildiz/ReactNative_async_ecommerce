import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../themes/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({data, product, setProduct, getDataFromDB, getTotal}) => {
  const navigation = useNavigation();

  //Delete fonksiyonu

  const removeItemFromCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray.filter(item => item !== id);
      console.log(array);
      await AsyncStorage.setItem('cartItems', JSON.stringify(array));
      getDataFromDB();
    }
  };

  //Miktar güncelleme fonksiyonu
  const updateQuantity = (id, type) => {
    let updateProducts = product.map(item => {
      if (item.id === id) {
        let newQuantity =
          type === 'increase' ? item.quantity + 1 : item.quantity - 1;
        item.quantity = newQuantity > 0 ? newQuantity : removeItemFromCart(id);
      }
      return item;
    });
    setProduct(updateProducts);
    getTotal(updateProducts);
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(ScreenName.productInfo, {productID: data.id})
      }
      style={{
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 6,
        borderBottomWidth: 2,
        paddingBottom: 5,
        borderBottomColor: colors.backgroundLight,
        paddingHorizontal: 10,
      }}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={data.productImage} />
      </View>
      {/* Image Info Section */}
      <View style={styles.productDetail}>
        <View>
          <Text style={{letterSpacing: 0.6}}>{data.productName} </Text>
          <View style={{marginTop: 10}}>
            <Text style={{letterSpacing: 0.6, opacity: 0.6, fontWeight: '600'}}>
              {data.productPrice * data.quantity} ₺
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <TouchableOpacity
              onPress={() => updateQuantity(data.id, 'decrease')}>
              <AntDesign
                name="minuscircleo"
                size={18}
                color="black"
                style={{opacity: 0.5}}
              />
            </TouchableOpacity>
            <Text style={{marginRight: 10, marginLeft: 8}}>
              {' '}
              {data.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => updateQuantity(data.id, 'increase')}>
              <AntDesign
                name="pluscircleo"
                size={18}
                color="black"
                style={{opacity: 0.5}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => removeItemFromCart(data.id)}
            style={{
              marginTop: 15,
              backgroundColor: colors.backgroundLight,
              padding: 4,
              borderRadius: 100,
            }}>
            <FontAwesome
              name="trash-o"
              size={18}
              color="black"
              style={{opacity: 0.6}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Cart;

const styles = StyleSheet.create({
  imageContainer: {
    width: '30%',
    height: 100,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 22,
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productDetail: {
    flex: 1,

    height: 100,
  },
});
