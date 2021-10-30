import {Divider, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import RefreshScrollView from '../../../../loaders/RefreshScrollView';
import InfoItem from './InfoItem';

const Main: React.FC = () => {
  return (
    <Layout style={styles.wrap}>
      <RefreshScrollView refreshing={false} onRefresh={() => {}}>
        <View style={styles.row}>
          <Text category="h6" status="primary">
            В кассе на сегодня:
          </Text>
          <Text category="h6" status="primary">
            69509.05
          </Text>
        </View>
        <Divider style={{marginTop: 16}} />

        <InfoItem title="Сегодня" />
        <InfoItem title="За последние 7 дней" />
        <InfoItem title="За последние 30 дней" />
      </RefreshScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Main;
