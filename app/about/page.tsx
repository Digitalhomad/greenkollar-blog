import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About GreenKollar — Jobs for the Green Economy",
  description: "GreenKollar connects the next generation of workers with sustainable, impactful careers in clean energy, climate tech, and the broader green economy.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#071307] overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-100 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-green-500/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            🌿 Our Mission
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Jobs for the <span className="text-gradient-green">Green Economy</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            GreenKollar connects the next generation of workers with sustainable, impactful careers — from solar installation to climate policy to green finance.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl mb-4">🌱</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Why We Exist</h2>
            <p className="text-gray-500 leading-relaxed">
              The green economy is one of the fastest-growing sectors in the world — but finding your place in it can be overwhelming. GreenKollar cuts through the noise, connecting job seekers directly with employers who are building a more sustainable future.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Who We Serve</h2>
            <p className="text-gray-500 leading-relaxed">
              From entry-level tradespeople entering solar installation to seasoned engineers pivoting into climate tech — GreenKollar is built for the entire green-collar workforce, at every stage of their career.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl mb-4">📰</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>The Blog</h2>
            <p className="text-gray-500 leading-relaxed">
              Our editorial team publishes weekly insights covering green job trends, hiring tips, company spotlights, and industry news — everything you need to navigate and grow your career in the green economy.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl mb-4">🤝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>For Employers</h2>
            <p className="text-gray-500 leading-relaxed">
              Green employers use GreenKollar to reach mission-aligned candidates who are excited about sustainability — not just looking for any job. Post a role and tap into a community that cares.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-10 text-white text-center mb-20">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            The green economy is growing. Fast.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "312K+", label: "Green jobs tracked" },
              { value: "34%", label: "YoY solar job growth" },
              { value: "10K+", label: "Newsletter readers" },
              { value: "3", label: "Content categories" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-bold mb-1">{value}</div>
                <div className="text-green-100 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Ready to find your green career?
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Browse thousands of green jobs, or read our latest career insights to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-green-500/30"
            >
              Find Green Jobs →
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-green-300 text-gray-700 hover:text-green-700 font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
