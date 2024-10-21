import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../themes/colors';

const HeaderText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Hi-Fi Shop & Service </Text>
      <Text style={styles.text2}>
        Audio shop on Rustaveli Ave 57.
        {'\n'}This shop offers both products and services
      </Text>
    </View>
  );
};

export default HeaderText;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 16,
  },
  text1: {
    fontSize: 26,
    color: colors.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 10,
  },
  text2: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1,
    lineHeights: 24,
  },
});
