import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"
import { motion } from "framer-motion"

export const AuthorProfile = () => {

  const urls = {
    github: "https://github.com/kensunjaya",
    linkedin: "https://www.linkedin.com/in/kenneth-sunjaya",
    instagram: "https://www.instagram.com/kensunjaya",
  }

  return (
  <div className="fixed bottom-8 left-8 font-play text-xl text-secondary z-[15] space-y-2 hover:cursor-default">
    <div className="font-semibold">Creator</div>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-fit h-fit items-center flex flex-row space-x-2"
      onClick={() => window.open(urls.github, "_blank")}
    >
      <FaGithub className="text-2xl" />
      <span>{"kensunjaya"}</span>
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-fit h-fit items-center flex flex-row space-x-2"
      onClick={() => window.open(urls.linkedin, "_blank")}
    >
      <FaLinkedin className="text-2xl" />
      <span>{"kenneth-sunjaya"}</span>
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-fit h-fit items-center flex flex-row space-x-2"
      onClick={() => window.open(urls.instagram, "_blank")}
    >
      <FaInstagram className="text-2xl" />
      <span>{"kensunjaya"}</span>
    </motion.button>
  </div>
  )
}