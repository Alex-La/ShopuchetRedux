import {Text} from '@ui-kitten/components';
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Sort from '../../../../icons/Sort';

const DateRangeAndSort: React.FC = () => {
  return (
    <View style={styles.wrap}>
      <Text appearance="hint">14 сен. - 14 окт.</Text>
      <TouchableOpacity>
        <Sort def />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DateRangeAndSort;
