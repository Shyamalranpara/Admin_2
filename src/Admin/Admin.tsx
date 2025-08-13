import React, { useState } from 'react';
import './Admin.css'
import Cards from '../Components/Cards'
import { Breadcrumb, Layout, Row, Col, DatePicker } from 'antd';
import TableComponent from '../Components/TableComponent';
import ShiftCard from '../Components/ShiftCard';
import PopupModel from '../Model/PopupModel';
import PopupModelShiftCard from '../Model/PopupModelShiftCard';
import HeaderLayout from '../Layout/HeaderLayout';
import RadioBtn from '../Components/RadioBtn';
import dayjs from 'dayjs';
import Sidebar from '../Layout/Sidebar';

const { Content } = Layout;


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
        <div className='w-[100%] h-[auto] flex overflow-x-hidden bg-[#E6F6FF]'>

            <Layout className='w-[1550px]'>

                <Content className="px-2 md:px-2 lg:px-4 w-screen ">
                    <div className='breadcrumb-container flex flex-col md:flex-row md:items-center md:justify-between m-0 p-0 w-[1550px] gap-4'>
                        <div>
                            <Breadcrumb style={{ margin: '16px 0', fontSize: "20px" }} items={[{ title: 'Thermopack Report' }]} />
                        </div>

                        <div className='date-picker-container flex flex-col sm:flex-row gap-4'>
                            <DatePicker defaultValue={dayjs()} format="DD-MM-YYYY" />
                            <div>
                                <RadioBtn />
                            </div>
                        </div>
                    </div>

                    <div className="px-2 md:px-4 lg:px-6 p-[2] min-h-[360px]">

                        <div className="flex flex-col lg:flex-row gap-[10px] w-[1530px] mb-[24px]">
                            <div className="content-container-main flex-1 min-w-[280px] lg:min-w-[300px] bg-white rounded-[12px] p-3 md:p-5 shadow-custom-soft border border-[#f0f0f0]">
                                <p className="text-base md:text-lg font-normal font-black mb-[16px] uppercase tracking-wide">EXPANSION TANK TEMPERATURE (IN °C)</p>
                                <div className="shift-cards-row flex flex-col sm:flex-row gap-[16px] justify-between">
                                    <div className="flex-1">
                                        <ShiftCard
                                            title={<span className='font-normal linehigh text-sm md:text-base leading-[22px]'>SHIFT 1</span>}
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
                                            title={<span className='font-normal linehigh text-sm md:text-base leading-[22px]'>SHIFT 2</span>}
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

                            <div className="content-container-main flex-1 min-w-[280px] lg:min-w-[300px] bg-white rounded-[12px] p-3 md:p-5 shadow-custom-soft border border-[#f0f0f0]">
                                <p className="text-base md:text-lg font-normal font-black mb-[16px] uppercase tracking-wide">EXPANSION TANK LEVEL (IN MM)</p>
                                <div className="shift-cards-row flex flex-col sm:flex-row gap-[16px] justify-between">
                                    <div className="flex-1">

                                        <ShiftCard
                                            title={<span className='font-normal linehigh text-sm md:text-base leading-[22px]'>SHIFT 1</span>}
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
                                            title={<span className='font-normal linehigh text-sm md:text-base leading-[22px]'>SHIFT 2</span>}
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

                        <div className='cards-container mb-4 flex gap-2' >

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
                                                chipsProduction
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
                                defaultValue={modalValue} />
                        </div>
                    </div>

                    <TableComponent />
                </Content>

            </Layout>
        </div>
    )
}

export default Admin