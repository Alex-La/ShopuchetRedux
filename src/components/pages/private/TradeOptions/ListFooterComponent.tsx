import {Button, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const ListFooterComponent: React.FC = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={styles.wrap} level="2">
        <View style={styles.row}>
          <Text appearance="hint">Сумма:</Text>
          <Text status="primary">5555.00</Text>
        </View>
        <View style={styles.row}>
          <Text appearance="hint">Оплачено:</Text>
          <Text status="primary">5555.00</Text>
        </View>

        <View style={[styles.row, styles.margin]}>
          <Text appearance="hint">Наличными:</Text>
          <Text status="primary">5555.00</Text>
        </View>
        <View style={styles.row}>
          <Text appearance="hint">Безналичными:</Text>
          <Text status="primary">5555.00</Text>
        </View>
        <View style={styles.row}>
          <Text appearance="hint">Бонусами:</Text>
          <Text status="primary">5555.00</Text>
        </View>

        <View style={styles.buttonsWrap}>
          <Button appearance="outline" style={{flex: 1, marginRight: 5}}>
            Отмена
          </Button>
          <Button style={{flex: 1, marginLeft: 5}}>Сохранить</Button>
        </View>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrap: {padding: 16},
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  margin: {marginTop: 16},
  buttonsWrap: {flexDirection: 'row', marginTop: 24},
});

export default ListFooterComponent;
