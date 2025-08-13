import { Layout, Menu } from 'antd';
import JBLOGO from '../assets/LOGO.png';
import Frame from '../assets/Frame.png';
import Group from '../assets/Group.png';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link to="/dashboard">
      <span className="text-black mt-5">Dashboard</span>
    </Link>,
    '1',
    <img className="w-[18px] h-[18px]" src={Frame} alt="Framelogo" />
  ),
  getItem(
    <span style={{ color: '#408634' }}>Report</span>,
    'sub1',
    <img className="w-[15px] h-[18px] mr-1" src={Group} alt="Grouplogo" />,
    [
      getItem(
        <Link to="/admin">
          <span className="text-[#408634]">Thermopack Report</span>
        </Link>,
        '3'
      ),
    ]
  ),
];

const Sidebar = () => {
  return (
    <Sider
      className="hidden md:block bg-[#E6F6FF]"
      style={{ backgroundColor: '#E6F6FF', height: 'auto' }}
      width={280}
      breakpoint="md"
      collapsedWidth="0"
    >
      <div className="flex items-center justify-center">
        <img
          className="w-[160px] h-[40px] mt-[20px]"
          src={JBLOGO}
          alt="logo"
        />
      </div>
      <Menu
        className="w-[100%] h-[100%] mt-[25px]"
        style={{ backgroundColor: '#E6F6FF' }}
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
