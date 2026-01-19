import { cn } from "@ask-the-stars/ui";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  gradient?: boolean;
  hoverEffect?: boolean;
}

export const GlassCard = ({
  className,
  children,
  gradient = false,
  hoverEffect = true,
  ...props
}: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "glass rounded-xl p-6 transition-colors duration-300",
        gradient && "bg-gradient-to-br from-white/5 to-transparent",
        hoverEffect && "glass-hover cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
