import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../themes/colors';
import ProductCard from './ProductCard';
import {Items} from '../database/Database';
import InnerHeader from './InnerHeader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);

  useEffect(() => {
    getDataFromDB();
  }, []);

  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];

    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category === 'product') {
        productList.push(Items[index]);
      } else {
        accessoryList.push(Items[index]);
      }
    }
    setProducts(productList);
    setAccessory(accessoryList);
  };

  return (
    <View style={{flex: 1, padding: 16}}>
      <View>
        <InnerHeader dataName={'Products'} dataCount={'41'} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}>
          {products.map(product => (
            <ProductCard key={product.id} data={product} />
          ))}
        </View>
      </View>

      <View>
        <InnerHeader dataName={'Accessories'} dataCount={'78'} />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          {accessory.map(data => (
            <ProductCard key={data.id} data={data} />
          ))}
        </View>
      </View>
    </View>
  );
};
export default Products;

const styles = StyleSheet.create({});

//Ürünlerimizi bir state içerisinde tutalım ve sayfa yüklenildiği  anda bunlara useEffect isteiği atalım ve verilerimiz alalım
