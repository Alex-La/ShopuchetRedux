import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Button, Divider, Layout, List, ListItem} from '@ui-kitten/components';

import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {loadFriends} from '../../../../../redux/actions/private/friendActions';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PrivateStackNavigator} from '../../../../../utils/navigation.types';

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator>;
};

const Friends: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.fetch.loading);
  const friends = useAppSelector(state => state.friends);

  useEffect(() => {
    dispatch(loadFriends());
  }, []);

  const onRefresh = () => dispatch(loadFriends());

  const navToModal = () => navigation.navigate('AddFriendModal');

  return (
    <Layout style={{flex: 1}}>
      <List
        refreshing={loading}
        onRefresh={onRefresh}
        ItemSeparatorComponent={Divider}
        data={friends}
        renderItem={({item, index}) => (
          <ListItem
            key={index}
            title={item.login}
            description={item.nameGTochka}
            disabled
          />
        )}
      />
      <Divider />
      <View style={{paddingVertical: 18, paddingHorizontal: 27}}>
        <Button onPress={navToModal}>Добавить</Button>
      </View>
    </Layout>
  );
};

export default Friends;
