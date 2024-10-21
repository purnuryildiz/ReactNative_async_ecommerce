import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../themes/colors';
import ProductCard from './ProductCard';
import {Items} from '../database/Database';

const Products = () => {
  const [products, setProducts] = useState([]);

  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];

    for (let index = 0; index < Items.length; index++) {
      console.log(Items[index]);
    }
  };
  getDataFromDB();

  return (
    <View style={{flex: 1, padding: 16}}>
      <View style={{flex: 1, padding: 16}}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 0.3,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, letterSpacing: 1}}>Products</Text>
            <Text style={{opacity: 0.5, marginLeft: 10}}>41</Text>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                color: colors.blue,
                fontWeight: '400',
                letterSpacing: 1,
              }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {products.map(product => (
            <ProductCard />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
