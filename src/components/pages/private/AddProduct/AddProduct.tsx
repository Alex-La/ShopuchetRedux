import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Layout, List, useTheme} from '@ui-kitten/components';
import React, {useState} from 'react';
import {PrivateStackNavigator} from '../../../../utils/navigation.types';
import ListItem from '../../../general/ListItem';
import ListHeaderComponent from './ListHeaderComponent';

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator, 'AddProduct'>;
};

const AddProduct: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();

  const [search, setSearch] = useState<string>('');

  const navToAddProductModal = () => navigation.navigate('AddProductModal');

  return (
    <Layout style={{flex: 1}}>
      <ListHeaderComponent value={search} setValue={setSearch} />
      <List
        style={{
          backgroundColor: theme['background-basic-color-1'],
          paddingVertical: 10,
        }}
        data={[1, 2, 3]}
        renderItem={props => (
          <ListItem {...props} theme={theme} onPress={navToAddProductModal} />
        )}
      />
    </Layout>
  );
};

export default AddProduct;
