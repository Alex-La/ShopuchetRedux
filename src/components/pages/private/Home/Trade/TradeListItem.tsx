import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  Text,
} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {
  ImageProps,
  ListRenderItemInfo,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
} from '../../../../../utils/navigation.types';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const Trash = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="trash-2-outline" />
);

const Edit = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="edit-outline" />
);

interface ListItemProps extends ListRenderItemInfo<number> {
  styles: StyleSheet.NamedStyles<{
    itemWrap: unknown;
    itemBorder: unknown;
    info: unknown;
    summ: unknown;
  }>;
  theme: Record<string, string>;
  navigation: NativeStackNavigationProp<PrivateStackNavigator>;
  type: TradeOptionsTypes;
}

const TradeListItem: React.FC<ListItemProps> = ({
  item,
  index,
  navigation,
  theme,
  type,
  styles,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggle = () => {
    setVisible(true);
    ReactNativeHapticFeedback.trigger('longPress', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true,
    });
  };

  const navToInfo = () => navigation.navigate('TradeOptions', {type});

  const RenderAnchor = useCallback(() => {
    return (
      <View style={styles.itemBorder}>
        <View style={styles.info}>
          <Text category="p2" status="primary">
            Чек №123 в 09:37
          </Text>
          <Text category="label">Губка Фрекен Бок Коричневая</Text>
        </View>
        <View style={styles.summ}>
          <Text category="label">125.00 x 20</Text>
          <Text category="p2" status="primary">
            = 5050
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <Layout key={index} style={styles.itemWrap}>
      <TouchableHighlight
        underlayColor={theme['color-basic-transparent-active']}
        onPress={navToInfo}
        onLongPress={toggle}>
        <OverflowMenu
          anchor={RenderAnchor}
          visible={visible}
          onBackdropPress={() => setVisible(false)}
          backdropStyle={{
            backgroundColor: theme['color-basic-transparent-focus'],
          }}
          placement="top">
          <MenuItem title="Изменить" accessoryLeft={Edit} />
          <MenuItem title="Удалить" accessoryLeft={Trash} />
        </OverflowMenu>
      </TouchableHighlight>
    </Layout>
  );
};

export default TradeListItem;
