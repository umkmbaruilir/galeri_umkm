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

interface ChartProps {
  data: {
    name: string;
    umkm: number;
  }[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: any) => {
  if (
    active &&
    payload &&
    payload.length
  ) {
    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border">
        <p className="text-sm text-gray-500 mb-1">
          {label}
        </p>

        <p className="font-bold">
          {payload[0].value} UMKM
        </p>
      </div>
    );
  }

  return null;
};

export default function DashboardChart({
  data,
}: ChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="colorUmkm"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#321fdb"
                stopOpacity={0.3}
              />

              <stop
                offset="95%"
                stopColor="#321fdb"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            content={<CustomTooltip />}
          />

          <Area
            type="monotone"
            dataKey="umkm"
            stroke="#321fdb"
            strokeWidth={3}
            fill="url(#colorUmkm)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}