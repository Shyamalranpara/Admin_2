import React from 'react'
import HeaderLayout from '../Layout/HeaderLayout'
const { Content } = Layout;
import { DatePicker, Layout } from 'antd'
import FirstCart from '../Data/FirstCart';
import OilOutlateChart from '../Data/OilOutlateChart';
import OilIntelChart from '../Data/OilIntelChart';
import BedTemperatureChart from '../Data/BedTemperatureChart';
import FdFanChart from '../Data/FdFanChart';
import FuleGasChart from '../Data/FuleGasChart';
import WphChart from '../Data/WphChart';
import EspOutChart from '../Data/EspOutChart';
import LoadCart from '../Data/LoadCart';

import Timeline from './Timeline';
import dayjs from 'dayjs';
import Sidebar from '../Layout/Sidebar';

const Dashboard = () => {


  return (
    <div className='w-[100%] h-[auto] flex bg-[#E6F6FF] z-10'>
      
      <Layout>

        <Content
          style={{
            margin: '24px 16px 0',
            padding: 10,
            minHeight: 280,
            backgroundColor: "",
          }}
          className="px-2 md:px-4 lg:px-6"
        >

          <div className='flex items-center justify-center leading-8'>
            <div className='w-full max-w-[1164px] h-auto min-h-[102px] flex flex-col justify-center items-center gap-4 px-4'>
              <div className='w-full max-w-[290px] h-auto'><h1 className='font-semibold text-[28px] md:text-[32px] lg:text-[40px] leading-[36px] md:leading-[40px] lg:leading-[48px] text-center'>Running TFH 1</h1></div>
              <Timeline />
            </div>
          </div>


          <div className='flex items-center justify-center mt-6'>
            <div className='w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4'>

              <div className='w-full h-auto min-h-[220px] rounded-[16px] p-[16px] md:p-[24px] gap-[13px] bg-[#FFFFFF] shadow-md'>
                <h2 className="text-[18px] md:text-[20px] font-semibold leading-[24px] md:leading-[26px] mb-2 mt-6 md:mt-10 my-6 md:my-10">CHIPS PRODUCTION (MT)</h2>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div className="border border-[#405189] rounded-md p-2 w-full sm:w-1/2">
                    <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-medium">30 JUL, 2025</p>
                    <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[30px] font-semibold mt-4">50</p>
                  </div>
                  <div className="border border-[#405189] rounded-md p-2 w-full sm:w-1/2">
                    <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-medium">Month Till Date</p>
                    <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[30px] font-semibold mt-4">14,000</p>
                  </div>
                </div>
              </div>

              <div className='w-full h-auto min-h-[220px] rounded-[16px] p-[16px] md:p-[24px] gap-[13px] bg-[#FFFFFF] shadow-md'>
                <h2 className="text-[18px] md:text-[20px] font-semibold leading-[24px] md:leading-[26px] mb-2 mt-6 md:mt-10 my-6 md:my-10">Coal Consumption (MT)</h2>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div className="border border-[#405189] rounded-md p-2 w-full sm:w-1/2">
                    <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-medium">30 JUL, 2025</p>
                    <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[30px] font-semibold mt-4">19,000</p>
                  </div>
                  <div className="border border-[#405189] rounded-md p-2 w-full sm:w-1/2">
                    <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-medium">Month Till Date</p>
                    <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[30px] font-semibold mt-4">5.32L</p>
                  </div>
                </div>
              </div>


              <div className='w-full h-auto min-h-[220px] rounded-[16px] p-[16px] md:p-[24px] gap-[13px] bg-[#FFFFFF] shadow-md'>
                <h2 className="text-[16px] md:text-[20px] font-semibold leading-[22px] md:leading-[26px] mb-1 mt-4 md:mt-5 my-6 md:my-10">Coal Consumption (KG) PER Ton of PRODUCTION</h2>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div className="border border-[#405189] rounded-md p-2 w-full sm:w-1/2">
                    <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-medium">30 JUL, 2025</p>
                    <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[30px] font-semibold mt-4">380</p>
                  </div>
                  <div className="border border-[#405189] rounded-md p-2 w-full sm:w-1/2">
                    <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-medium">Month Till Date</p>
                    <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[30px] font-semibold mt-4">10,640</p>
                  </div>
                </div>
              </div>

              <div className='w-full h-auto min-h-[220px] rounded-[16px] p-[16px] md:p-[24px] gap-[13px] bg-[#FFFFFF] shadow-md'>
                <h2 className="text-[18px] md:text-[20px] font-semibold leading-[24px] md:leading-[26px] mb-2 mt-6 md:mt-10 my-6 md:my-10">Total Load (kcal)</h2>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div className="border border-[#405189] rounded-md p-2 w-full sm:w-1/2">
                    <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-medium">30 JUL, 2025</p>
                    <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[30px] font-semibold mt-4">18.17L</p>
                  </div>
                  <div className="border border-[#405189] rounded-md p-2 w-full sm:w-1/2">
                    <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-medium">Month Till Date</p>
                    <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[30px] font-semibold mt-4">508.66L</p>
                  </div>
                </div>
              </div>

              <div className='w-full h-auto min-h-[220px] rounded-[16px] p-[16px] md:p-[24px] gap-[13px] bg-[#FFFFFF] shadow-md'>
                <h2 className="text-[18px] md:text-[20px] font-semibold leading-[24px] md:leading-[26px] mb-2 mt-6 md:mt-10 my-6 md:my-10">Average TFH Load (kcal)</h2>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div className="border border-[#405189] rounded-md p-2 w-full sm:w-1/2">
                    <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-medium">30 JUL, 2025</p>
                    <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[30px] font-semibold mt-4">75,694</p>
                  </div>
                  <div className="border border-[#405189] rounded-md p-2 w-full sm:w-1/2">
                    <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-medium">Month Till Date</p>
                    <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[30px] font-semibold mt-4">21.19L</p>
                  </div>
                </div>
              </div>

              <div className='w-full h-auto min-h-[220px] rounded-[16px] p-[16px] md:p-[24px] gap-[13px] bg-[#FFFFFF] shadow-md'>
                <h2 className="text-[18px] md:text-[20px] font-semibold leading-[24px] md:leading-[26px] mb-2 mt-6 md:mt-10 my-6 md:my-10">TFH Load Per Ton (kcal)</h2>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div className="border border-[#405189] rounded-md p-2 w-full sm:w-1/2">
                    <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-medium">30 JUL, 2025</p>
                    <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[30px] font-semibold mt-4">1513.88</p>
                  </div>
                  <div className="border border-[#405189] rounded-md p-2 w-full sm:w-1/2">
                    <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-medium">Month Till Date</p>
                    <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[30px] font-semibold mt-4">42,388.64</p>
                  </div>
                </div>
              </div>

            </div>
          </div>


          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between w-full h-auto min-h-[32px] p-2 mt-5 gap-4'>
            <div>
              <h1 className='text-[18px] md:text-[20px] leading-[24px] md:leading-[28px] font-medium'>Thermopack Report</h1>
            </div>
            <div className='pr-0 sm:pr-5'>
              <DatePicker defaultValue={dayjs()} format="DD-MM-YYYY" />

            </div>
          </div>

          <div className='w-full h-auto grid grid-cols-1 lg:grid-cols-2 mt-5 px-2 md:px-5 gap-6 md:gap-10'>
            <div className='w-full h-auto min-h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>

              <FirstCart />

            </div>
            <div className='w-full h-auto min-h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <OilOutlateChart />
            </div>
            <div className='w-full h-auto min-h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <OilIntelChart />
            </div>
            <div className='w-full h-auto min-h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <BedTemperatureChart />
            </div>
            <div className='w-full h-auto min-h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <FdFanChart />
            </div>
            <div className='w-full h-auto min-h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <FuleGasChart />
            </div>
            <div className='w-full h-auto min-h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <WphChart />
            </div>
            <div className='w-full h-auto min-h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <EspOutChart />
            </div>
            <div className='w-full h-auto min-h-[360px] rounded-[8px] shadow-md bg-[#FFFFFF]'>
              <LoadCart />
            </div>

          </div>
        </Content>

      </Layout>

    </div>
  )
}

export default Dashboard