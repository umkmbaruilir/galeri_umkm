"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', umkm: 2 },
  { name: 'Feb', umkm: 5 },
  { name: 'Mar', umkm: 8 },
  { name: 'Apr', umkm: 12 },
  { name: 'Mei', umkm: 15 },
  { name: 'Jun', umkm: 20 },
];

// Custom Tooltip yang lebih elegan saat di-hover
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-coreui-darkCard p-3 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{`Periode: ${label}`}</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-coreui-primary"></div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            {payload[0].value} UMKM Baru
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function DashboardChart() {
  return (
    <div className="h-[300px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          {/* Efek Gradasi Warna */}
          <defs>
            <linearGradient id="colorUmkm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#321fdb" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#321fdb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f3f4f6" className="dark:stroke-gray-800" />
          
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 500}} 
            dy={10} 
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 500}} 
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e5e7eb', strokeWidth: 2, strokeDasharray: '4 4' }} />
          
          <Area 
            type="monotone" // Membuat garis menjadi melengkung (smooth)
            dataKey="umkm" 
            stroke="#321fdb" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorUmkm)" 
            activeDot={{ r: 6, fill: '#321fdb', stroke: '#fff', strokeWidth: 3 }} // Titik saat di hover
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}