import React, { useState } from 'react';
import styles from './CustomDropdown.module.css';
import { DropdownArrow } from '../../VisibilityIcons';

interface Option {
  value: string;
  label: string;
  icon: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const CustomDropdown = ({ options, value, onChange }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={styles.dropdown}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        <img src={selectedOption?.icon} alt={selectedOption?.label} />
        <DropdownArrow />
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option)}>
              <img src={option.icon} alt={option.label} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
