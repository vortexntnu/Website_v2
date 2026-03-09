// app/projects/page.tsx

export default function ProjectsPage() {
  const projects = [
    {
      name: 'ORCA',
      year: '2024',
      description: 'Our new waterproof all-electric drone. Designed for April 2024. Built for extreme underwater exploration with fully autonomous behavior in mind.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      side: 'right'
    },
    {
      name: 'FREYA',
      year: '2023',
      description: 'Freya was the first formed drone in 2023 and in 2022 she rested except our longest rival team. Freya has Lemon-Magnesium design language pack for the best.',
      image: 'https://images.unsplash.com/photo-1581091870621-191ca4e5c2e3?w=600&h=400&fit=crop',
      side: 'left'
    },
    {
      name: 'BELUGA',
      year: '2021',
      description: 'Beluga was created in 2021 and a few summers, a addition to the team color. It is the first underwater drone we\'ve developed with fully autonomous behavior in mind.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
      side: 'right'
    },
    {
      name: 'MANTA',
      year: '2018',
      description: 'Manta started as the era ROV but was converted to an AUV when installing from the MATE ROV competition to the RoboSub AUV competition.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
      side: 'left'
    },
    {
      name: 'TERRAPIN',
      year: '2017',
      description: 'Terrapin was the second installment, and had seen two years of testing, accepted by its predecessor.',
      image: 'https://images.unsplash.com/photo-1581092918484-8313e1f7f5d5?w=600&h=400&fit=crop',
      side: 'right'
    },
    {
      name: 'MAELSTROM',
      year: '2016',
      description: 'Maelstrom was the first drone we created, and was a great learning experience from experience to present.',
      image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&h=400&fit=crop',
      side: 'left'
    }
  ];

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      
      {/* Hero Section */}
      <section 
        className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1581092918484-8313e1f7f5d5?w=1600')",
        }}
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-white">Our Drones</h1>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-[#1a1a1a] py-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-8 justify-center flex-wrap">
            <button className="text-white hover:text-red-600 font-semibold">ORCA</button>
            <button className="text-white hover:text-red-600">FREYA</button>
            <button className="text-white hover:text-red-600">BELUGA</button>
            <button className="text-white hover:text-red-600">MANTA</button>
            <button className="text-white hover:text-red-600">TERRAPIN</button>
            <button className="text-white hover:text-red-600">MAELSTROM</button>
          </div>
          <div className="flex gap-4 justify-center mt-4 text-sm text-gray-400">
            <span>2024</span>
            <span>2023</span>
            <span>2021</span>
            <span>2018</span>
            <span>2017</span>
            <span>2016</span>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-[#0a0a0a] py-16 relative">
        <div className="max-w-5xl mx-auto px-8">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-600 h-full"></div>
          
          {projects.map((project, index) => (
            <div key={index} className={`mb-20 flex ${project.side === 'left' ? 'flex-row-reverse' : 'flex-row'} items-center gap-8`}>
              {/* Content Side */}
              <div className={`w-1/2 ${project.side === 'left' ? 'text-left pl-8' : 'text-right pr-8'}`}>
                <h3 className="text-3xl font-bold text-red-600 mb-2">{project.name} {project.year}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{project.description}</p>
                <button className="text-red-600 hover:text-red-500 font-semibold">Read More</button>
              </div>
              
              {/* Dot on Timeline */}
              <div className="w-4 h-4 bg-red-600 rounded-full z-10 relative"></div>
              
              {/* Image Side */}
              <div className={`w-1/2 ${project.side === 'left' ? 'pr-8' : 'pl-8'}`}>
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
