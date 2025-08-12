import React, { useState } from 'react'
import HeaderLayout from './HeaderLayout'
const { Content, Sider } = Layout;
import { DatePicker, Layout, Menu, Modal, type MenuProps } from 'antd'
import JBLOGO from './assets/LOGO.png'
import { Link } from 'react-router-dom';
import FirstCart from './Data/FirstCart';
import OilOutlateChart from './Data/OilOutlateChart';
import OilIntelChart from './Data/OilIntelChart';
import BedTemperatureChart from './Data/BedTemperatureChart';
import FdFanChart from './Data/FdFanChart';
import FuleGasChart from './Data/FuleGasChart';
import WphChart from './Data/WphChart';
import EspOutChart from './Data/EspOutChart';
import LoadCart from './Data/LoadCart';
import Timeline from './Timeline';
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


const Dashboard = () => {


  return (
    <div className='w-[100%] h-[auto] flex flex-col bg-[#E6F6FF] z-10'>

      <Layout style={{ minHeight: '100vh' }}>
        <Sider

          style={{ backgroundColor: "#E6F6FF", height: "310vh", }}
          width={280}
        >
          <div className="demo-logo-vertical" />
          <div className='flex items-center justify-center'>
            <img className='w-[160px] h-[40px] mt-[20px]' src={JBLOGO} alt="logo" />
          </div>
          <Menu className='w-[100%] h-[100%] mt-[25px]' style={{ backgroundColor: "#E6F6FF" }} defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>

        <Layout>


          <HeaderLayout/>


          <Content
            style={{
              margin: '24px 16px 0',
              padding: 10,
              minHeight: 280,
              backgroundColor: "",
            }}
          >

            <div className='flex items-center justify-center leading-8'>
              <div className='w-[1164px] h-[102px] flex flex-col justify-center items-center gap-4'>
                <div className='w-[290px] h-[48px]'><h1 className='font-semibold text-[40px] leading-[48px]'>Running TFH 1</h1></div>
                {/* <div className='w-[448px] h-[38px]'><span className='font-normal text-[30px] leading-[38px]'>last update - 21/07/2025</span><a className='mx-6 font-normal text-[20px] leading-[28px]'  onClick={() => setIsTimelineOpen(true)} ><span className='underline text-black'>Timeline</span></a> */}
                 <Timeline/>
                </div>
              </div>
            {/* </div> */}


            <div className='flex items-center justify-center mt-6'>
              <div className='w-full h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>

                <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full md:w-[368px] lg:w-[468px] h-[220px] rounded-[16px] p-[24px] gap-[13px] bg-[#FFFFFF] shadow-md'>
                  <h2 className="text-[20px] font-semibold leading-[26px] mb-2 mt-10 my-10">CHIPS PRODUCTION (MT)</h2>
                  <div className="flex justify-between gap-2">
                    <div className="border border-[#405189] rounded-md p-2 w-1/2">
                      <p className="text-[16px] leading-[22px] font-medium">30 JUL, 2025</p>
                      <p className="text-[22px] leading-[30px] font-semibold mt-4">50</p>
                    </div>
                    <div className="border border-[#405189] rounded-md p-2 w-1/2">
                      <p className="text-[16px] leading-[22px] font-medium">Month Till Date</p>
                      <p className="text-[22px] leading-[30px] font-semibold mt-4">14,000</p>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full md:w-[368px] lg:w-[468px] h-[220px] rounded-[16px] p-[24px] gap-[13px] bg-[#FFFFFF] shadow-md'>
                  <h2 className="text-[20px] font-semibold leading-[26px] mb-2 mt-10 my-10">Coal Consumption (MT)</h2>
                  <div className="flex justify-between gap-2">
                    <div className="border border-[#405189] rounded-md p-2 w-1/2">
                      <p className="text-[16px] leading-[22px] font-medium">30 JUL, 2025</p>
                      <p className="text-[22px] leading-[30px] font-semibold mt-4">19,000</p>
                    </div>
                    <div className="border border-[#405189] rounded-md p-2 w-1/2">
                      <p className="text-[16px] leading-[22px] font-medium">Month Till Date</p>
                      <p className="text-[22px] leading-[30px] font-semibold mt-4">5.32L</p>
                    </div>
                  </div>
                </div>


                <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full md:w-[368px] lg:w-[468px] h-[220px] rounded-[16px] p-[24px] gap-[13px] bg-[#FFFFFF] shadow-md'>
                  <h2 className="text-[20px] font-semibold leading-[26px] mb-1 mt-5 my-10">Coal Consumption (KG) PER Ton of PRODUCTION</h2>
                  <div className="flex justify-between gap-2">
                    <div className="border border-[#405189] rounded-md p-2 w-1/2">
                      <p className="text-[16px] leading-[22px] font-medium">30 JUL, 2025</p>
                      <p className="text-[22px] leading-[30px] font-semibold mt-4">380</p>
                    </div>
                    <div className="border border-[#405189] rounded-md p-2 w-1/2">
                      <p className="text-[16px] leading-[22px] font-medium">Month Till Date</p>
                      <p className="text-[22px] leading-[30px] font-semibold mt-4">10,640</p>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full md:w-[368px] lg:w-[468px] h-[220px] rounded-[16px] p-[24px] gap-[13px] bg-[#FFFFFF] shadow-md'>
                  <h2 className="text-[20px] font-semibold leading-[26px] mb-2 mt-10 my-10">Total Load (kcal)</h2>
                  <div className="flex justify-between gap-2">
                    <div className="border border-[#405189] rounded-md p-2 w-1/2">
                      <p className="text-[16px] leading-[22px] font-medium">30 JUL, 2025</p>
                      <p className="text-[22px] leading-[30px] font-semibold mt-4">18.17L</p>
                    </div>
                    <div className="border border-[#405189] rounded-md p-2 w-1/2">
                      <p className="text-[16px] leading-[22px] font-medium">Month Till Date</p>
                      <p className="text-[22px] leading-[30px] font-semibold mt-4">508.66L</p>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full md:w-[368px] lg:w-[468px] h-[220px] rounded-[16px] p-[24px] gap-[13px] bg-[#FFFFFF] shadow-md'>
                  <h2 className="text-[20px] font-semibold leading-[26px] mb-2 mt-10 my-10">Average TFH Load (kcal)</h2>
                  <div className="flex justify-between gap-2">
                    <div className="border border-[#405189] rounded-md p-2 w-1/2">
                      <p className="text-[16px] leading-[22px] font-medium">30 JUL, 2025</p>
                      <p className="text-[22px] leading-[30px] font-semibold mt-4">75,694</p>
                    </div>
                    <div className="border border-[#405189] rounded-md p-2 w-1/2">
                      <p className="text-[16px] leading-[22px] font-medium">Month Till Date</p>
                      <p className="text-[22px] leading-[30px] font-semibold mt-4">21.19L</p>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full md:w-[368px] lg:w-[468px] h-[220px] rounded-[16px] p-[24px] gap-[13px] bg-[#FFFFFF] shadow-md'>
                  <h2 className="text-[20px] font-semibold leading-[26px] mb-2 mt-10 my-10">TFH Load Per Ton (kcal)</h2>
                  <div className="flex justify-between gap-2">
                    <div className="border border-[#405189] rounded-md p-2 w-1/2">
                      <p className="text-[16px] leading-[22px] font-medium">30 JUL, 2025</p>
                      <p className="text-[22px] leading-[30px] font-semibold mt-4">1513.88</p>
                    </div>
                    <div className="border border-[#405189] rounded-md p-2 w-1/2">
                      <p className="text-[16px] leading-[22px] font-medium">Month Till Date</p>
                      <p className="text-[22px] leading-[30px] font-semibold mt-4">42,388.64</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            

            <div className='flex items-center justify-between w-full h-[32px] p-2 mt-5'>
              <div>
                <h1 className='text-[20px] leading-[28px] font-medium'>Thermopack Report</h1>
              </div>
              <div className='pr-5'>
                <DatePicker /> 
              </div>
            </div>

            <div className='w-full h-[auto] grid grid-cols-2 mt-5 px-5  gap-10'>
            <div className='w-[730px] h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
            
<FirstCart/>

            </div>
            <div className='w-[730px] h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
               <OilOutlateChart />
            </div>
            <div className='w-[730px] h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <OilIntelChart />
            </div>
            <div className='w-[730px] h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <BedTemperatureChart/>
            </div>
            <div className='w-[730px] h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <FdFanChart/>
            </div>
            <div className='w-[730px] h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <FuleGasChart/>
            </div>
            <div className='w-[730px] h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <WphChart/>
            </div>
            <div className='w-[730px] h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <EspOutChart/>
            </div>
            <div className='w-[730px] h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <LoadCart/>
            </div>
            </div>
          </Content>

        </Layout>
      </Layout>

    </div>
  )
}

export default Dashboard