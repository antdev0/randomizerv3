import { icons } from "lucide-react";

export type IconName = keyof typeof icons;

export interface IconProps {
    name: IconName;
    color?: string;
    size?: number | string;
    onClick?: () => void;
    className?: string;
}

const Icon = ({ name, color = 'currentColor', size = 24, className, onClick }: IconProps) => {
    const LucideIcon = icons[name];
    return <LucideIcon color={color} size={size} onClick={onClick} className={className} />;
};

export default Icon;
