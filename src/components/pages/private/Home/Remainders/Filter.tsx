import {Icon, Input, Text, Tooltip, Button} from '@ui-kitten/components';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

type Props = {
  cnt: string;
  setCnt: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

const Filter: React.FC<Props> = ({cnt, setCnt, filter, setFilter}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggle = () => setVisible(!visible);

  return (
    <View style={{padding: 16}}>
      <Text style={{textAlign: 'center'}}>Фильтр</Text>
      <Input
        value={cnt}
        onChangeText={setCnt}
        keyboardType="number-pad"
        selectTextOnFocus
        style={{marginTop: 8}}
        placeholder="Остаток"
        accessoryRight={props => (
          <Tooltip
            placement={'bottom end'}
            anchor={() => (
              <TouchableOpacity onPress={toggle}>
                <Icon {...props} name="info-outline" />
              </TouchableOpacity>
            )}
            visible={visible}
            onBackdropPress={() => setVisible(false)}>
            Показать товары с остатком меньше указанного
          </Tooltip>
        )}
      />
      <Input
        value={filter}
        onChangeText={setFilter}
        selectTextOnFocus
        style={{marginTop: 16}}
        placeholder="Товар"
      />
      <Button disabled={false} onPress={() => {}} style={{marginTop: 16}}>
        Поиск
      </Button>
    </View>
  );
};

export default Filter;
