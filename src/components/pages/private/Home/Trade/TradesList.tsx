import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  List,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React from 'react';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
} from '../../../../../utils/navigation.types';
import TradeListItem from './TradeListItem';

type Props = {
  ListHeaderComponent: React.ReactElement;
  navigation: NativeStackNavigationProp<PrivateStackNavigator>;
  type: TradeOptionsTypes;
};

const TradesList: React.FC<Props> = ({
  ListHeaderComponent,
  navigation,
  type,
}) => {
  const theme = useTheme();
  const styles = useStyleSheet(Styles);

  return (
    <List
      style={{backgroundColor: theme['background-basic-color-1']}}
      ListHeaderComponent={ListHeaderComponent}
      data={[0, 1]}
      renderItem={props => (
        <TradeListItem
          {...props}
          styles={styles}
          theme={theme}
          navigation={navigation}
          type={type}
        />
      )}
    />
  );
};

const Styles = StyleService.create({
  itemWrap: {
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  itemBorder: {
    flexDirection: 'row',
    borderWidth: 0.3,
    borderColor: 'color-basic-500',
  },
  info: {
    padding: 10,
    flex: 3,
    justifyContent: 'center',
    borderRightWidth: 0.3,
    borderRightColor: 'color-basic-500',
  },
  summ: {
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TradesList;
