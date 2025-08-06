import React, { useState } from 'react';
import './Admin.css'
import JBLOGO from './assets/LOGO.png'
import { Divider } from 'antd';
import { DatePicker } from 'antd';
import Cards from './Cards'
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Row, Col } from 'antd';
import ProfileDropdown from './ProfileDropdown';
import TableComponent from './TableComponent';
import ShiftCard from './ShiftCard';
import PopupModel from './PopupModel';
import PopupModelShiftCard from './PopupModelShiftCard';

const { Header, Content, Sider } = Layout;


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
    getItem('Dashboard', '2', <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.39578 0H1.0208C0.4579 0 0 0.4579 0 1.0208V3.64579C0 4.20879 0.4579 4.66669 1.0208 4.66669H5.39578C5.95879 4.66669 6.41669 4.20879 6.41669 3.64579V1.0208C6.41669 0.4579 5.95879 0 5.39578 0Z" fill="black" />
        <path d="M5.39578 5.83332H1.0208C0.4579 5.83332 0 6.29122 0 6.85422V12.9792C0 13.5421 0.4579 14 1.0208 14H5.39578C5.95879 14 6.41669 13.5421 6.41669 12.9792V6.85422C6.41669 6.29122 5.95879 5.83332 5.39578 5.83332Z" fill="black" />
        <path d="M12.9792 9.33331H8.60421C8.04121 9.33331 7.58331 9.79121 7.58331 10.3542V12.9792C7.58331 13.5421 8.04121 14 8.60421 14H12.9792C13.5421 14 14 13.5421 14 12.9792V10.3542C14 9.79121 13.5421 9.33331 12.9792 9.33331Z" fill="black" />
        <path d="M12.9792 0H8.60421C8.04121 0 7.58331 0.4579 7.58331 1.0208V7.14578C7.58331 7.70878 8.04121 8.16668 8.60421 8.16668H12.9792C13.5421 8.16668 14 7.70878 14 7.14578V1.0208C14 0.4579 13.5421 0 12.9792 0Z" fill="black" />
    </svg>
    ),
    getItem(<span style={{ color: '#408634' }}>Report</span>, 'sub1', <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.3828 4.65247H13.7675C12.2462 3.13097 11.6378 2.51925 11.3828 2.26774V4.65247Z" fill="#408634" />
        <path d="M10.5625 5.06259C10.5625 5.2891 10.7461 5.47274 10.9727 5.47274H14.0078C14.0081 7.35863 14.0078 15.0724 14.0078 15.1798C14.0078 15.6321 13.6398 16 13.1875 16.0001H4.82031C4.368 16.0001 4 15.6321 4 15.1798V2.8204C4.00013 2.3682 4.36808 2.00009 4.82031 2.00009C8.44221 2.00009 9.94101 1.99989 10.5625 2.00009V5.06259ZM5.63672 14.4298C5.50093 14.4298 5.39064 14.5401 5.39062 14.6759C5.39062 14.8117 5.50092 14.922 5.63672 14.922H12.5215C12.6571 14.9217 12.7666 14.8115 12.7666 14.6759C12.7666 14.5402 12.6571 14.43 12.5215 14.4298H5.63672ZM5.63672 12.8751C5.50101 12.8751 5.39077 12.9845 5.39062 13.1202C5.39062 13.256 5.50092 13.3663 5.63672 13.3663H12.5215C12.6571 13.3661 12.7666 13.2559 12.7666 13.1202C12.7665 12.9847 12.657 12.8753 12.5215 12.8751H5.63672Z" fill="#408634" />
    </svg>
        , [
            getItem(<span style={{ color: '#408634' }}>Thermopack Report</span>, '3'),
            // getItem('Bill', '4'),
            // getItem('Alex', '5'),
        ]),

];




