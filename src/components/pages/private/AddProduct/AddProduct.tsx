import {useFocusEffect} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Layout, List, useTheme} from '@ui-kitten/components';
import React, {Fragment, useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../redux';
import {
  clearRemainders,
  getRemainders,
} from '../../../../redux/actions/private/remaindersActions';
import {PrivateStackNavigator} from '../../../../utils/navigation.types';
import FooterLoader from '../../../general/FooterLoader';
import ListItem from '../../../general/ListItem';
import ListHeaderComponent from './ListHeaderComponent';

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator, 'AddProduct'>;
};

const AddProduct: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const currentGTochkaId = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );

  const remainders = useAppSelector(state => state.remainders);
  const details = useAppSelector(state => state.remainders.data.details);
  const loading = useAppSelector(state => state.remainders.loading);

  const [search, setSearch] = useState<string>('');
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(true);

  const loadRemainders = useCallback(
    (loadMore: boolean, page: number, descending: boolean) => {
      if (currentGTochkaId)
        return dispatch(
          getRemainders(
            loadMore,
            currentGTochkaId,
            page,
            descending,
            '',
            search,
            30,
          ),
        );
    },
    [currentGTochkaId, search],
  );

  useFocusEffect(
    useCallback(() => {
      loadRemainders(false, 0, remainders.descending);
      return () => dispatch(clearRemainders());
    }, [loadRemainders]),
  );

  const handleRefresh = () => loadRemainders(false, 0, remainders.descending);

  const handleLoadMore = () => {
    if (isDataLoaded && remainders.data.hasNext) {
      setIsDataLoaded(false);
      loadRemainders(
        true,
        remainders.data.currentPage + 1,
        remainders.descending,
      )
        ?.then(() => setIsDataLoaded(true))
        .catch(() => setIsDataLoaded(true));
    }
  };

  const navToAddProductModal = () => navigation.navigate('AddProductModal');

  const RenderFooter = () => (isDataLoaded ? <Fragment /> : <FooterLoader />);

  return (
    <Layout style={{flex: 1}}>
      <ListHeaderComponent value={search} setValue={setSearch} />
      <List
        refreshing={loading}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.2}
        onEndReached={handleLoadMore}
        ListFooterComponent={RenderFooter}
        style={{
          backgroundColor: theme['background-basic-color-1'],
          paddingVertical: 10,
        }}
        data={details}
        renderItem={props => (
          <ListItem {...props} theme={theme} onPress={navToAddProductModal} />
        )}
      />
    </Layout>
  );
};

export default AddProduct;
