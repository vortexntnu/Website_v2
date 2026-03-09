// app/contact/page.tsx

export default function ContactPage() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      
      {/* Hero Section */}
      <section 
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')",
        }}
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-white">CONTACT US</h1>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="bg-[#0a0a0a] py-16">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white">Get in Touch</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-white">Address</h3>
                <p className="text-gray-400">Klæbuveien 153</p>
                <p className="text-gray-400">7031 Trondheim</p>
                <p className="text-gray-400">Norway</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-white">Email</h3>
                <a href="mailto:post@vortexntnu.no" className="text-red-600 hover:text-red-500">
                  post@vortexntnu.no
                </a>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-white">Organization Number</h3>
                <p className="text-gray-400">919924851</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <span className="text-white">f</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <span className="text-white">in</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <span className="text-white">ig</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <span className="text-white">yt</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded text-white focus:outline-none focus:border-red-600"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded text-white focus:outline-none focus:border-red-600"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 text-white">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded text-white focus:outline-none focus:border-red-600"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded text-white focus:outline-none focus:border-red-600"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
