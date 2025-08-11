import React, { useState, useEffect } from "react";
import { Table, Input, Checkbox, Divider } from "antd";

interface TableDataType {
  key: string;
  time: string;
  [key: string]: string | undefined;
}

const fixedColumns = [
  { title: "Time", dataIndex: "time" },
  { title: <>Furnace Draft <br /> (Dt -10-3)</>, dataIndex: "furnaceDraft", render: () => <Input placeholder="Enter" /> },
  { title: <>Sand Level <br /> (Pt-5-4)</>, dataIndex: "sandLevel", render: () => <Input placeholder="Enter" /> },
  { title: <>T.f Out Let Temp. <br /> (Te-9-10)</>, dataIndex: "tfOut", render: () => <Input placeholder="Enter" /> },
  { title: <>Ibh Inlet Let Temp. <br /> (Te-9-1)</>, dataIndex: "ibhInlet", render: () => <Input placeholder="Enter" /> },
  { title: "Delta", dataIndex: "delta", render: () => <Input placeholder="Enter" /> },
  { title: <>Bed Temp <br /> (Te-10-4)</>, dataIndex: "bedTemp", render: () => <Input placeholder="Enter" /> },
  { title: "Fd Fan Air Temp", dataIndex: "fdFanTemp", render: () => <Input placeholder="Enter" /> },
  { title: <>Flue Gas Temp. <br /> (Te-10-1)</>, dataIndex: "flueGasTemp", render: () => <Input placeholder="Enter" /> },
  { title: "Heat Output Load", dataIndex: "heatOutput", render: () => <Input placeholder="Enter" /> },
];

const allOptions = [
  { key: "wph", label: "Wph Out Let Temp" },
  { key: "esp", label: "Esp Out Let Temp" },
  { key: "idf", label: "Id Fan Frequency(Hz)" },
  { key: "idfLoad", label: "Id Fan Frequency/Load" },
  { key: "screw", label: "Screw Feeder Frequency(Hz)" },
  { key: "heat", label: "Heat Output Load" },
  { key: "flow", label: "Flow(m3/hr)" },
  { key: "pressure", label: "Discharge Pressure (kg)" },
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00", "01:00",
  "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"
];

const TableComponent: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedKeys = localStorage.getItem("selectedColumns");
    if (savedKeys) {
      setSelectedKeys(JSON.parse(savedKeys));
    }
  }, []);

  const handleCheckboxChange = (key: string) => {
    setSelectedKeys((prev) => {
      const updated = prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];
      // Save to localStorage
      localStorage.setItem("selectedColumns", JSON.stringify(updated));
      return updated;
    });
  };

  const dynamicColumns = selectedKeys.map((key) => {
    const option = allOptions.find((o) => o.key === key);
    return {
      title: option?.label || key,
      dataIndex: key,
      render: () => <Input placeholder="Enter" />,
    };
  });

  const columns = [...fixedColumns, ...dynamicColumns];

  const data: TableDataType[] = timeSlots.map((time, index) => ({
    key: String(index + 1),
    time,
  }));

  return (
    <div className="rounded-[12px] p-[10px]">
      <div style={{ marginBottom: 16 }}>
        {allOptions.map((opt) => (
          <Checkbox
            key={opt.key}
            onChange={() => handleCheckboxChange(opt.key)}
            checked={selectedKeys.includes(opt.key)}
            style={{ marginRight: 8 }}
          >
            {opt.label}
          </Checkbox>
        ))}
      </div>

      <Table<TableDataType>
        columns={columns}
        dataSource={data}
        pagination={false}
      />

      <Divider />

      <div className="flex justify-end">
        <button
          className="w-[62px] h-[32px] text-[14px] leading-[22px] text-white bg-[#408634] border border-[#408634] px-[15px] py-[4px]"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
