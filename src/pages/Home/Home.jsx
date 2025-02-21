import { motion } from "framer-motion"
import { Link } from "react-router"

const HomePage = () => {
  const title = "Build Your Customizable Calculator"
  const titleArray = title.split("")
  const middleIndex = Math.floor(titleArray.length / 2)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="h-full overflow-hidden">
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mb-8 text-main dark:text-blue-400 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {titleArray.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            style={{
              display: "inline-block",
              marginLeft: letter === " " ? "0.5em" : "0",
            }}
            transition={{
              type: "spring",
              damping: 12,
              stiffness: 200,
              delay: Math.abs(index - middleIndex) * 0.1,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}>
        <Link to="/auth/login">
          <span className="bg-main hover:bg-main-dark text-white font-normal tracking-wide py-3 px-6 rounded-lg text-xl transition-colors duration-200">
            Get Started
          </span>
        </Link>
      </motion.div>
      {/* <button
            className="relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-mono tracking-tighter text-white bg-gradient-to-r to-pink-500 from-purple-500 rounded-lg group">
            <span
              className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#228b22] rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span
                className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-300"></span>
            <span className="relative font-inter group-hover:text-white">ZenUI Library</span>
        </button> */}
    </div>
    </div>
  )
}

export default HomePage
