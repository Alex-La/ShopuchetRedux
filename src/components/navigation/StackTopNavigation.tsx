import React from 'react';
import {Divider, Icon, Layout, Text, useTheme} from '@ui-kitten/components';
import {ImageProps, StyleSheet, TouchableOpacity, View} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

interface Props extends NativeStackHeaderProps {}

const StackTopNavigation: React.FC<Props> = ({options, navigation}) => {
  const theme = useTheme();

  const BackIcon = (props?: Partial<ImageProps>) => (
    <Icon
      {...props}
      name="arrow-ios-back-outline"
      fill={theme['text-basic-color']}
    />
  );

  return (
    <>
      <Layout style={styles.wrap}>
        <TouchableOpacity onPress={navigation.goBack}>
          <BackIcon width={25} height={25} />
        </TouchableOpacity>
        <View style={{marginLeft: 16}}>
          <Text category="s1">{options.title}</Text>
          {/* {name !== 'Profile' && name !== 'Friends' && subtitle && (
            <Text category="label" appearance="hint">
              {subtitle}
            </Text>
          )} */}
        </View>
      </Layout>
      <Divider />
    </>
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
