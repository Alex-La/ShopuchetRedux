import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {even} from '../../../../../utils';
import {Remainder} from '../../../../../utils/api.types';

const ListItem: React.FC<ListRenderItemInfo<Remainder>> = ({index, item}) => {
  return (
    <Layout
      key={index}
      style={styles.tableHead}
      level={even(index) ? '2' : '1'}>
      <View style={[styles.item]}>
        <Text numberOfLines={1}>{item.groupName}</Text>
        <Text category="label" appearance="hint" numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text category="label">{item.amount}</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  tableHead: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {flex: 3},
  remainder: {flex: 1, textAlign: 'right'},
});

export default ListItem;
