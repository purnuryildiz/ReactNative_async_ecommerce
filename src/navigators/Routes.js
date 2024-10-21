import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenName from '../constants/ScreenName';
import MyCart from '../screens/MyCart';
import Home from '../screens/Home';
import ProductInfo from '../screens/ProductInfo';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ScreenName.home} component={Home} />
      <Stack.Screen name={ScreenName.myCart} component={MyCart} />
      <Stack.Screen name={ScreenName.productInfo} component={ProductInfo} />
    </Stack.Navigator>
  );
}
export default Routes;
