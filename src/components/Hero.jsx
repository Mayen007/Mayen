import { motion as Motion } from "framer-motion";
import { FiMapPin, FiGithub, FiExternalLink, FiCode, FiArrowUpRight } from "react-icons/fi";
import { useGitHubUser } from "../hooks";

/**
 * Hero Component - Viewport stable with 4 text elements max
 */
export const Hero = () => {
  const { data: user, isLoading } = useGitHubUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-[100dvh] flex items-center justify-center relative overflow-x-hidden bg-white dark:bg-zinc-950 w-full pt-20 pb-12 md:pt-24 md:pb-16">
      {/* Background Mesh Texture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 dark:hidden opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute inset-0 hidden dark:block opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main Container */}
      <Motion.div
        className="container-custom relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Exactly 4 Hero Text Elements (col-span-7) */}
          <div className="lg:col-span-7 text-left space-y-5">
            {/* Element 1: Status Badge */}
            <Motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                AVAILABLE FOR Q3/Q4 COMMISSIONS
              </span>
            </Motion.div>

            {/* Element 2: 2-Line Desktop Display Headline */}
            <Motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.02] uppercase"
            >
              MAYEN AKECH<br />
              <span className="text-blue-600 dark:text-blue-500">INTERFACE ARCHITECT.</span>
            </Motion.h1>

            {/* Element 3: Subtext Copy (14 words) */}
            <Motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-zinc-300 max-w-lg leading-relaxed font-normal"
            >
              Building high-performance React web applications, Node.js services, and high-craft UI engineering in Nairobi.
            </Motion.p>

            {/* Element 4: Action CTAs */}
            <Motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => scrollToSection("#projects")}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs sm:text-sm uppercase font-bold tracking-wider rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>EXPLORE WORK</span>
                <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => scrollToSection("#contact")}
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gray-300 dark:border-zinc-700 hover:border-blue-600 dark:hover:border-blue-500 text-gray-900 dark:text-white font-mono text-xs sm:text-sm uppercase font-bold tracking-wider rounded-xl transition-all"
              >
                <span>GET IN TOUCH</span>
              </button>
            </Motion.div>
          </div>

          {/* Right Column: Profile Card with Folded Tech Stack (col-span-5) */}
          <Motion.div
            variants={itemVariants}
            className="lg:col-span-5 w-full"
          >
            <div className="glass-card rounded-3xl p-6 relative overflow-hidden group border-2 border-blue-500/20">
              {/* Saturated Accent Top Bar */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-blue-600" />

              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-5">
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.name || "Mayen Akech"}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-blue-500 p-0.5 bg-white dark:bg-zinc-900 shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl">
                    MA
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight uppercase tracking-tight">
                    {user?.name || "Mayen Akech"}
                  </h3>
                  <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                    @Mayen007
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500 dark:text-zinc-400 mt-1">
                    <FiMapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span>{user?.location || "Nairobi, Kenya"}</span>
                  </div>
                </div>
              </div>

              {/* GitHub Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-gray-50 dark:bg-zinc-950/80 border border-gray-200/80 dark:border-zinc-800 mb-4 text-center">
                <div>
                  <div className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono">
                    {isLoading ? "..." : user?.public_repos || 0}
                  </div>
                  <div className="text-[10px] font-mono font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest mt-0.5">
                    REPOS
                  </div>
                </div>
                <div className="border-x border-gray-200 dark:border-zinc-800">
                  <div className="text-xl font-black text-gray-900 dark:text-white font-mono">
                    {isLoading ? "..." : user?.followers || 0}
                  </div>
                  <div className="text-[10px] font-mono font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest mt-0.5">
                    FOLLOWERS
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black text-gray-900 dark:text-white font-mono">
                    {isLoading ? "..." : user?.following || 0}
                  </div>
                  <div className="text-[10px] font-mono font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest mt-0.5">
                    FOLLOWING
                  </div>
                </div>
              </div>

              {/* Tech Stack Row Folded Into Card */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {["REACT", "TYPESCRIPT", "PYTHON", "NODE.JS", "MONGODB", "TAILWIND"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider rounded-md bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-zinc-200 border border-gray-200/70 dark:border-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Quick Info & Social Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200/70 dark:border-zinc-800 text-xs">
                <span className="text-gray-500 dark:text-zinc-400 font-mono flex items-center gap-1.5 font-medium">
                  <FiCode className="w-3.5 h-3.5 text-blue-500" /> Full-Stack IT Student
                </span>
                <a
                  href="https://github.com/Mayen007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-mono font-bold uppercase tracking-wider"
                >
                  <FiGithub className="w-3.5 h-3.5" />
                  GitHub
                  <FiExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </Motion.div>
        </div>
      </Motion.div>
    </section>
  );
};
