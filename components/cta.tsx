import { motion } from "framer-motion";
import TextBlur from "@/components/ui/text-blur";
import AnimatedShinyText from "@/components/ui/shimmer-text";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function CTA() {
  return (
    <motion.div
      className="flex w-full max-w-2xl flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible">

      <motion.img
        src="/logo.png"
        alt="logo"
        className="mx-auto h-16"
        variants={itemVariants}
      />

      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-3xl font-medium tracking-tighter sm:text-5xl"
          text="Transform Your Work with Generative AI"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-[36rem] pt-1.5 text-center text-base sm:text-lg"
          text="Empower your career with practical AI skills for the modern workplace"
          duration={0.8}
        />
      </motion.div>
    </motion.div>
  );
}
