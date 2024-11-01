import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Items} from '../database/Database';
import {colors} from '../themes/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ScreenName from '../constants/ScreenName';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductInfo = () => {
  const width = Dimensions.get('window').width;
  const scrollX = new Animated.Value(0);

  const position = Animated.divide(scrollX, width);

  const navigation = useNavigation();
  const route = useRoute();
  const {productID} = route.params;
  const [product, setProduct] = useState([]);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFromDB();
    //clearAsyncStorage();
  }, [navigation]);
  const getDataFromDB = () => {
    //! For ile dönebilirsin

    // for (let index = 0; index < Items.length; index++) {
    //   if (Items[index].id == productID) {
    //     console.warn(Items[index]);
    //   }
    // }

    //! find ile aynı sonucu alırsın
    const product = Items.find(item => item.id === productID);
    if (product) {
      setProduct(product);
    } else {
      console.warn('Ürün bulunamadı!');
    }
    console.log(product);
  };

  //Sepete ekleme fonksiyonu

  const addToCart = async id => {
    //Sepette önceden bir veri varsa AsyncStorage dan  veriyi getir
    let itemArray = await AsyncStorage.getItem('cartItems');

    itemArray = JSON.parse(itemArray);

    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        navigation.navigate(ScreenName.home);
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        //AsyncStorage'a veriyi ekledikten sonra homescreen'e yönlendir
        navigation.navigate(ScreenName.home);
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{marginTop: 10}}>
          <View style={{width: '100%', paddingTop: 16, paddingLeft: 16}}>
            <TouchableOpacity
              onPress={() => navigation.goBack(ScreenName.home)}>
              <Ionicons
                name="chevron-back-outline"
                style={{
                  fontSize: 18,
                  color: colors.backgroundDark,
                  backgroundColor: colors.white,
                  padding: 12,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.2}
            snapToInterval={width}
            bounces={false}
            data={product.productImageList ? product.productImageList : null}
            renderItem={({item}) => (
              <View style={{width: width, height: 240}}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                  source={item}
                />
              </View>
            )}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
              marginTop: 32,
            }}>
            {product.productImageList
              ? product.productImageList.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: '16%',
                        height: 2.4,
                        backgroundColor: colors.black,
                        marginHorizontal: 4,
                        opacity,
                      }}></Animated.View>
                  );
                })
              : null}
          </View>

          <View style={{paddingHorizontal: 16, marginTop: 6}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 14,
              }}>
              <Entypo
                name="shopping-cart"
                style={{
                  fontSize: 18,

                  color: colors.blue,
                  marginRight: 6,
                }}
              />
              <Text style={{color: colors.black, fontSize: 12}}>Shopping</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 4,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  letterSpacing: 0.4,
                  color: colors.black,
                  maxWidth: '84%',
                  marginVertical: 4,
                }}>
                {product.productName}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.blue + 20,
                  padding: 8,
                  borderRadius: 100,
                }}>
                <Ionicons name="link-outline" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: colors.black,
                fontWeight: '400',
                maxWidth: '85%',
                opacity: 0.5,
                lineHeight: 20,
                maxHeight: 44,
                marginBottom: 18,
                letterSpacing: 0.6,
              }}>
              {product.description}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,

                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: colors.backgroundLight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 12,
                    marginRight: 10,
                    borderRadius: 100,
                  }}>
                  <Entypo name="location-pin" size={16} color={colors.blue} />
                </View>
                <Text style={{letterSpacing: 1}}>
                  {' '}
                  Kadikoy/Istanbul {'\n'} 17-836{' '}
                </Text>
              </View>
              <Entypo
                name="chevron-right"
                size={22}
                color={colors.backgroundDark}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 36,
              marginTop: 25,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                marginVertical: 4,
                color: colors.black,
                letterSpacing: 0.6,

                fontWeight: '500',
              }}>
              {product.productPrice}.00 ₺{' '}
            </Text>
            <Text style={{letterSpacing: 0.6}}>
              Tax Rate %2- {product.productPrice / 20} ₺ (
              {product.productPrice + product.productPrice / 20}) ₺
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          width: '86%',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '8%',
        }}>
        <TouchableOpacity
          onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          style={{
            backgroundColor: colors.blue,
            width: '86%',
            height: '96%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: colors.white,
              textTransform: 'uppercase',
            }}>
            {product.isAvailable ? 'Add to cart' : 'Not available'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white, flex: 1, position: 'relative'},
});
