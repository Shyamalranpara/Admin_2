import React from 'react';
import { Flex, Radio } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

const options: CheckboxGroupProps<string>['options'] = [
  {
    label: (
      <span
        className='btn-tfh py-[5px] px-[16px] text-[14px] w-full rounded-0 cursor-pointer'
        
      >
        TFH 1
      </span>
    ),
    value: 'TFH 1'
  },
  {
    label: (
      <span className='btn-tfh py-[5px] px-[16px] text-[14px] rounded-0 cursor-pointer'>
        TFH 2
      </span>
    ),
    value: 'TFH 2'
  },
];

const RadioBtn: React.FC = () => (
  <Flex vertical gap="middle">
    <Radio.Group
      options={options}
      defaultValue="TFH 1"
      optionType="button"
      buttonStyle="solid"
    />
  </Flex>
);

export default RadioBtn;
