// app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      
      {/* Hero Section */}
      <section 
        className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600')",
        }}
      >
        <div className="text-center max-w-4xl px-8">
          <h1 className="text-5xl font-bold mb-4 text-white">Anchor Into Our Mission</h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-[#0a0a0a] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1581092918484-8313e1f7f5d5?w=800&h=500&fit=crop" 
                alt="Our Story"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-white">Our Story</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Vortex NTNU is a student organization dedicated to the development of autonomous underwater vehicles (AUVs). 
                We are a group of passionate students from NTNU who share a common interest in robotics, engineering, 
                and marine technology.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our mission is to push the boundaries of underwater robotics while providing our members with hands-on 
                experience in a multidisciplinary team environment. Through our participation in international competitions, 
                we continuously challenge ourselves to innovate and improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO ARE WE Section */}
      <section className="bg-[#3a2a2a] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold mb-12 text-white text-center">WHO ARE WE?</h2>
          <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto mb-16">
            We are a student-run organization under NTNU (Norwegian University of Science and Technology), continuously 
            striving to develop students on a deeper level. As one of Norway's largest student robotics communities, 
            we gather expertise from students with an enormous spectrum of fields of study, from mechanical engineering 
            to technology, cybernetics, computer science and more.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Collaboration */}
            <div className="bg-[#e8b4b8] p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-black">Collaboration</h3>
              <p className="text-gray-800 leading-relaxed">
                As we are an NTNU student-driven unit that focus on cooperation between the members and take a 
                student-led approach, we believe in a supportive attitude to promote each other's best.
              </p>
            </div>

            {/* Recognition */}
            <div className="bg-[#d4a5aa] p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-black">Recognition</h3>
              <p className="text-gray-800 leading-relaxed">
                At a design and innovation approach is a part of what we do and everything that we do, whether it 
                be the work, as one-of-a-kind solutions solve the teams approach by tailoring and recognize individual 
                strengths. These solutions depend the idea and let the best for creativity.
              </p>
            </div>

            {/* Bridging */}
            <div className="bg-[#c49195] p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-black">Bridging</h3>
              <p className="text-gray-800 leading-relaxed">
                We work on projects that bridge the gap between theory and practice in a way that's best for us. 
                Vortex NTNU wants to foster the connection but, create a space for students to get more real world engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Many streams, one powerful current */}
      <section className="bg-[#0a0a0a] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold mb-8 text-white text-center">Many streams, one powerful current.</h2>
          
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4 text-white">Membership Distribution</h3>
            <p className="text-gray-300 mb-6">
              Our team consists of a diverse group of individuals from various backgrounds, all united by the same goal: 
              to participate in international AUV competitions and build autonomous underwater vehicles. We have technical 
              team leads in key areas who each own a set of one or more of our technical subteams.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-white">Technical Distribution</h4>
                <table className="w-full text-left text-gray-300">
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Software</td>
                      <td className="py-2 text-right">45</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Electronics</td>
                      <td className="py-2 text-right">20</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Mechanical</td>
                      <td className="py-2 text-right">25</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Marketing</td>
                      <td className="py-2 text-right">10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4 text-white">Experience</h4>
                <table className="w-full text-left text-gray-300">
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">1st Year</td>
                      <td className="py-2 text-right">30</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">2nd Year</td>
                      <td className="py-2 text-right">25</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">3rd Year</td>
                      <td className="py-2 text-right">20</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">4th+ Year</td>
                      <td className="py-2 text-right">25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Each year's journey */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold mb-12 text-white text-center">Each year's journey</h2>
          
          <div className="space-y-16">
            {/* Semester 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3">
                <div className="bg-red-600 inline-block px-4 py-2 mb-4">
                  <h3 className="text-2xl font-bold text-white">Semester 1</h3>
                </div>
                <p className="text-sm text-gray-400 mb-2">Mid-august to Late-December</p>
                <p className="text-gray-300 leading-relaxed">
                  Fall semester starts in mid-august until late december, and involves onboarding new members 
                  and setting up teams for the academic year. Key activities include team lead selection, 
                  initial project planning, new member training, and submarine concept phase. 
                  Both returning and new members go through this.
                </p>
              </div>
              <div className="w-full md:w-2/3">
                <div className="bg-[#0a0a0a] p-6 rounded-lg flex items-center justify-center h-64">
                  <span className="text-6xl text-red-600 font-bold">VORTEX</span>
                </div>
              </div>
            </div>

            {/* Winter Break */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-start">
              <div className="w-full md:w-1/3">
                <div className="bg-red-600 inline-block px-4 py-2 mb-4">
                  <h3 className="text-2xl font-bold text-white">Winter Break</h3>
                </div>
                <p className="text-sm text-gray-400 mb-2">January</p>
                <p className="text-gray-300 leading-relaxed">
                  Winter break allows team members to rest. Some members choose to work during this time, 
                  and we use this time to do a final integration push and ensure we're ready to demo during 
                  the spring semester.
                </p>
              </div>
              <div className="w-full md:w-2/3">
                <div className="bg-[#0a0a0a] p-6 rounded-lg flex items-center justify-center h-64">
                  <span className="text-6xl text-red-600 font-bold">VORTEX</span>
                </div>
              </div>
            </div>

            {/* Semester 2 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3">
                <div className="bg-red-600 inline-block px-4 py-2 mb-4">
                  <h3 className="text-2xl font-bold text-white">Semester 2/Exam</h3>
                </div>
                <p className="text-sm text-gray-400 mb-2">Mid-January to June</p>
                <p className="text-gray-300 leading-relaxed">
                  After the holiday, we get on prototyping our solutions. Students get going again in 
                  mid-january and work all the way up to June. This also includes, intense testing, 
                  refinement of the AUV, and preparing for the summer competition. It is a busy but rewarding time!
                </p>
              </div>
              <div className="w-full md:w-2/3">
                <div className="bg-[#0a0a0a] p-6 rounded-lg flex items-center justify-center h-64">
                  <span className="text-6xl text-red-600 font-bold">VORTEX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}