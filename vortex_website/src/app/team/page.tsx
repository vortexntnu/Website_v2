// app/team/page.tsx

export default function TeamPage() {
  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];
  const teams = ['TEAM 1', 'TEAM 2', 'TEAM 3', 'TEAM 4', 'TEAM 5', 'TEAM 6', 'TEAM 7', 'TEAM 8', 'TEAM 9', 'TEAM 10', 'TEAM 11', 'TEAM 12', 'TEAM 13'];

  const teamMembers = [
    { name: 'Tobias Drage Nolfi', role: 'Team Leader', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' },
    { name: 'Erik Andreas Lisleö', role: 'CFO', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop' },
    { name: 'Markus Nordvik', role: 'Member', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop' },
    { name: 'Sarah Johnson', role: 'Software Lead', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop' },
    { name: 'Michael Chen', role: 'Mechanical Lead', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop' },
    { name: 'Emma Wilson', role: 'Electronics Lead', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop' },
  ];

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      
      {/* Hero Section with Background */}
      <section 
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')",
        }}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">OUR TEAM</h1>
        </div>
      </section>

      {/* Team Years Sidebar */}
      <section className="bg-[#1a1a1a] py-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-4 overflow-x-auto">
            {years.map((year, index) => (
              <button
                key={year}
                className={`px-4 py-2 whitespace-nowrap ${index === 0 ? 'text-red-600 italic font-semibold' : 'text-gray-400 hover:text-white'}`}
              >
                TEAM {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Tabs */}
      <section className="bg-[#2a1a1a] py-6">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {teams.map((team, index) => (
              <button
                key={team}
                className={`px-4 py-2 ${index === 0 ? 'text-red-600 font-semibold' : 'text-white hover:text-red-600'}`}
              >
                {team}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-[#0a0a0a] py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold mb-8 text-white">TEAM 1</h2>
          
          {/* Team Photo */}
          <div className="mb-12">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop" 
              alt="Team Photo"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Meet the Team */}
          <div className="mb-8">
            <h3 className="text-3xl font-semibold mb-8 text-white">Meet the team</h3>
            <p className="text-gray-400 mb-8">Team Description</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-white font-semibold">{member.name}</h4>
                    <p className="text-gray-400 text-sm">{member.role}</p>
                    <button className="mt-2 text-red-600 text-sm hover:text-red-500">
                      In →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
