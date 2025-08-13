import React, { useState, useEffect } from "react";
import { Table, Input, Checkbox, Divider } from "antd";
import axios from "axios";

interface TableDataType {
  key: string;
  time: string;
  [key: string]: string | undefined;
}

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
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedKeys = localStorage.getItem("selectedColumns");
    if (savedKeys) {
      setSelectedKeys(JSON.parse(savedKeys));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/breakdown");
        const breakdownData = response.data && response.data.length > 0
          ? response.data[0].data || []
          : [];

        if (breakdownData.length > 0) {
          const formattedData: TableDataType[] = breakdownData.map((item: any, index: number) => {
            const allKeys = [
              "time", "delta", "bedTemp", "tfOut", "ibhInlet", "furnaceDraft",
              "sandLevel", "fdFanTemp", "flueGasTemp", "heatOutput",
              ...allOptions.map(o => o.key)
            ];

            const row: TableDataType = { key: String(index + 1), time: item["time"] || timeSlots[index] || "" };
            allKeys.forEach(k => {
              if (k !== "time") {
                row[k] = item[k] || "0";
              }
            });
            return row;
          });
          setTableData(formattedData);
        } else {
          const initialData: TableDataType[] = timeSlots.map((time, index) => {
            const row: TableDataType = { key: String(index + 1), time };
            [
              ...allOptions.map(o => o.key),
              "delta", "bedTemp", "tfOut", "ibhInlet", "furnaceDraft",
              "sandLevel", "fdFanTemp", "flueGasTemp", "heatOutput"
            ].forEach(k => {
              if (k !== "time") row[k] = "0";
            });
            return row;
          });
          setTableData(initialData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        const initialData: TableDataType[] = timeSlots.map((time, index) => {
          const row: TableDataType = { key: String(index + 1), time };
          [
            ...allOptions.map(o => o.key),
            "delta", "bedTemp", "tfOut", "ibhInlet", "furnaceDraft",
            "sandLevel", "fdFanTemp", "flueGasTemp", "heatOutput"
          ].forEach(k => {
            if (k !== "time") row[k] = "0";
          });
          return row;
        });
        setTableData(initialData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (key: string) => {
    setSelectedKeys(prev => {
      const updated = prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key];
      localStorage.setItem("selectedColumns", JSON.stringify(updated));
      return updated;
    });
  };

  const handleInputChange = (rowKey: string, field: string, value: string) => {
    setTableData(prev =>
      prev.map(row =>
        row.key === rowKey ? { ...row, [field]: value } : row
      )
    );
  };

  const saveData = async () => {
    try {
      const breakdownData = tableData.map(row => {
        const filledRow: any = {};
        Object.keys(row).forEach(key => {
          filledRow[key] = row[key] || "0";
        });
        return filledRow;
      });

      await axios.post("http://localhost:5000/breakdown", {
        id: Date.now().toString(),
        data: breakdownData
      });

      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please check the console for details.");
    }
  };

  const fixedColumns = [
    { title: "Time", dataIndex: "time" },
    {
      title: <>Furnace Draft <br /> (Dt -10-3)</>,
      dataIndex: "furnaceDraft",
      render: (_: any, record: TableDataType) => (
        <Input
          placeholder="Enter"
          value={record.furnaceDraft}
          onChange={e => handleInputChange(record.key, "furnaceDraft", e.target.value)}
        />
      )
    },
    {
      title: <>Sand Level <br /> (Pt-5-4)</>,
      dataIndex: "sandLevel",
      render: (_: any, record: TableDataType) => (
        <Input
          placeholder="Enter"
          value={record.sandLevel}
          onChange={e => handleInputChange(record.key, "sandLevel", e.target.value)}
        />
      )
    },
    {
      title: <>T.f Out Let Temp. <br /> (Te-9-10)</>,
      dataIndex: "tfOut",
      render: (_: any, record: TableDataType) => (
        <Input
          placeholder="Enter"
          value={record.tfOut}
          onChange={e => handleInputChange(record.key, "tfOut", e.target.value)}
        />
      )
    },
    {
      title: <>Ibh Inlet Let Temp. <br /> (Te-9-1)</>,
      dataIndex: "ibhInlet",
      render: (_: any, record: TableDataType) => (
        <Input
          placeholder="Enter"
          value={record.ibhInlet}
          onChange={e => handleInputChange(record.key, "ibhInlet", e.target.value)}
        />
      )
    },
    {
      title: "Delta",
      dataIndex: "delta",
      render: (_: any, record: TableDataType) => (
        <Input
          placeholder="Enter"
          value={record.delta}
          onChange={e => handleInputChange(record.key, "delta", e.target.value)}
        />
      )
    },
    {
      title: <>Bed Temp <br /> (Te-10-4)</>,
      dataIndex: "bedTemp",
      render: (_: any, record: TableDataType) => (
        <Input
          placeholder="Enter"
          value={record.bedTemp}
          onChange={e => handleInputChange(record.key, "bedTemp", e.target.value)}
        />
      )
    },
    {
      title: "Fd Fan Air Temp",
      dataIndex: "fdFanTemp",
      render: (_: any, record: TableDataType) => (
        <Input
          placeholder="Enter"
          value={record.fdFanTemp}
          onChange={e => handleInputChange(record.key, "fdFanTemp", e.target.value)}
        />
      )
    },
    {
      title: <>Flue Gas Temp. <br /> (Te-10-1)</>,
      dataIndex: "flueGasTemp",
      render: (_: any, record: TableDataType) => (
        <Input
          placeholder="Enter"
          value={record.flueGasTemp}
          onChange={e => handleInputChange(record.key, "flueGasTemp", e.target.value)}
        />
      )
    },
    {
      title: "Heat Output Load",
      dataIndex: "heatOutput",
      render: (_: any, record: TableDataType) => (
        <Input
          placeholder="Enter"
          value={record.heatOutput}
          onChange={e => handleInputChange(record.key, "heatOutput", e.target.value)}
        />
      )
    }
  ];

  const dynamicColumns = selectedKeys.map((key) => {
    const option = allOptions.find((o) => o.key === key);
    return {
      title: option?.label || key,
      dataIndex: key,
      render: (_: any, record: TableDataType) => (
        <Input
          placeholder="Enter"
          value={record[key]}
          onChange={e => handleInputChange(record.key, key, e.target.value)}
        />
      )
    };
  });

  const columns = [...fixedColumns, ...dynamicColumns];

  return (
    <div className="rounded-[12px] p-[2px] md:p-[10px] mb-4 w-[1550px] mt-2">
      <div style={{ marginBottom: 16 }} className="flex flex-wrap gap-2 md:gap-4 mx-5">
        {allOptions.map((opt) => (
          <Checkbox
            key={opt.key}
            onChange={() => handleCheckboxChange(opt.key)}
            checked={selectedKeys.includes(opt.key)}
            style={{ marginRight: 8 }}
            className="text-xs md:text-sm"
          >
            {opt.label}
          </Checkbox>
        ))}
      </div>

      <div className="overflow-x-auto mt-5 mx-5">
        <Table<TableDataType>
          columns={columns}
          dataSource={tableData}
          pagination={false}
          scroll={{ x: "max-content" }}
          className="text-xs md:text-sm"
          loading={loading}
        />
      </div>

      <Divider style={{ margin: "16px 0" }} />

      <div className="flex justify-center md:justify-end mb-2">
        <button
          onClick={saveData}
          className="w-[62px] h-[32px] text-[12px] md:text-[14px] leading-[20px] md:leading-[22px] text-white bg-[#408634] border border-[#408634] px-[15px] py-[4px] rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
