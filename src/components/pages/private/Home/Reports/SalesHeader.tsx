import {Divider, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DateRange} from '../../../../../utils';
import {
  SalesGroupsHead,
  SalesMonthHead,
  SalesProductsHead,
} from '../../../../../utils/api.types';
import DateRangeAndSort from './DateRangeAndSort';

type Head = SalesProductsHead | SalesGroupsHead | SalesMonthHead;

type Props = {
  date: DateRange;
  reduce: boolean;
  setReduce: () => void;
  head: Head;
};

const SalesHeader: React.FC<Props> = ({date, reduce, setReduce, head}) => {
  return (
    <Layout>
      <DateRangeAndSort date={date} reduce={reduce} setReduce={setReduce} />
      <View style={styles.wrap}>
        <View style={styles.item}>
          <Text>Всего продаж:</Text>
          <Text status="primary">{head.cnt}</Text>
        </View>
        <View style={[styles.item, {marginTop: 8}]}>
          <Text>На сумму:</Text>
          <Text status="primary">{head.summ}</Text>
        </View>
        <View style={[styles.item, {marginTop: 8}]}>
          <Text>Прибыль:</Text>
          <Text status="primary">{head.income}</Text>
        </View>
      </View>
      <Divider />
      <View style={styles.tableHead}>
        <Text appearance="hint" style={{flex: 2}}>
          Кол-во
        </Text>
        <Text appearance="hint" style={{flex: 1, textAlign: 'right'}}>
          Сумма
        </Text>
        <Text appearance="hint" style={{flex: 1, textAlign: 'right'}}>
          Прибыль
        </Text>
      </View>
      <Divider />
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: 16, paddingBottom: 16},
  item: {flexDirection: 'row', justifyContent: 'space-between'},
  tableHead: {paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row'},
});

export default SalesHeader;
