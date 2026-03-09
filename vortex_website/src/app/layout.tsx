import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Vortex NTNU",
  description: "Vortex NTNU - Developing students on a deeper level",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-[#1a1a1a] border-b border-gray-800 sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-red-600 text-2xl font-bold">
                VORTEX
              </Link>
            </div>
            <div className="flex gap-8 items-center">
              <Link href="/" className="text-white hover:text-red-600 transition-colors">
                HOME
              </Link>
              <Link href="/about" className="text-white hover:text-red-600 transition-colors">
                ABOUT
              </Link>
              <Link href="/team" className="text-red-600 hover:text-red-500 transition-colors">
                TEAM
              </Link>
              <Link href="/join-us" className="text-white hover:text-red-600 transition-colors">
                JOIN US
              </Link>
              <Link href="/projects" className="text-white hover:text-red-600 transition-colors">
                PROJECTS
              </Link>
              <Link href="/competitions" className="text-white hover:text-red-600 transition-colors">
                COMPETITIONS
              </Link>
              <Link href="/contact" className="text-white hover:text-red-600 transition-colors">
                CONTACT
              </Link>
              <Link 
                href="/join-us" 
                className="px-4 py-2 bg-transparent border-2 border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors"
              >
                JOIN US
              </Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="bg-[#0a0a0a] border-t border-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Our Sponsors</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Kongsberg Discovery A&amp;S</li>
                  <li>NTNU – Institute for kybernatikk</li>
                  <li>WaterLinked</li>
                  <li>Würth Elektronik</li>
                  <li>StatoilASO</li>
                  <li>Norconsult</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Social Media</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <span className="text-white text-sm">f</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <span className="text-white text-sm">in</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <span className="text-white text-sm">ig</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <span className="text-white text-sm">yt</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
                <p className="text-gray-400 text-sm">Addresses:</p>
                <p className="text-gray-400 text-sm">Klæbuveien 153,</p>
                <p className="text-gray-400 text-sm mb-4">7031 Trondheim</p>
                <p className="text-gray-400 text-sm">Email:</p>
                <p className="text-gray-400 text-sm">post@vortexntnu.no</p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <div className="text-red-600 text-3xl font-bold">VORTEX</div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">Org. nr. 919924851</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
