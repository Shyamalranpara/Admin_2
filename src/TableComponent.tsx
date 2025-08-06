import React from 'react';
import { Table, Input, Checkbox, type CheckboxProps, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface TableDataType {
  key: string;
  time: string;
  furnaceDraft?: string;
  sandLevel?: string;
  tfOut?: string;
  ibhInlet?: string;
  delta?: string;
  bedTemp?: string;
  fdFanTemp?: string;
  flueGasTemp?: string;
  heatOutput?: string;
}
// onchange
const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
};
const columns: ColumnsType<TableDataType> = [
  {
    title: 'Time',
    dataIndex: 'time',
    render: (text: string) => text,
  },
  {
    title: (
      <>
      <span>Furnace Draft <br />(Dt -10-3)</span> 
      </>
    ),
    dataIndex: 'furnaceDraft',
    render: () => <Input placeholder="Enter" />,
  },
  {
    title: (
      <>
        Sand Level <br /> (Pt-5-4)
      </>
    ),
    dataIndex: 'sandLevel',
    render: () => <Input placeholder="Enter" />,
  },
  {
    title: (
      <>
        T.f Out Let Temp. <br /> (Te-9-10)
      </>
    ),
    dataIndex: 'tfOut',
    render: () => <Input placeholder="Enter" />,
  },
  {
    title: (
      <>
        Ibh Inlet Let Temp. <br /> (Te-9-1)
      </>
    ),
    dataIndex: 'ibhInlet',
    render: () => <Input placeholder="Enter" />,
  },
  {
    title: 'Delta',
    dataIndex: 'delta',
    render: () => <Input placeholder="Enter" />,
  },
  {
    title: (
      <>
        Bed Temp <br /> (Te-10-4)
      </>
    ),
    dataIndex: 'bedTemp',
    render: () => <Input placeholder="Enter" />,
  },
  {
    title: 'Fd Fan Air Temp',
    dataIndex: 'fdFanTemp',
    render: () => <Input placeholder="Enter" />,
  },
  {
    title: (
      <>
       
      </>
    ),
    dataIndex: 'flueGasTemp',
    render: () => <Input placeholder="Enter" />,
  },
  {
    title: 'Heat Output Load',
    dataIndex: 'heatOutput',
    render: () => <Input placeholder="Enter" />,
  },
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00',
  '23:00', '00:00', '01:00', '02:00', '03:00',
  '04:00', '05:00', '06:00', '07:00',
];

const TableComponent: React.FC = () => {
  const data: TableDataType[] = timeSlots.map((time, index) => ({
    key: String(index + 1),
    time,
  }));

  return (

    <div className="rounded-[12px] p-[10px]">
        <div className="w-full h-[50px] flex justify-evenly items-center bg-white" >
                            <Checkbox onChange={onChange}>Wph Out Let Temp</Checkbox>
                            <Checkbox onChange={onChange}>Esp Out Let Temp</Checkbox>
                            <Checkbox onChange={onChange}>Id Fan Frequency(Hz)</Checkbox>
                            <Checkbox onChange={onChange}>Id Fan Frequency/Load</Checkbox>
                            <Checkbox onChange={onChange}>Screw Feeder Frequency(Hz)</Checkbox>
                            <Checkbox onChange={onChange}>Heat Output Load</Checkbox>
                            <Checkbox onChange={onChange}>Flow(m3/hr)</Checkbox>
                            <Checkbox onChange={onChange}>Discharge Pressure (kg)</Checkbox>
                        </div>
      <Table<TableDataType>
        className="table"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
       <Divider />

       <div className='flex justify-end'>
     <button className="w-[62px] h-[32px] text-[14px] leading-[22px] text-white bg-[#408634] border border-[#408634] px-[15px] py-[4px] ">
  Save
</button>
       </div>

    </div>
  );
};

export default TableComponent;
