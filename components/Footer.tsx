import Link from "next/link";

function FooterLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="32"
        height="32"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="18" cy="10" r="5.5" fill="white" />
        <path d="M7 32 C7 24 11 20 18 20 C25 20 29 24 29 32" fill="white" />
        <path d="M9 32 C9 26 13 22.5 18 22.5 C23 22.5 27 26 27 32" fill="white" />
        <path
          d="M14 21.5 L18 27 L22 21.5 C20.5 20.5 19 20 18 20 C17 20 15.5 20.5 14 21.5Z"
          fill="#22c55e"
        />
        <path
          d="M13.5 21 L18 26.5 L14.5 23 C14 22.2 13.7 21.6 13.5 21Z"
          fill="#16a34a"
        />
      </svg>
      <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
        <span className="text-white">Green</span>
        <span style={{ color: "#22c55e" }}>Kollar</span>
      </span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div className="col-span-1">
            <FooterLogo />
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Jobs for the Green Economy
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Connecting the next generation of workers with sustainable, impactful careers.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Blog</Link></li>
              <li><Link href="/blog/category/Green%20Jobs%20%26%20Hiring%20Tips" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Hiring Tips</Link></li>
              <li><Link href="/blog/category/Industry%20News%20%26%20Trends" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Industry News</Link></li>
              <li><Link href="/blog/category/Company%20Spotlights" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Company Spotlights</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-green-400 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Twitter / X</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Instagram</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-green-400 transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} GreenKollar. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
