import {Layout} from '@ui-kitten/components';
import React from 'react';
import SalesHeader from '../SalesHeader';

const SalesByProducts: React.FC = () => {
  return (
    <Layout style={{flex: 1}}>
      <SalesHeader />
    </Layout>
  );
};

export default SalesByProducts;
