import React, {Fragment} from 'react';
import {Divider, Icon, List, ListItem} from '@ui-kitten/components';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PrivateStackNavigator} from '../../../../utils/navigation.types';

import {useAppDispatch, useAppSelector} from '../../../../redux';
import {ImageProps, ViewProps} from 'react-native';
import {TradePoint as TTradePoint} from '../../../../utils/api.types';
import {setTradePoint} from '../../../../redux/actions/private/mainActions';

const CartIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="shopping-cart-outline" />
);

const CheckIcon = (props?: Partial<ViewProps>) => (
  <Icon {...props} name="checkmark-outline" />
);

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator, 'TradePoint'>;
};

const TradePoint: React.FC<Props> = ({navigation}) => {
  const currentTradePoint = useAppSelector(state => state.main.tradePoint);
  const tradePoints = useAppSelector(state => state.main.tradePoints);

  const dispatch = useAppDispatch();

  const setCurentTradePoint = (tradePoint: TTradePoint) => {
    dispatch(setTradePoint(tradePoint));
    navigation.goBack();
  };

  return (
    <List
      data={tradePoints}
      ItemSeparatorComponent={Divider}
      renderItem={({index, item}) => (
        <ListItem
          key={index}
          title={item.name}
          accessoryLeft={CartIcon}
          accessoryRight={
            currentTradePoint ? (
              currentTradePoint.gTochkaId === item.gTochkaId ? (
                CheckIcon
              ) : (
                <Fragment />
              )
            ) : undefined
          }
          onPress={() => setCurentTradePoint(item)}
        />
      )}
    />
  );
};

export default TradePoint;
