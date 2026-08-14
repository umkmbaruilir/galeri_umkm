import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: LucideIcon;
  bgClass: string;
}

export default function StatsCard({ title, value, subtitle, icon: Icon, bgClass }: StatsCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl p-6 text-white shadow-md ${bgClass}`}>
      {/* Konten Utama */}
      <div className="relative z-10">
        <h3 className="text-4xl font-bold mb-1">{value}</h3>
        <p className="text-sm font-medium mb-3">{title}</p>
        
        {/* Garis Pemisah */}
        <div className="h-0.5 w-full bg-white/30 mb-3 rounded-full"></div>
        
        <p className="text-xs font-medium text-white/90">{subtitle}</p>
      </div>
      
      {/* Ikon Background Faded */}
      <Icon className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-20 transform -rotate-12" />
    </div>
  );
}