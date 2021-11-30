import {IndexPath, Select, SelectItem, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Grid, LineChart, YAxis} from 'react-native-svg-charts';
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

  const data1 = mainGraph.map(graph => graph.income);
  const data2 = mainGraph.map(graph => graph.summ);

  const dataArray = [
    {
      data: data1,
      svg: {stroke: '#0066FF'},
    },
    {
      data: data2,
      svg: {stroke: '#96C0FF'},
    },
  ];

  const axesSvg = {fontSize: 10, fill: 'grey'};

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
          <Text category="p2" appearance="hint">
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
        <Text category="label">Продажи</Text>
        <View
          style={{
            ...styles.dot,
            backgroundColor: '#96C0FF',
            marginLeft: 16,
          }}
        />
        <Text category="label">Прибыль</Text>
      </View>

      <View style={{height: 250, padding: 20, flexDirection: 'row'}}>
        <YAxis data={data2} svg={axesSvg} />
        <View style={{flex: 1, marginLeft: 10}}>
          <LineChart style={{flex: 1}} data={dataArray}>
            <Grid />
          </LineChart>
        </View>
      </View>
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
