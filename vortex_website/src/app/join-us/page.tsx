// app/join-us/page.tsx

export default function JoinUsPage() {
  const teams = [
    {
      name: 'Software',
      subtitle: 'THE BRAINS OF THE OPERATION',
      description: 'The Embedded Systems lead is in charge for development of embedded electronics and distributed software for microcontrollers, and have a deep understanding of how data is exchanged between processors and MCUs, as well as I/O and control.',
      secondDescription: 'Control lead has primary responsibility to control plan creation. It determines the methods of the drones used to be contract of control rule to ensure a fast control time, dynamic movement, and proper tracking. The control team must understand many different control algorithms and use them wisely.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      color: 'bg-[#1a1a1a]'
    },
    {
      name: 'Mechanical',
      subtitle: 'HARDWARE',
      description: 'The Electronics team lead is responsible for the electrical development of the electrical systems of the drone. It is involved in every part of the work between the Electronics team and the rest of the organization, while also communicating and coordinating directly with the Perception team, while also working to obtain the requirements needed to be fulfilled for both competitions and underwater operations and has a major impact on the success of the project.',
      secondDescription: 'The Mechanical team lead is responsible for guiding the team through various design processes relating to the physical design of the drone and its structure. This team is responsible for ensuring that the drone meets requirements relating to both competitions and underwater operations and has a major impact on the success of the project.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
      color: 'bg-[#2d1a1a]'
    },
    {
      name: 'Electronics',
      subtitle: 'HARDWARE',
      description: 'The Electronics team lead is responsible for the technical development of the electrical systems of the drone. It is involved in every part of the work between the Electronics team and the rest of the organization, while also communicating and coordinating directly with the Perception team.',
      secondDescription: 'The Mechanical team lead is responsible for guiding the team through various design processes relating to the physical design of the drone and its structure. This team is responsible for ensuring that the drone meets requirements relating to both competitions and underwater operations and has a major impact on the success of the project.',
      image: 'https://images.unsplash.com/photo-1581092918484-8313e1f7f5d5?w=600&h=400&fit=crop',
      color: 'bg-[#1a1a1a]'
    },
    {
      name: 'Marketing',
      subtitle: 'CREATIVE',
      description: 'The Web Lead is responsible for development, maintenance, and long term vision of Vortex NTNU\'s website. The role involves keeping the Website Developed team and overseeing the transition from Wix to a fully self-developed website using React or Laravel.',
      secondDescription: 'Some of the work includes redesigning the website, long term vision, and some idea/code delegating tasks.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
      color: 'bg-[#2d1a1a]'
    }
  ];

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      
      {/* Hero Section */}
      <section 
        className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')",
        }}
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-8 text-white">JOIN THE TEAM!</h1>
          <button className="px-8 py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors">
            TEAM LEAD 2027 APPLICATION
          </button>
        </div>
      </section>

      {/* Explore Teams Section */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-8 text-white">Explore our different teams</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {teams.map((team, index) => (
              <div key={index} className="bg-[#262626] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
                <img 
                  src={team.image} 
                  alt={team.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg">{team.name}</h3>
                  <p className="text-gray-400 text-sm mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. All great, Lorem ipsum dolor sit amet, Lorem ipsum sit amet. Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Details Sections */}
      {teams.map((team, index) => (
        <section key={index} className={`${team.color} py-16`}>
          <div className="max-w-7xl mx-auto px-8">
            <div className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2">
                <div className="bg-red-600 inline-block px-6 py-2 mb-4">
                  <h3 className="text-2xl font-bold text-white">{team.name}</h3>
                </div>
                <p className="text-sm font-semibold text-gray-400 mb-4">{team.subtitle}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{team.description}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{team.secondDescription}</p>
              </div>
              <div className="w-full md:w-1/2">
                <img 
                  src={team.image} 
                  alt={team.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
