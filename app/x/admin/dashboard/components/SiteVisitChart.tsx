"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "January",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "February",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "March",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "April",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "June",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "July",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "August",
    uv: 4200,
    pv: 5200,
    amt: 2800,
  },
  {
    name: "September",
    uv: 3100,
    pv: 4100,
    amt: 2350,
  },
  {
    name: "October",
    uv: 3800,
    pv: 4900,
    amt: 2650,
  },
  {
    name: "November",
    uv: 2900,
    pv: 3700,
    amt: 2400,
  },
  {
    name: "December",
    uv: 4100,
    pv: 5500,
    amt: 2950,
  },
];

const SiteVisitChart = () => {
  return (
    <div style={{ width: "100%", height: "100%", fontSize: "8.72px" }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SiteVisitChart;
