import {
  Datepicker,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';

const ListHeaderComponent: React.FC = () => {
  const styles = useStyleSheet(Styles);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={styles.wrap} level="2">
        <View style={styles.itemWrap}>
          <Text appearance="hint" category="label">
            Дата:
          </Text>
          <Datepicker controlStyle={styles.datepicker} />
        </View>
        <View style={styles.itemWrap}>
          <Text appearance="hint" category="label">
            Скидка в %
          </Text>
          <Input
            style={{backgroundColor: 'transparent', borderWidth: 0}}
            selectTextOnFocus
            keyboardType="decimal-pad"
            textStyle={styles.percentage}
          />
        </View>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const Styles = StyleService.create({
  wrap: {padding: 16, flexDirection: 'row'},
  itemWrap: {
    flex: 1,
    alignItems: 'center',
    borderBottomColor: 'color-primary-500',
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  datepicker: {borderWidth: 0, backgroundColor: 'transparent'},
  percentage: {textAlign: 'center', color: 'color-primary-500'},
});

export default ListHeaderComponent;
