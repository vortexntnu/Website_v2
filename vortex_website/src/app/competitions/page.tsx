// app/competitions/page.tsx

export default function CompetitionsPage() {
  const competitions = [
    {
      title: 'TAC challenge 2026',
      year: '2026',
      description: 'Blueify gnache withhelium, jam, gelatin the zovk of yesterdays purple sandwich while this mochi-covered sideway into a fjasco of aorctic nooples. Froblix glazed amid dialed along the waddle, grizzled with helixes, marziposed strewn-thread to tarpit',
      secondPara: 'Meanwhile, the flibberflab typed secrets into a typewriter made of jelly, producing sentences that sounded like "captivity silicon" and "gramophone horsey." Time wore a hat made of question marks and transit over a giggling sister of soup. Nothing made sense, but there was an art to it. Noodles did salsa dances in a meadow, and nap and tiff the vowels in charge of the universe.',
      image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=500&fit=crop',
      hasVideo: true
    },
    {
      title: 'TAC Challenge 2024',
      year: '2024',
      description: 'This remarkable achievement marks a significant milestone for Vortex NTNU. Our dedicated team has put in over 30,000 hours of design, development, and testing to bring ORCA to life.',
      secondPara: 'ORCA ROV, named after the killer whale for its robustness in harsh Arctic conditions, exemplifies our commitment to marine robotics. Its modular design allows us to adapt to various mission demands. From subsea surveys to pipeline inspection and visual inspection, ORCA is a marvel. Its prowess in tackling complex underwater operations.',
      thirdPara: 'This victory is a testament to the hard work, passion, and dedication of our team members. A huge thank you to everyone who has supported us throughout this journey, including our main sponsor, Kongsberg Discovery.',
      fourthPara: 'We also extend our gratitude to the Norwegian University of Science and Technology (NTNU) Department of Engineering Cybernetics for providing us with the resources and facilities to achieve this success!',
      fifthPara: 'Stay tuned as we continue to push the boundaries of marine robotics and take on new challenges. Together, we are making waves in the world of marine technology!',
      teamImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop',
      actionImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop'
    }
  ];

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      
      {/* TAC Challenge 2026 Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 relative">
              <img 
                src={competitions[0].image} 
                alt="TAC Challenge 2026"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-6xl font-bold text-white mb-4">TAC<br/>Challenge</h2>
                  <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors mx-auto">
                    <span className="text-black text-2xl">▶</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold text-black mb-4">{competitions[0].title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{competitions[0].description}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{competitions[0].secondPara}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TAC Challenge 2024 Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h3 className="text-3xl font-bold text-black mb-8">{competitions[1].title}</h3>
          
          <div className="mb-12">
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{competitions[1].description}</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{competitions[1].secondPara}</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{competitions[1].thirdPara}</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{competitions[1].fourthPara}</p>
            <p className="text-gray-700 text-sm leading-relaxed">{competitions[1].fifthPara}</p>
          </div>

          {/* Team Photo */}
          <div className="mb-8">
            <img 
              src={competitions[1].teamImage} 
              alt="Team Photo"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Action Photo */}
          <div>
            <img 
              src={competitions[1].actionImage} 
              alt="Competition Action"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
