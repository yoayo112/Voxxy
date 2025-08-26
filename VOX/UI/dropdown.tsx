/**
 * simple dropdown input interface
 * @author Sky Vercauteren 2025
 */

import React, {useState} from 'react';
import {
    Text,  
    TouchableOpacity,
 } from 'react-native';
 import styles from './styles';
 import DropDownPicker from 'react-native-dropdown-picker';
 import { pitchFrequencies } from '../API';

interface ItemType {
  label: string;
  value: string;
}
const pitchItems: ItemType[] = Object.keys(pitchFrequencies).map(key => ({
  label: key,
  value: key,
}));

interface DropDownProps {
  placeholder: string;
}

const Dropdown: React.FC<DropDownProps> = ({placeholder}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState<ItemType[]>(pitchItems);

  return (
    <DropDownPicker
      placeholder={placeholder}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={styles.dropdown}
    />
  );
};

export default Dropdown;