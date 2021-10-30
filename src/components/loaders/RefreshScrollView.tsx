import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';

type Props = {
  refreshing: boolean;
  onRefresh?: () => void;
};

const RefreshScrollView: React.FC<Props> = ({
  children,
  refreshing,
  onRefresh,
}) => {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme['color-primary-500']]}
        />
      }>
      {children}
    </ScrollView>
  );
};

export default RefreshScrollView;
