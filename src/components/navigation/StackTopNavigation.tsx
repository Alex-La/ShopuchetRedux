import React from 'react';
import {Divider, Icon, Layout, Text, useTheme} from '@ui-kitten/components';
import {
  ImageProps,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/core';
import {PrivateStackNavigator} from '../../utils/navigation.types';
import {useAppSelector} from '../../redux';

interface Props extends NativeStackHeaderProps {}

const StackTopNavigation: React.FC<Props> = ({options, navigation, route}) => {
  const name = (route as RouteProp<PrivateStackNavigator>).name;

  const theme = useTheme();
  const subtitle = useAppSelector(state => state.main.tradePoint?.name);

  const BackIcon = (props?: Partial<ImageProps>) => (
    <Icon
      {...props}
      name="arrow-ios-back-outline"
      fill={theme['text-basic-color']}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <Layout style={styles.wrap}>
          <TouchableOpacity onPress={navigation.goBack}>
            <BackIcon width={25} height={25} />
          </TouchableOpacity>
          <View style={{marginLeft: 16}}>
            <Text category="s1">{options.title}</Text>
            {name !== 'TradePoint' && (
              <Text category="label" appearance="hint">
                {subtitle}
              </Text>
            )}
          </View>
        </Layout>
        <Divider />
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
});

export default StackTopNavigation;
