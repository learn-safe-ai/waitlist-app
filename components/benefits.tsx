import { cn } from "@/lib/utils";
import {
  IconCrystalBall,
  IconCompass,
  IconSpeakerphone,
  IconSchool,
} from "@tabler/icons-react";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function Benefits() {
  const features = [
    {
      title: "Demystify AI",
      description:
        "Grasp powerful AI concepts through real-world examples, minus the jargon.",
      icon: <IconSchool />,
    },
    {
      title: "Amplify Your Productivity",
      description:
        "Master AI-driven automation to eliminate busywork so you can focus on impactful work",
      icon: <IconSpeakerphone />,
    },
    {
      title: "Navigate AI Risks",
      description:
        "Develop critical skills to identify and mitigate AI-related privacy and compliance challenges",
      icon: <IconCompass />,
    },
    {
      title: "Future-Proof Your Org",
      description: "Stay ahead with AI knowledge tailored for non-technical professionals",
      icon: <IconCrystalBall />,
    }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-5 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      // className="mt-6 flex w-full max-w-[24rem] flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
        <motion.div variants={itemVariants}>
      <div
        className={cn(
          "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
          (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
          // index < 4 && "lg:border-b dark:border-neutral-800"
        )}
      >
        {index < 4 && (
          <div className="opacity-0 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
        )}
        {index >= 4 && (
          <div className="opacity-0 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
        )}
        <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
          {icon}
        </div>
        <div className="text-lg font-bold mb-2 relative z-10 px-10">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
          <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
            {title}
          </span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
          {description}
        </p>
      </div>
      </motion.div>
    </motion.div>
  );
};
