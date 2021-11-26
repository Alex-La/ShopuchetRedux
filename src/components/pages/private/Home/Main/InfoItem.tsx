import {Divider, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MainDataObject} from '../../../../../utils/api.types';

type Props = {
  title: string;
  info: MainDataObject;
};

const InfoItem: React.FC<Props> = ({title, info}) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title} status="primary">
        {title}
      </Text>
      <View style={{...styles.row, marginTop: 8}}>
        <Text>Продаж:</Text>
        <Text status="primary">{info.cnt}</Text>
      </View>
      <View style={{...styles.row, marginTop: 12}}>
        <Text>На сумму:</Text>
        <Text status="primary">{info.summ.toFixed(2)}</Text>
      </View>
      <View style={{...styles.row, marginTop: 12}}>
        <Text>Прибыль:</Text>
        <Text status="primary">{info.income.toFixed(2)}</Text>
      </View>
      <View style={{...styles.row, marginTop: 12}}>
        <Text>Средний чек:</Text>
        <Text status="primary">{info.avg.toFixed(2)}</Text>
      </View>
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
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
