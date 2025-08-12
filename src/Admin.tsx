import React, { useState } from 'react';
import './Admin.css'
import JBLOGO from './assets/LOGO.png'
import Cards from './Cards'
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Row, Col, DatePicker } from 'antd';
import TableComponent from './TableComponent';
import ShiftCard from './ShiftCard';
import PopupModel from './PopupModel';
import PopupModelShiftCard from './PopupModelShiftCard';
import { Link } from 'react-router-dom';
import HeaderLayout from './HeaderLayout';
import RadioBtn from './RadioBtn';

const { Content, Sider } = Layout;


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
    getItem(<Link to="/dashboard"><span className='text-[#408634]' >Dashboard</span></Link>, '1', <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.39578 0H1.0208C0.4579 0 0 0.4579 0 1.0208V3.64579C0 4.20879 0.4579 4.66669 1.0208 4.66669H5.39578C5.95879 4.66669 6.41669 4.20879 6.41669 3.64579V1.0208C6.41669 0.4579 5.95879 0 5.39578 0Z" fill="#408634" />
        <path d="M5.39578 5.83332H1.0208C0.4579 5.83332 0 6.29122 0 6.85422V12.9792C0 13.5421 0.4579 14 1.0208 14H5.39578C5.95879 14 6.41669 13.5421 6.41669 12.9792V6.85422C6.41669 6.29122 5.95879 5.83332 5.39578 5.83332Z" fill="#408634" />
        <path d="M12.9792 9.33331H8.60421C8.04121 9.33331 7.58331 9.79121 7.58331 10.3542V12.9792C7.58331 13.5421 8.04121 14 8.60421 14H12.9792C13.5421 14 14 13.5421 14 12.9792V10.3542C14 9.79121 13.5421 9.33331 12.9792 9.33331Z" fill="#408634" />
        <path d="M12.9792 0H8.60421C8.04121 0 7.58331 0.4579 7.58331 1.0208V7.14578C7.58331 7.70878 8.04121 8.16668 8.60421 8.16668H12.9792C13.5421 8.16668 14 7.70878 14 7.14578V1.0208C14 0.4579 13.5421 0 12.9792 0Z" fill="#408634" />
    </svg>
    ),
    getItem(<span style={{ color: '#408634' }}>Report</span>, 'sub1', <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.3828 4.65247H13.7675C12.2462 3.13097 11.6378 2.51925 11.3828 2.26774V4.65247Z" fill="#408634" />
        <path d="M10.5625 5.06259C10.5625 5.2891 10.7461 5.47274 10.9727 5.47274H14.0078C14.0081 7.35863 14.0078 15.0724 14.0078 15.1798C14.0078 15.6321 13.6398 16 13.1875 16.0001H4.82031C4.368 16.0001 4 15.6321 4 15.1798V2.8204C4.00013 2.3682 4.36808 2.00009 4.82031 2.00009C8.44221 2.00009 9.94101 1.99989 10.5625 2.00009V5.06259ZM5.63672 14.4298C5.50093 14.4298 5.39064 14.5401 5.39062 14.6759C5.39062 14.8117 5.50092 14.922 5.63672 14.922H12.5215C12.6571 14.9217 12.7666 14.8115 12.7666 14.6759C12.7666 14.5402 12.6571 14.43 12.5215 14.4298H5.63672ZM5.63672 12.8751C5.50101 12.8751 5.39077 12.9845 5.39062 13.1202C5.39062 13.256 5.50092 13.3663 5.63672 13.3663H12.5215C12.6571 13.3661 12.7666 13.2559 12.7666 13.1202C12.7665 12.9847 12.657 12.8753 12.5215 12.8751H5.63672Z" fill="#408634" />
    </svg>
        , [
            getItem(<Link to="/admin"><span className='text-[#408634]' >Thermopack Report</span></Link>, '3'),
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
    const [modalValue, setModalValue] = useState('');
    const openModal = (
        title: string,
        label: string,
        setter: (value: string) => void,
        value: string
    ) => {
        setModalTitle(title);
        setModalLabel(label);
        setCurrentSetter(() => setter);
        setModalValue(value);
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
    const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
    const [modalTitleTwo, setModalTitleTwo] = useState('');
    const [modalLabelTwo, setModalLabelTwo] = useState('');
    const [modalSetterTwo, setModalSetterTwo] = useState<(value: string) => void>(() => () => { });
    const [modalInputValueTwo, setModalInputValueTwo] = useState('');

    const [shift1, setShift1] = useState('');
    const [shift2, setShift2] = useState('');
    const [levelShift1, setLevelShift1] = useState('');
    const [levelShift2, setLevelShift2] = useState('');

    const openModalTwo = (
        title: string,
        label: string,
        setter: (value: string) => void,
        currentValue: string
    ) => {
        setModalTitleTwo(title);
        setModalLabelTwo(label);
        setModalSetterTwo(() => setter);
        setIsModalTwoOpen(true);
        setModalInputValueTwo(currentValue);
    };

    const closeModalTwo = () => {
        setIsModalTwoOpen(false);
    };

    const handleSubmitTwo = (value: string) => {
        modalSetterTwo(value);
        closeModalTwo();
    };



    return (
        <div className='w-[100%] h-[auto] flex flex-col bg-[#E6F6FF]'>

            <Layout style={{ minHeight: '100vh' }}>
                <Sider

                    style={{ backgroundColor: "#E6F6FF", height: "265vh", }}
                    width={280}
                >
                    <div className="demo-logo-vertical" />
                    <div className='flex items-center justify-center'>
                        <img className='w-[160px] h-[40px] mt-[20px]' src={JBLOGO} alt="logo" />
                    </div>
                    <Menu className='w-[100%] h-[100%] mt-[25px]' style={{ backgroundColor: "#E6F6FF" }} defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>

                <Layout>


                    <HeaderLayout />

                    <Content style={{ margin: '0 16px' }}>
                        <div className='breadcrumb-container flex items-center justify-between m-0 p-0'>
                            <div>
                                <Breadcrumb style={{ margin: '16px 0', fontSize: "20px" }} items={[{ title: 'Thermopack Report' }]} />
                            </div>

                            <div className='date-picker-container'>
                                <DatePicker/>
                                <div>
                                    {/* <button className='btn-tfh py-[5px] px-[16px] border border-2 border-[#408634] text-[#408634] text-[14px] rounded-[4px] cursor-pointer'>TFH 1</button>
                                    <button className='btn-tfh-2 py-[5px] px-[16px] border border-2 border-[#d9d9d9e6] bg-transparent rounded-[4px] text-[14px] cursor-pointer'>TFH 2</button> */}

                                    <RadioBtn/>
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

                            <div className=" flex gap-[24px] mb-[24px] flex-wrap">
                                {/* Section 1 - Temperature */}
                                <div className=" content-container-main flex-1 min-w-[300px] bg-white rounded-[12px] p-5 shadow-custom-soft border border-[#f0f0f0]">
                                    <p className="text-lg font-normal font-black mb-[16px] uppercase tracking-wide">EXPANSION TANK TEMPERATURE (IN °C)</p>
                                    <div className="shift-cards-row flex gap-[16px] justify-between">
                                        <div className="flex-1">
                                            <ShiftCard
                                                title={<span className='font-normal linehigh text-base leading-[22px]'>SHIFT 1</span>}
                                                value={shift1}
                                                onAddClick={() =>
                                                    openModalTwo(
                                                        'Add Expansion Tank Temperature (IN °C)',
                                                        'SHIFT 1',
                                                        setShift1,
                                                        shift1
                                                    )
                                                }

                                            />
                                        </div>
                                        <div className="flex-1">
                                            <ShiftCard
                                                title={<span className='font-normal linehigh text-base leading-[22px]'>SHIFT 2</span>}
                                                value={shift2}
                                                onAddClick={() =>
                                                    openModalTwo(
                                                        'Add Expansion Tank Temperature (IN °C)',
                                                        'SHIFT 2',
                                                        setShift2,
                                                        shift2
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2 - Level */}
                                <div className=" content-container-main flex-1 min-w-[300px] bg-white rounded-[12px] p-5 shadow-custom-soft border border-[#f0f0f0]">
                                    <p className="text-lg font-normal font-black mb-[16px] uppercase tracking-wide">EXPANSION TANK LEVEL (IN MM)</p>
                                    <div className="shift-cards-row flex gap-[16px] justify-between">
                                        <div className="flex-1">

                                            <ShiftCard
                                                title={<span className='font-normal linehigh text-base leading-[22px]'>SHIFT 1</span>}
                                                value={levelShift1}
                                                onAddClick={() =>
                                                    openModalTwo(
                                                        'Add Expansion Tank Level (IN MM)',
                                                        'SHIFT 1',
                                                        setLevelShift1,
                                                        levelShift1
                                                    )
                                                }
                                            />

                                        </div>
                                        <div className="flex-1">
                                            <ShiftCard
                                                title={<span className='font-normal linehigh text-base leading-[22px]'>SHIFT 2</span>}
                                                value={levelShift2}
                                                onAddClick={() =>
                                                    openModalTwo(
                                                        'Add Expansion Tank Level (IN MM)',
                                                        'SHIFT 2',
                                                        setLevelShift2,
                                                        levelShift2
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Global Modal */}
                                <PopupModelShiftCard
                                    open={isModalTwoOpen}
                                    onClose={closeModalTwo}
                                    onSubmit={handleSubmitTwo}
                                    title={modalTitleTwo}
                                    label={modalLabelTwo}
                                    value={modalInputValueTwo} // pass current value
                                    onChange={(val) => setModalInputValueTwo(val)}
                                />
                            </div>



                            <div className='cards-container'>

                                <Row gutter={[12, 12]} justify="start">
                                    <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                                        <Cards
                                            title={<span className='text-base font-bold leading[22px]' >Chips Production <br /> (MT)</span>}
                                            value={chipsProduction}
                                            bottomText={chipsProduction && chipsProduction !== "00" ? "Edit" : "Add"}
                                            isLink={true}
                                            onClick={() =>
                                                openModal(
                                                    'Add Chips Production In Metric Ton (MT)',
                                                    'Chips Production',
                                                    setChipsProduction,
                                                    chipsProduction // yaha current value bhej rahe
                                                )
                                            }
                                        />

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                                        <Cards
                                            title={<span className='text-base font-bold leading[22px]'>Coal Consumption <br /> (MT)</span>}
                                            value={coalConsumption}
                                            bottomText={coalConsumption && coalConsumption !== "00" ? "Edit" : "Add"}
                                            isLink={true}
                                            onClick={() =>
                                                openModal(
                                                    'Add Coal Consumption In Metric Ton (MT)',
                                                    'Coal Consumption',
                                                    setCoalConsumption,
                                                    coalConsumption
                                                )}
                                        />
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                                        <Cards title={<span className='text-base font-bold leading[22px]'>Coal Consumption <br /> Per Ton (kG)</span>} value="00" bottomText="Total Coal / Chip Prod." />
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                                        <Cards title={<span className='text-base font-bold leading[22px]'>Total Load <br /> (KCAL)</span>} value="18.17L" bottomText="Auto count" />
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                                        <Cards title={<span className='text-base font-bold leading[22px]'>Average TFH Load  <br /> (KCAL)</span>} value="75,694" bottomText="Total Load / Total Hours" />
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                                        <Cards title={<span className='text-base font-bold leading[22px]'>TFH LOAD PER TON   <br /> (KCAL)</span>} value="1513.88" bottomText="Average Load / Chip Prod." />
                                    </Col>
                                </Row>

                                <PopupModel
                                    open={isModalOpen}
                                    onClose={closeModal}
                                    onSubmit={handleSubmit}
                                    title={modalTitle}
                                    label={modalLabel}
                                    defaultValue={modalValue}/>
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