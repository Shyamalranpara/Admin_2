import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Avatar} from 'antd';
import { DownOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <a href="#">My Profile</a>,
  },
  {
    key: '2',
    label: <a href="#">Settings</a>,
  },
  {
    key: '3',
    label: <a href="#">Logout</a>,
  },
];

const ProfileDropdown: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-[6px] transition duration-300 ease-in-out hover:bg-gray-100" onClick={() => setOpen(!open)}>
        <Avatar
          src="https://randomuser.me/api/portraits/men/32.jpg"
          size={40}
        />
        <div className="flex flex-col leading-[1.2] items-start">
          <div className="font-semibold text-[14px]">Rohan Patel</div>
          <div className="text-[12px] text-[#888]">Employee</div>
        </div>
        <DownOutlined
  className={`ml-5 transition-transform duration-300 ease-in-out ${open ? 'rotate-180' : ''}`}
/>

      </div>
    </Dropdown>
  );
};

export default ProfileDropdown;
