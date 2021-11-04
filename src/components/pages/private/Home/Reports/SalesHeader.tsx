import {Divider, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DateRange} from '../../../../../utils';
import DateRangeAndSort from './DateRangeAndSort';

type Props = {
  date: DateRange;
  reduce: boolean;
  setReduce: () => void;
};

const SalesHeader: React.FC<Props> = ({date, reduce, setReduce}) => {
  return (
    <View>
      <DateRangeAndSort date={date} reduce={reduce} setReduce={setReduce} />
      <View style={styles.wrap}>
        <View style={styles.item}>
          <Text>Всего продаж:</Text>
          <Text status="primary">5</Text>
        </View>
        <View style={[styles.item, {marginTop: 8}]}>
          <Text>На сумму:</Text>
          <Text status="primary">29750.00</Text>
        </View>
        <View style={[styles.item, {marginTop: 8}]}>
          <Text>Прибыль:</Text>
          <Text status="primary">12345.00</Text>
        </View>
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: 16, paddingBottom: 16},
  item: {flexDirection: 'row', justifyContent: 'space-between'},
});

export default SalesHeader;
