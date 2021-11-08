import {Layout, List, useTheme} from '@ui-kitten/components';
import React, {useState} from 'react';
import ListItem from '../../../general/ListItem';
import ListHeaderComponent from './ListHeaderComponent';

const AddProduct: React.FC = () => {
  const theme = useTheme();

  const [search, setSearch] = useState<string>('');

  return (
    <Layout style={{flex: 1}}>
      <ListHeaderComponent value={search} setValue={setSearch} />
      <List
        style={{
          backgroundColor: theme['background-basic-color-1'],
          paddingVertical: 10,
        }}
        data={[1, 2, 3]}
        renderItem={props => <ListItem {...props} theme={theme} />}
      />
    </Layout>
  );
};

export default AddProduct;
