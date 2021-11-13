import {Icon, MenuItem, OverflowMenu, Text} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {
  ImageProps,
  ListRenderItemInfo,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {TradeSessionDetail} from '../../redux/types/private/trade.types';

const Trash = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="trash-2-outline" />
);

interface Props extends ListRenderItemInfo<TradeSessionDetail> {
  theme: Record<string, string>;
  disabled?: boolean;
  modal?: boolean;
  onPress?: (detail: TradeSessionDetail) => void;
}

const ListItem: React.FC<Props> = ({
  item,
  index,
  theme,
  disabled,
  modal,
  onPress,
}) => {
  const [visibale, setVisibale] = useState<boolean>(false);

  const toggle = () => {
    setVisibale(true);
    ReactNativeHapticFeedback.trigger('longPress', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true,
    });
  };

  const RenderAnchor = useCallback(() => {
    return (
      <TouchableHighlight
        disabled={disabled}
        onPress={() => onPress && onPress(item)}
        onLongPress={toggle}
        key={index}
        style={styles.wrap}
        underlayColor={theme['color-primary-transparent-200']}>
        <View
          style={[
            styles.item,
            {
              borderColor: theme['color-primary-500'],
            },
          ]}>
          <Text numberOfLines={1} status="primary" style={styles.product}>
            {item.name}
          </Text>
          <Text
            status="primary"
            style={[
              styles.data,
              {
                flex: 1,
                borderLeftColor: theme['color-primary-500'],
              },
            ]}>
            {item.amount} шт.
          </Text>
          <Text
            status="primary"
            style={[
              styles.data,
              {
                flex: 1.2,
                borderLeftColor: theme['color-primary-500'],
              },
            ]}>
            {item.cost?.toFixed(2)}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }, [disabled, onPress]);

  return (
    <OverflowMenu
      anchor={RenderAnchor}
      onBackdropPress={() => setVisibale(false)}
      backdropStyle={{backgroundColor: theme['color-basic-transparent-focus']}}
      visible={modal && visibale}
      placement="bottom end">
      <MenuItem title="Удалить" accessoryLeft={Trash} />
    </OverflowMenu>
  );
};

const styles = StyleSheet.create({
  wrap: {marginVertical: 5, marginHorizontal: 16},
  item: {
    borderWidth: 1,
    flexDirection: 'row',
  },
  product: {flex: 3, padding: 5},
  data: {
    padding: 5,
    borderLeftWidth: 1,
    textAlign: 'center',
  },
});

export default ListItem;
