// import { motion } from "framer-motion";
// import { memo } from "react"

// const initialState = { pathLength: 0, opacity: 0 };
// const ease = "easeInOut";

// const paths = [
//     {
//         d: "M-100 400 Q300 200 600 400 T1300 400",
//         stroke: "url(#gradient1)",
//         strokeWidth: 3,
//         animate: { pathLength: 1, opacity: 0.8 },
//         transition: { duration: 3, ease },
//     },
//     {
//         d: "M-100 500 Q400 300 700 500 T1300 500",
//         stroke: "url(#gradient2)",
//         strokeWidth: 2,
//         animate: { pathLength: 1, opacity: 0.6 },
//         transition: { duration: 4, delay: 0.5, ease },
//     },
//     {
//         d: "M-100 300 Q500 100 800 300 T1300 300",
//         stroke: "url(#gradient3)",
//         strokeWidth: 1.5,
//         animate: { pathLength: 1, opacity: 0.4 },
//         transition: { duration: 5, delay: 1, ease },
//     },
// ];

// const HolographicLines = () => (
//     <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
//         {paths.map(({ d, stroke, strokeWidth, animate, transition }) => (
//             <motion.path
//                 key={d}
//                 d={d}
//                 stroke={stroke}
//                 strokeWidth={strokeWidth}
//                 fill="none"
//                 initial={initialState}
//                 animate={animate}
//                 transition={transition}
//                 filter="url(#glow)"
//             />
//         ))}
//         <defs>
//             <filter id="glow">
//                 <feGaussianBlur stdDeviation="3" result="coloredBlur" />
//                 <feMerge>
//                     <feMergeNode in="coloredBlur" />
//                     <feMergeNode in="SourceGraphic" />
//                 </feMerge>
//             </filter>

//             <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#00ffff" stopOpacity="0" />
//                 <stop offset="50%" stopColor="#00ffff" stopOpacity="1" />
//                 <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
//             </linearGradient>

//             <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#ff6b35" stopOpacity="0" />
//                 <stop offset="50%" stopColor="#ff6b35" stopOpacity="1" />
//                 <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
//             </linearGradient>

//             <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
//                 <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
//                 <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
//             </linearGradient>
//         </defs>
//     </svg>
// );

// export default memo(HolographicLines);
