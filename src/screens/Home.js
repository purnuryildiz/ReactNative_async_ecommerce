import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import {colors} from '../themes/colors';
import HeaderText from '../components/HeaderText';
import Products from '../components/Products';

const Home = () => {
  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <HeaderText />
        <Products />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
