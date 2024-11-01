import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../themes/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Items} from '../database/Database';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import ScreenName from '../constants/ScreenName';
import Cart from '../components/Cart';
import LottieView from 'lottie-react-native';
const width = Dimensions.get('window').width;
const MyCart = () => {
  const navigation = useNavigation();
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getDataFromDB();
  }, [navigation]);

  //Data'yı çekme fonksiyonu
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems');

    items = JSON.parse(items);

    let productData = [];
    if (items) {
      //Sepetteki ürüne miktar ekleyebilmek için dönüp productData dizisine veri eklenmesi:
      Items.forEach(data => {
        if (items.includes(data.id)) {
          data.quantity = 1;
          productData.push(data);
        }
      });
      //sonrasında  Product state i güncellendi
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct([]);
      setTotal(0);
    }
  };

  //Total Hesaplama Fonksiyonu
  const getTotal = productData => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice =
        productData[index].productPrice * productData[index].quantity;
      total += productPrice;
    }
    setTotal(total);
  };

  //Checkout Fonksiyonu

  const checkout = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    }
    navigation.navigate(ScreenName.home);
  };

  return (
    <>
      {product.length > 0 ? (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(ScreenName.home)}>
              <Entypo
                name="chevron-left"
                size={24}
                color="black"
                style={styles.backButton}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Order Details</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.myCart}>My Cart </Text>
            <View style={{paddingHorizontal: 16}}>
              {product.length > 0
                ? product.map(data => (
                    <Cart
                      key={data.id}
                      data={data}
                      product={product}
                      setProduct={setProduct}
                      getDataFromDB={getDataFromDB}
                      getTotal={getTotal}
                    />
                  ))
                : null}
            </View>
            {/* Cart ların altı detay bilgileri kısmı */}
            <View>
              {/* Location */}
              <View>
                <Text style={styles.locationText}>Delivery Location </Text>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          backgroundColor: colors.backgroundLight,
                          padding: 10,
                          borderRadius: 100,
                          marginRight: 15,
                        }}>
                        <Entypo
                          name="location-pin"
                          size={16}
                          color={colors.blue}
                        />
                      </View>
                      <View>
                        <Text style={{letterSpacing: 0.8}}>
                          2 Petre Meilvishhki St. {'\n'} 0.162, Tbilisi{' '}
                        </Text>
                      </View>
                    </View>

                    <View>
                      <Entypo
                        name="chevron-right"
                        size={24}
                        color={colors.backgroundDark}
                      />
                    </View>
                  </View>
                </View>
              </View>
              {/* Payment */}
              <View>
                <Text
                  style={[
                    styles.locationText,
                    {marginTop: 20, letterSpacing: 1.5},
                  ]}>
                  Payment Method
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        backgroundColor: colors.backgroundLight,
                        padding: 12,
                        marginTop: 20,
                      }}>
                      <Text style={{color: colors.blue}}>VISA</Text>
                    </View>
                    <View style={{marginTop: 10, marginLeft: 15}}>
                      <Text style={{letterSpacing: 1}}>
                        {' '}
                        VISA Classic{'\n'} **** **** **** 2121{' '}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Entypo
                      name="chevron-right"
                      size={24}
                      color={colors.backgroundDark}
                    />
                  </View>
                </View>
              </View>
              {/* Order Info */}
              <View style={{marginTop: 60}}>
                <Text
                  style={{
                    letterSpacing: 1,
                    fontSize: 20,
                    fontWeight: '500',
                    marginBottom: 30,
                  }}>
                  {' '}
                  Order Info
                </Text>
                <View
                  style={{paddingHorizontal: 16, marginVertical: 10, gap: 30}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        opacity: 0.6,
                        fontSize: 16,
                        letterSpacing: 1,
                        fontWeight: '400',
                      }}>
                      Subtotal{' '}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        letterSpacing: 1,
                        fontWeight: '500',
                      }}>
                      {total} ₺{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        opacity: 0.6,
                        fontSize: 16,
                        letterSpacing: 1,
                        fontWeight: '400',
                      }}>
                      Shipping Tax{' '}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        letterSpacing: 1,
                        fontWeight: '500',
                      }}>
                      {total / 20} ₺{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        opacity: 0.6,
                        fontSize: 16,
                        letterSpacing: 1,
                        fontWeight: '400',
                      }}>
                      Total{' '}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        letterSpacing: 1,
                        fontWeight: '500',
                      }}>
                      {total + total / 20} ₺{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              height: '8%',
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => checkout()}
              style={{
                backgroundColor: colors.blue,
                width: '86%',
                height: '90%',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 16,
                  letterSpacing: 1.5,
                  fontWeight: '500',
                }}>
                CHECKOUT {total + total / 20}₺{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <LottieView
            autoPlay
            source={require('../Assets/Animations/empty.json')}
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              marginTop: 250,
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenName.home)}
            style={{alignItems: 'center', marginTop: 10}}>
            <Text style={{letterSpacing: 0.8, fontSize: 14}}>
              No items in your cart yet.{' '}
              <Text
                style={{
                  letterSpacing: 0.8,
                  color: colors.blue,
                  lineHeight: 15,
                }}>
                Start shopping now!
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default MyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    position: 'relative',
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    paddingTop: 16,
    gap: 100,
  },
  backButton: {
    backgroundColor: colors.backgroundLight,
    padding: 12,
    borderRadius: 12,
  },
  headerText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
    letterSpacing: 1.4,
  },
  myCart: {
    fontSize: 18,
    paddingTop: 20,
    paddingLeft: 8,
    letterSpacing: 1,
    fontWeight: '600',
    color: colors.black,
  },
  locationText: {
    fontSize: 16,
    letterSpacing: 1,
    paddingLeft: 8,
    fontWeight: '500',
    color: colors.black,
    paddingTop: 30,
  },
});
