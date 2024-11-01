import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../themes/colors';

const InnerHeader = ({dataName, dataCount}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 0.4,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, letterSpacing: 1, fontWeight: '500'}}>
          {dataName}
        </Text>
        <Text style={{opacity: 0.5, marginLeft: 10}}>{dataCount} </Text>
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
  );
};

export default InnerHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
