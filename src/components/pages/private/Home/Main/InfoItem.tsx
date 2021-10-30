import {Divider, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  title: string;
};

const InfoItem: React.FC<Props> = ({title}) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title} status="primary" category="s1">
        {title}
      </Text>
      <View style={{...styles.row, marginTop: 8}}>
        <Text>Продаж:</Text>
        <Text status="primary">12</Text>
      </View>
      <View style={{...styles.row, marginTop: 12}}>
        <Text>На сумму:</Text>
        <Text status="primary">75420.00</Text>
      </View>
      <View style={{...styles.row, marginTop: 12}}>
        <Text>Прибыль:</Text>
        <Text status="primary">27654.00</Text>
      </View>
      <View style={{...styles.row, marginTop: 12}}>
        <Text>Средний чек:</Text>
        <Text status="primary">6270.00</Text>
      </View>
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: 8,
  },
  title: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: 28,
  },
});

export default InfoItem;
