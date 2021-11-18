import {useFocusEffect} from '@react-navigation/core';
import {Layout, List, Text, useTheme} from '@ui-kitten/components';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ListRenderItemInfo,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import usePrevious from '../../../../../../hooks/previous.hook';
import {useAppDispatch, useAppSelector} from '../../../../../../redux';
import {
  getAvgReceipt,
  setReduce,
} from '../../../../../../redux/actions/private/reportsActions';
import {TAB_TYPES} from '../../../../../../redux/types/private/reports.types';
import {convertDate} from '../../../../../../utils';
import {AvgReceipt as TAvgReceipt} from '../../../../../../utils/api.types';
import DateRangeAndSort from '../DateRangeAndSort';

const AvgReceipt: React.FC = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const date = useAppSelector(state => state.reports.date);
  const reduce = useAppSelector(state => state.reports.tabs.avgReceipt.reduce);
  const avgReceipt = useAppSelector(state => state.reports.tabs.avgReceipt);
  const loading = useAppSelector(
    state => state.reports.tabs.avgReceipt.loading,
  );
  const percent =
    100 /
    Math.max.apply(
      null,
      avgReceipt.data.map(item => item.avg),
    );
  const currentGTochkaid = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );
  const prevGTochkaId = usePrevious<number>(currentGTochkaid);
  const prevDatebegin = usePrevious<Date>(date.datebegin);
  const prevDateend = usePrevious<Date>(date.dateend);

  const loadAvgReceipt = useCallback(() => {
    if (currentGTochkaid)
      dispatch(getAvgReceipt(currentGTochkaid, date.datebegin, date.dateend));
  }, [currentGTochkaid, date]);

  useFocusEffect(
    useCallback(() => {
      if (currentGTochkaid) {
        if (
          currentGTochkaid !== prevGTochkaId ||
          date.datebegin !== prevDatebegin ||
          date.dateend !== prevDateend
        )
          loadAvgReceipt();
      }
    }, [currentGTochkaid, prevGTochkaId, date, prevDateend, prevDatebegin]),
  );

  const handleRefresh = () => loadAvgReceipt();
  const handleReduce = () => {
    dispatch(setReduce(!reduce, TAB_TYPES.AVG_RECEIPT));
    loadAvgReceipt();
  };

  const ListHeader = () => (
    <Layout>
      <DateRangeAndSort
        date={date}
        reduce={avgReceipt.reduce}
        setReduce={handleReduce}
      />
    </Layout>
  );

  return (
    <List
      style={{backgroundColor: theme['background-basic-color-1']}}
      refreshing={loading}
      onRefresh={handleRefresh}
      ListHeaderComponent={ListHeader}
      data={avgReceipt.data}
      renderItem={props => (
        <ListItem {...props} theme={theme} percent={percent} />
      )}
    />
  );
};

interface ListItemProps extends ListRenderItemInfo<TAvgReceipt> {
  theme: Record<string, string>;
  percent: number;
}

const ListItem: React.FC<ListItemProps> = ({item, index, theme, percent}) => {
  return (
    <TouchableWithoutFeedback key={index}>
      <View style={{margin: 15}}>
        <Text category="s2">{convertDate(item.date)}</Text>
        <View
          style={[
            styles.chart,
            {
              backgroundColor: theme['color-primary-500'],
              minWidth: 100,
              width: `${item.avg * percent}%`,
            },
          ]}>
          <Text style={styles.text} category="p2">
            {item.avg.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  chart: {
    borderRadius: 2,
    padding: 5,
    marginTop: 8,
    minWidth: 100,
  },
  text: {color: 'white', textAlign: 'center'},
});

export default AvgReceipt;
