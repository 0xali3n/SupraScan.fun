import { Twitter, Github, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1">
            <div className="flex items-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-200"></div>
                <div className="relative flex items-center">
                  <img src="/sf.png" alt="SupraScan" className="h-8 w-8 mr-2" />
                  <div className="flex items-baseline">
                    <span className="text-lg font-bold text-gray-900">
                      SupraScan
                    </span>
                    <span className="text-lg font-bold bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
                      .fun
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              The premier blockchain explorer for the Supra network. Track
              assets, pools, and transactions with ease.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Networks
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center">
                <span className="text-base text-gray-500">Mainnet</span>
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-red-500"
                >
                  Testnet
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-red-500 flex items-center group"
                >
                  Documentation
                  <ExternalLink className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-red-500 flex items-center group"
                >
                  API Service
                  <ExternalLink className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="mailto:support@suprascan.fun"
                  className="text-base text-gray-500 hover:text-red-500"
                >
                  support@suprascan.fun
                </a>
              </li>
              <li className="text-base text-gray-500">
                Available 24/7 for support
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} SupraScan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
