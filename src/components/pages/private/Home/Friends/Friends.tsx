import {Divider, List, ListItem} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {loadFriends} from '../../../../../redux/actions/private/friendActions';

const Friends: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.fetch.loading);
  const friends = useAppSelector(state => state.friends);

  useEffect(() => {
    dispatch(loadFriends());
  }, []);

  const onRefresh = () => dispatch(loadFriends());

  return (
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
  );
};

export default Friends;
