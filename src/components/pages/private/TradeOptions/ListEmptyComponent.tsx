import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Box from '../../../icons/Box';

const ListEmptyComponent: React.FC = () => {
  return (
    <TouchableOpacity style={styles.wrap}>
      <Layout style={styles.box}>
        <Box />
        <Text category="h4" status="primary">
          Добавьте товар
        </Text>
      </Layout>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1},
  box: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default ListEmptyComponent;
