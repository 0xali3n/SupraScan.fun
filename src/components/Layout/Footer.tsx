import { Twitter, Github, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-100 via-red-100/40 to-orange-100/40 border-t border-gray-200">
      <div className="relative">
        {/* Background Decorations - made darker and more visible */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-200 rounded-full mix-blend-multiply filter blur-xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-white/50 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {/* About Section */}
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-200"></div>
                  <div className="relative flex items-center">
                    <img
                      src="/sf.png"
                      alt="SupraScan"
                      className="h-6 sm:h-8 w-6 sm:w-8 mr-2"
                    />
                    <div className="flex items-baseline">
                      <span className="text-lg sm:text-xl font-bold text-gray-900">
                        SupraScan
                      </span>
                      <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text animate-pulse">
                        .fun
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
              <p className="mt-4 text-sm text-gray-600">
                The premier blockchain explorer for the Supra network. Track
                assets, pools, and transactions with ease.
              </p>
              <div className="mt-6 flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  href="https://x.com/suprascan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-red-50 to-orange-50 p-2 rounded-full text-red-500 hover:text-red-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-red-50 to-orange-50 p-2 rounded-full text-red-500 hover:text-red-600 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-red-50 to-orange-50 p-2 rounded-full text-red-500 hover:text-red-600 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
                Networks
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-center">
                  <span className="text-base text-gray-500">Mainnet</span>
                  <span className="ml-2 text-xs bg-gradient-to-r from-red-100 to-orange-100 text-red-600 px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                </li>
                <motion.li whileHover={{ x: 2 }}>
                  <a
                    href="#"
                    className="text-base text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Testnet
                  </a>
                </motion.li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
                Resources
              </h3>
              <ul className="mt-4 space-y-4">
                <motion.li whileHover={{ x: 2 }}>
                  <a
                    href="#"
                    className="text-base text-gray-500 hover:text-red-500 flex items-center group transition-colors"
                  >
                    Documentation
                    <ExternalLink className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 2 }}>
                  <a
                    href="#"
                    className="text-base text-gray-500 hover:text-red-500 flex items-center group transition-colors"
                  >
                    API Service
                    <ExternalLink className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
                Contact
              </h3>
              <ul className="mt-4 space-y-4">
                <motion.li whileHover={{ x: 2 }}>
                  <a
                    href="mailto:suprascan.fun@gmail.com"
                    className="text-base text-gray-500 hover:text-red-500 transition-colors"
                  >
                    suprascan.fun@gmail.com
                  </a>
                </motion.li>
                <li className="text-base text-gray-500">
                  Available 24/7 for support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar - made darker */}
      <div className="bg-gradient-to-r from-red-100/30 to-orange-100/30 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 backdrop-blur-sm">
          <p className="text-xs sm:text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} SupraScan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