const Admin: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalLabel, setModalLabel] = useState('');
    const [currentSetter, setCurrentSetter] = useState<(value: string) => void>(() => () => { });
    const [chipsProduction, setChipsProduction] = useState('00');
    const [coalConsumption, setCoalConsumption] = useState('00');

    const openModal = (title: string, label: string, setter: (value: string) => void) => {
        setModalTitle(title);
        setModalLabel(label);
        setCurrentSetter(() => setter); 
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (value: string) => {
        currentSetter(value); 
        closeModal();
    };


    // shiftcard 

//    const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitletwo, setModalTitletwo] = useState('');
  const [modalLabeltwo, setModalLabeltwo] = useState('');
  const [modalSetter, setModalSetter] = useState<(value: string) => void>(() => () => {});

  const [shift1, setShift1] = useState('');
  const [shift2, setShift2] = useState('');
  const [levelShift1, setLevelShift1] = useState('');
  const [levelShift2, setLevelShift2] = useState('');

 const openModaltwo = (
    title: string,
    label: string,
    setter: (value: string) => void
  ) => {
    setModalTitle(title);
    setModalLabel(label);
    setModalSetter(() => setter);
    setIsModalOpen(true);
  };
 const closeModaltwo = () => {
    setIsModalOpen(false);
  };

  const handleSubmittwo = (value: string) => {
    modalSetter(value);
    closeModal();
  };


//   shiftcard 
    const {
        token: { colorBgContainer, },
    } = theme.useToken();

    return (
        <div className='admin-container'>

            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    style={{ backgroundColor: "#E6F6FF", height: "265vh", }}
                    width={280}
                >
                    <div className="demo-logo-vertical" />
                    <div className='logo-container'>
                        <img className='jb-logo' src={JBLOGO} alt="logo" />
                    </div>
                    <Menu className='menu' style={{ backgroundColor: "#E6F6FF" }} defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout>

                    <Header style={{ background: colorBgContainer, height: "18vh", lineHeight: "1.1" }}>
                        <div className='header-container'>
                            <div>
                                <h3 className='header-title'>JB rPET Industries Private Limited</h3>
                            </div>
                            <div className='profile-dropdown-container'>
                                <ProfileDropdown />
                            </div>

                        </div>

                        <Divider />

                        <div>
                            <p>Report / Thermopack Report</p>
                        </div>


                    </Header>


                    <Content style={{ margin: '0 16px' }}>
                        <div className='breadcrumb-container'>
                            <div>
                                <Breadcrumb style={{ margin: '16px 0', fontSize: "20px" }} items={[{ title: 'Thermopack Report' }]} />
                            </div>

                            <div className='date-picker-container'>
                                <DatePicker />
                                <div>
                                    <button className='btn-tfh'>TFH 1</button>
                                    <button className='btn-tfh-2'>TFH 2</button>
                                </div>
                            </div>

                        </div>

                        <div
                            style={{
                                padding: 10,
                                minHeight: 360,
                                //   background: colorBgContainer,
                                //   borderRadius: borderRadiusLG,
                            }}
                        >

                            <div className="expansion-tank-container">
      {/* Section 1 - Temperature */}
      <div className="content-container-main">
        <p className="section-title">EXPANSION TANK TEMPERATURE (IN °C)</p>
        <div className="shift-cards-row">
          <div className="shift-card-col">
            <ShiftCard
              title={<span style={{ fontSize: '14px', lineHeight: '22px' }}>SHIFT 1</span>}
              value={shift1}
              onAddClick={() =>
                openModaltwo(
                  'Add Expansion Tank Temperature (IN °C)',
                  'SHIFT 1',
                  setShift1
                )
              }
            />
          </div>
          <div className="shift-card-col">
            <ShiftCard
              title={<span style={{ fontSize: '14px', lineHeight: '22px' }}>SHIFT 2</span>}
              value={shift2}
              onAddClick={() =>
                openModaltwo(
                  'Add Expansion Tank Temperature (IN °C)',
                  'SHIFT 2',
                  setShift2
                )
              }
            />
          </div>
        </div>
      </div>

      {/* Section 2 - Level */}
      <div className="content-container-main-1">
        <p className="section-title">EXPANSION TANK LEVEL (IN MM)</p>
        <div className="shift-cards-row">
          <div className="shift-card-col">
            <ShiftCard
              title={<span style={{ fontSize: '14px', lineHeight: '22px' }}>SHIFT 1</span>}
              value={levelShift1}
              onAddClick={() =>
                openModaltwo(
                  'Add Expansion Tank Level (IN MM)',
                  'SHIFT 1',
                  setLevelShift1
                )
              }
            />
          </div>
          <div className="shift-card-col">
            <ShiftCard
              title={<span style={{ fontSize: '14px', lineHeight: '22px' }}>SHIFT 2</span>}
              value={levelShift2}
              onAddClick={() =>
                openModaltwo(
                  'Add Expansion Tank Level (IN MM)',
                  'SHIFT 2',
                  setLevelShift2
                )
              }
            />
          </div>
        </div>
      </div>

      {/* Global Modal */}
      <PopupModelShiftCard
        open={isModalOpen}
        onClose={closeModaltwo}
        onSubmit={handleSubmittwo}
        title={modalTitletwo}
        label={modalLabeltwo}
      />
    </div>



                            <div className='cards-container'>

                                <Row gutter={[12, 12]} justify="start">
                                    <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                                        <Cards
                                            title={<span style={{ fontSize: "14px", lineHeight: "22px", fontWeight: "bold" }}>Chips Production <br /> (MT)</span>}
                                            value={chipsProduction}
                                            bottomText="Add"
                                            isLink={true}
                                            onClick={() =>
                                                openModal('Add Chips Production In Metric Ton (MT)', 'Chips Production', setChipsProduction)
                                            }
                                        />

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                                        <Cards
                                            title={<span style={{ fontSize: "14px", lineHeight: "22px", fontWeight: "bold" }}>Coal Consumption <br /> (MT)</span>}
                                            value={coalConsumption}
                                            bottomText="Add"
                                            isLink={true}
                                            onClick={() =>
                                                openModal('Add Total Coal Consumption In Metric Ton (MT)', 'Total Coal Consumption', setCoalConsumption)
                                            }
                                        />
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                                        <Cards title={<span style={{ fontSize: "14px", lineHeight: "22px", fontWeight: "bold" }}>Coal Consumption <br /> Per Ton (kG)</span>} value="00" bottomText="Total Coal / Chip Prod." />
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                                        <Cards title={<span style={{ fontSize: "14px", lineHeight: "22px", fontWeight: "bold" }}>Total Load <br /> (KCAL)</span>} value="18.17L" bottomText="Auto count" />
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                                        <Cards title={<span style={{ fontSize: "14px", lineHeight: "22px", fontWeight: "bold" }}>Average TFH Load  <br /> (KCAL)</span>} value="75,694" bottomText="Total Load / Total Hours" />
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                                        <Cards title={<span style={{ fontSize: "14px", lineHeight: "22px", fontWeight: "bold" }}>TFH LOAD PER TON   <br /> (KCAL)</span>} value="1513.88" bottomText="Average Load / Chip Prod." />
                                    </Col>
                                </Row>

                                <PopupModel
                                    open={isModalOpen}
                                    onClose={closeModal}
                                    onSubmit={handleSubmit}
                                    title={modalTitle}
                                    label={modalLabel}
                                />
                            </div>
                        </div>



                        <TableComponent />
                    </Content>

                </Layout>
            </Layout>
        </div>
    )
}

export default Admin