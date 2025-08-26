/**
 * simple dropdown input interface
 * @author Sky Vercauteren 2025
 */

import React, {Dispatch, SetStateAction, useState} from 'react';
 import styles from './styles';
 import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';

interface DropDownProps {
  placeholder: string;
  items: ItemType<string>[];
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
}

const Dropdown: React.FC<DropDownProps> = ({ placeholder, items, value, setValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
        placeholder={placeholder}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        style={styles.dropdown}
      />
  );
};

export default Dropdown;