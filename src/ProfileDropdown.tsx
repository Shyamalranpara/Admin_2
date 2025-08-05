import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Avatar} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './ProfileDropdown.css';

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
      <div className="profile-dropdown" onClick={() => setOpen(!open)}>
        <Avatar
          src="https://randomuser.me/api/portraits/men/32.jpg"
          size={40}
        />
        <div className="profile-info">
          <div className="profile-name">Rohan Patel</div>
          <div className="profile-role">Employee</div>
        </div>
        <DownOutlined
          className={`dropdown-arrow ${open ? 'rotated' : ''}`}
        />
      </div>
    </Dropdown>
  );
};

export default ProfileDropdown;
