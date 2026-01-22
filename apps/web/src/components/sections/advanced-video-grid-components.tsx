import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FilterButtonProps {
    label: string;
    activeValue?: string;
    isActive: boolean;
    onClick: () => void;
    icon: ReactNode;
    colorClass?: string;
}

export const FilterButton = ({ label, activeValue, isActive, onClick, icon, colorClass = "text-white" }: FilterButtonProps) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-sm whitespace-nowrap",
            isActive || activeValue
                ? "bg-white/10 border-white/30 text-white"
                : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200"
        )}
    >
        <span className={cn("opacity-70", isActive ? colorClass : "")}>{icon}</span>
        <span className="font-medium">{label}</span>
        {activeValue && (
            <>
                <div className="w-px h-3 bg-white/20 mx-1" />
                <span className={cn("font-bold", colorClass)}>{activeValue}</span>
            </>
        )}
        <ChevronDown className={cn("w-3 h-3 opacity-50 transition-transform", isActive ? "rotate-180" : "")} />
    </button>
);

interface FilterPillProps {
    label: string;
    count?: number;
    isSelected: boolean;
    onClick: () => void;
}

export const FilterPill = ({ label, count, isSelected, onClick }: FilterPillProps) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-all group",
            isSelected
                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "bg-neutral-800/50 border-transparent text-gray-400 hover:bg-neutral-800 hover:text-white hover:border-white/20"
        )}
    >
        <span className="text-sm font-medium truncate pr-2">{label}</span>
        {count !== undefined && (
            <span className={cn(
                "text-xs font-mono px-1.5 py-0.5 rounded",
                isSelected ? "bg-black/10 text-black/70" : "bg-black/30 text-gray-500 group-hover:text-gray-300"
            )}>
                {count}
            </span>
        )}
    </button>
);
