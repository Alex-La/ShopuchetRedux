import {IndexPath, Select, SelectItem, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../../../../redux';
import {convertDate} from '../../../../../utils';
import {DateSelect} from './Main';

type Props = {
  displayValue: DateSelect;
  selectedIndex: IndexPath;
  setSelectedIndex: React.Dispatch<React.SetStateAction<IndexPath>>;
  data: DateSelect[];
};

const MainGraph: React.FC<Props> = ({
  displayValue,
  selectedIndex,
  setSelectedIndex,
  data,
}) => {
  const mainGraph = useAppSelector(state => state.main.mainGraph);
  const [sumPercent, setSumPercent] = useState<number>(0);
  const [incomePercent, setIncomPercent] = useState<number>(0);

  useEffect(() => {
    setSumPercent(
      (100 /
        Math.max.apply(
          null,
          mainGraph.map(item => item.summ),
        )) *
        1.8,
    );
    setIncomPercent(
      (100 /
        Math.max.apply(
          null,
          mainGraph.map(item => item.income),
        )) *
        1.8,
    );
  }, [mainGraph]);

  const renderOption = (data: DateSelect, index: number) => (
    <SelectItem title={data.name} key={index} />
  );

  return (
    <View style={styles.wrap}>
      <View style={styles.select}>
        <Select
          style={{flex: 1.2}}
          placeholder="Дата"
          value={displayValue.name}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index as IndexPath)}>
          {data.map(renderOption)}
        </Select>
        <View style={{flex: 2, alignItems: 'flex-end'}}>
          <Text appearance="hint">
            {convertDate(displayValue.date.datebegin, false) +
              ' - ' +
              convertDate(displayValue.date.dateend, false)}
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        <View
          style={{
            ...styles.dot,
            backgroundColor: '#0066FF',
          }}
        />
        <Text category="c1">Продажи</Text>
        <View
          style={{
            ...styles.dot,
            backgroundColor: '#96C0FF',
            marginLeft: 16,
          }}
        />
        <Text category="c1">Прибыль</Text>
      </View>

      <ScrollView horizontal style={{marginTop: 25}}>
        {mainGraph.map((item, index) => (
          <View style={{alignItems: 'center'}} key={index}>
            <View style={styles.graph}>
              <View style={[styles.cnt, {width: item.summ * sumPercent}]}>
                <Text category="label" style={styles.text}>
                  {item.summ?.toFixed(2)}
                </Text>
              </View>
              <View
                style={[styles.income, {width: item.income * incomePercent}]}>
                <Text category="label" style={styles.text}>
                  {item.income.toFixed(2)}
                </Text>
              </View>
            </View>
            <Text category="c2" style={{marginTop: 6}} appearance="hint">
              {convertDate(item.date)}
            </Text>
            <Text category="c2" style={{marginTop: 7, color: '#0066FF'}}>
              {item.summ?.toFixed(2)}
            </Text>
            <Text category="c2" style={{color: '#5E9CFA'}}>
              {item.income.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingVertical: 16},
  select: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16},
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  dot: {width: 8, height: 8, borderRadius: 8, marginRight: 4},
  graph: {
    width: 100,
    height: 180,
    transform: [{rotate: '-90deg'}],
    justifyContent: 'center',
  },
  cnt: {
    backgroundColor: '#0066FF',
    borderRadius: 2,
    paddingVertical: 5,
    minWidth: 70,
    transform: [{translateX: -40}],
  },
  income: {
    backgroundColor: '#5E9CFA',
    marginTop: 6,
    borderRadius: 2,
    paddingVertical: 5,
    minWidth: 70,
    transform: [{translateX: -40}],
  },
  text: {color: 'white', textAlign: 'center'},
});

export default MainGraph;
