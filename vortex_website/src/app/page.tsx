// app/page.tsx

export default function HomePage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      
      {/* Hero Section */}
      <section 
        className="relative h-[500px] flex items-center justify-start bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 w-full">
          <h1 className="text-5xl font-bold mb-4 text-white">Developing students on a deeper level.</h1>
          <p className="text-xl text-white">Your nautical journey starts here.</p>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-[#1a1a1a] py-12">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-lg text-gray-300 italic">Inspiring quote; lorem ipsum dolor sit amet.</p>
        </div>
      </section>

      {/* Projects Grid - 4 Cards */}
      <section className="bg-[#262626] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Orca 2024 */}
            <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
              <div className="h-64 bg-[#0a3d4d] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop')"}}></div>
              <div className="p-4">
                <h3 className="text-white font-semibold">Orca 2024</h3>
              </div>
            </div>

            {/* Freya 2023 */}
            <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
              <div className="h-64 bg-[#2d2d2d] p-4 flex flex-col justify-center">
                <p className="text-sm text-gray-300 mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className="text-sm text-gray-300 mb-2">Lorem ipsum dolor sit amet Lorem ipsum</p>
                <p className="text-sm text-gray-300">Lorem ipsum dolor sit</p>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold">Freya 2023</h3>
              </div>
            </div>

            {/* Beluga 2021 */}
            <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
              <div className="h-64 bg-[#3d3d3d] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop')"}}></div>
              <div className="p-4">
                <h3 className="text-white font-semibold">Beluga 2021</h3>
              </div>
            </div>

            {/* Manta 2018 */}
            <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
              <div className="h-64 bg-[#3d3d3d] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop')"}}></div>
              <div className="p-4">
                <h3 className="text-white font-semibold">Manta 2018</h3>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Two Large Cards Section */}
      <section className="bg-[#0a0a0a] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Welcome to Vortex */}
            <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
              <div className="h-80 bg-[#0a3d4d] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop')"}}></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-white">Welcome to Vortex</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            {/* Team Photo */}
            <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
              <div className="h-80 bg-[#2d2d2d] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop')"}}></div>
              <div className="p-6">
                <p className="text-gray-300 text-sm">
                  Our dedicated team working together to push the boundaries of underwater robotics.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Strategy Video Section */}
      <section className="bg-[#0a0a0a] py-16">
        <div className="max-w-4xl mx-auto px-8">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Vortex NTNU RoboSub Strategy Video 2022"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <p className="text-center mt-4 text-gray-400">Vortex NTNU RoboSub Strategy Video 2022</p>
        </div>
      </section>

      {/* Partners / Sponsors Section */}
      <section className="bg-[#0a0a0a] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-2xl font-semibold mb-8 text-center text-white">A word about / thanks to our partners / sponsors</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
            <div className="flex items-center justify-center h-24 w-full bg-white rounded p-4">
              <span className="font-bold text-black text-center">WÜRTH ELEKTRONIK</span>
            </div>
            <div className="flex items-center justify-center h-24 w-full bg-[#c21c1c] rounded p-4">
              <span className="font-bold text-white text-center text-2xl">K</span>
            </div>
            <div className="flex items-center justify-center h-24 w-full bg-white rounded p-4">
              <span className="font-bold text-black text-center text-xl">KONGSBERG</span>
            </div>
            <div className="flex items-center justify-center h-24 w-full bg-white rounded p-4">
              <span className="font-bold text-blue-600 text-center">WaterLinked</span>
            </div>
            <div className="flex items-center justify-center h-24 w-full bg-white rounded p-4">
              <span className="font-bold text-black text-center">NTNU</span>
            </div>
            <div className="flex items-center justify-center h-24 w-full bg-[#1a1a1a] border border-gray-700 rounded p-4">
              <span className="font-bold text-white text-center">Cyber</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section 
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')",
        }}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">WILL YOU RACE WITH US?</h2>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded hover:bg-white hover:text-black transition-colors">
              Become A Team Member
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded hover:bg-white hover:text-black transition-colors">
              Become A Partner
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            
            {/* Our Sponsors */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Our Sponsors</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Kongsberg Discovery A&amp;...</li>
                <li>NTNU – Institute for kybernatikk</li>
                <li>WaterLinked</li>
                <li>Würth Elektronik</li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Social Media</h3>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <span className="text-white text-sm">f</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <span className="text-white text-sm">in</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <span className="text-white text-sm">ig</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <span className="text-white text-sm">yt</span>
                </a>
              </div>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
              <p className="font-semibold text-white">VORTEX</p>
              <p className="text-gray-400 text-sm">Org. nr: 914034434</p>
              <p className="text-gray-400 text-sm mt-2">Email: contact@vortex.ntnu.no</p>
            </div>

          </div>

          {/* Vortex Logo */}
          <div className="text-center pt-8 border-t border-gray-800">
            <div className="text-2xl font-bold text-[#9c3737] mb-2">VORTEX</div>
            <p className="text-gray-500 text-sm">This is our territory</p>
          </div>
        </div>
      </footer>

    </main>
  );
}