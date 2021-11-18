import {IndexPath, Select, SelectItem, Text} from '@ui-kitten/components';
import React from 'react';
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
              <View style={styles.cnt}>
                <Text category="c2" style={styles.text}>
                  {item.cnt}
                </Text>
              </View>
              <View style={styles.income}>
                <Text category="c2" style={styles.text}>
                  {item.income.toFixed(2)}
                </Text>
              </View>
            </View>
            <Text category="c2" style={{marginTop: 6}} appearance="hint">
              {convertDate(item.date)}
            </Text>
            <Text category="c2" style={{marginTop: 7, color: '#0066FF'}}>
              {item.cnt}
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
    height: 100,
    transform: [{rotate: '-90deg'}],
    justifyContent: 'center',
  },
  cnt: {backgroundColor: '#0066FF', borderRadius: 2, paddingVertical: 5},
  income: {
    backgroundColor: '#5E9CFA',
    marginTop: 6,
    borderRadius: 2,
    paddingVertical: 5,
  },
  text: {color: 'white', textAlign: 'center'},
});

export default MainGraph;
