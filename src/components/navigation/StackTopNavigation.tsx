import React from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {ImageProps} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

const BackIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="arrow-ios-back-outline" />
);

interface Props extends NativeStackHeaderProps {}

const StackTopNavigation: React.FC<Props> = ({options, navigation}) => {
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigation.goBack} />
  );

  return <TopNavigation accessoryLeft={BackAction} title={options.title} />;
};

export default StackTopNavigation;
