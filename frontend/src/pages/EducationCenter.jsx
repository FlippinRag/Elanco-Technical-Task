import { useState } from 'react'
import marshTick from '../assets/marsh-tick.webp'
import southernRodentTick from '../assets/Southern-rodent-tick.webp'
import passerineTick from '../assets/Passerine-tick.webp'
import treeHoleTick from '../assets/tree-hole-tick.webp'
import foxBadgerTick from '../assets/Fox-badger-tick.webp'

const tickSpecies = [
  {
    id: 1,
    name: 'Marsh tick',
    latin: 'Ixodes apronophorus',
    description: 'Commonly found in wetland areas and marshes. Often found on birds and small mammals.',
    habitat: 'Marshes, wetlands, damp grasslands',
    season: 'Spring to Autumn (March - November)',
    risks: 'Can transmit Lyme disease and other bacterial infections',
    color: '#3B82F6',
    size: '3-4mm when unfed',
    image: marshTick,
  },
  {
    id: 2,
    name: 'Southern rodent tick',
    latin: 'Ixodes acuminatus',
    description: 'Primarily feeds on small rodents like mice and voles. Found in woodland areas.',
    habitat: 'Woodlands, hedgerows, gardens',
    season: 'Year-round, most active Spring-Summer',
    risks: 'Lower risk to humans but can carry rodent-borne diseases',
    color: '#10B981',
    size: '2-3mm when unfed',
    image: southernRodentTick,
  },
  {
    id: 3,
    name: 'Passerine tick',
    latin: 'Dermacentor frontalis',
    description: 'Primarily feeds on birds. Can be found in areas with high bird activity.',
    habitat: 'Gardens, parks, bird feeding areas',
    season: 'Spring to early Summer (April - July)',
    risks: 'Rare human contact, mainly affects birds',
    color: '#F59E0B',
    size: '4-5mm when unfed',
    image: passerineTick,
  },
  {
    id: 4,
    name: 'Tree-hole tick',
    latin: 'Ixodes arboricola',
    description: 'Found in tree cavities and woodland areas. Associated with bird nests.',
    habitat: 'Tree holes, woodlands, forest edges',
    season: 'Spring-Summer (April - August)',
    risks: 'Low human contact risk',
    color: '#8B5CF6',
    size: '3-4mm when unfed',
    image: treeHoleTick,
  },
  {
    id: 5,
    name: 'Fox/badger tick',
    latin: 'Ixodes canisuga',
    description: 'Common on foxes, badgers, and domestic dogs. Found in areas frequented by these animals.',
    habitat: 'Woodlands, fields, urban parks',
    season: 'Year-round, peaks in Spring and Autumn',
    risks: 'Can transmit diseases to pets and occasionally humans',
    color: '#EF4444',
    size: '4-6mm when unfed',
    image: foxBadgerTick,
  },
]

const preventionTips = [
  {
    category: 'Outdoor Activities',
    icon: '🥾',
    tips: [
      'Wear long sleeves and trousers when walking in grassy or wooded areas',
      'Tuck trousers into socks to create a barrier',
      'Stick to clear paths and avoid brushing against vegetation',
      'Wear light-colored clothing to spot ticks more easily',
    ],
  },
  {
    category: 'Tick Repellents',
    icon: '🛡️',
    tips: [
      'Use insect repellent containing DEET or Icaridin on exposed skin',
      'Treat clothing and gear with permethrin spray',
      'Reapply repellent according to product instructions',
      'Consider natural alternatives like eucalyptus oil for sensitive skin',
    ],
  },
  {
    category: 'After Outdoor Activities',
    icon: '🔍',
    tips: [
      'Check your entire body for ticks within 2 hours of being outdoors',
      'Pay special attention to armpits, groin, behind knees, and hairline',
      'Shower or bathe soon after coming indoors',
      'Put outdoor clothes in a hot dryer for 10 minutes to kill any ticks',
    ],
  },
  {
    category: 'Pet Protection',
    icon: '🐕',
    tips: [
      'Check pets for ticks after walks, especially around ears and paws',
      'Use veterinary-approved tick prevention treatments',
      'Keep grass cut short in gardens and yards',
      'Create a tick-safe zone with wood chips or gravel around play areas',
    ],
  },
]

const tickRemovalSteps = [
  {
    step: 1,
    title: 'Use Fine-Tipped Tweezers',
    description: 'Use clean, fine-tipped tweezers to grasp the tick as close to the skin surface as possible.',
  },
  {
    step: 2,
    title: 'Pull Upward with Steady Pressure',
    description: "Pull upward with steady, even pressure. Don't twist or jerk the tick as this can cause parts to break off.",
  },
  {
    step: 3,
    title: 'Clean the Area',
    description: 'After removing the tick, clean the bite area and your hands with rubbing alcohol or soap and water.',
  },
  {
    step: 4,
    title: 'Dispose of the Tick',
    description: 'Dispose of the tick by flushing it down the toilet or placing it in alcohol. Never crush a tick with your fingers.',
  },
  {
    step: 5,
    title: 'Monitor for Symptoms',
    description: 'Watch for symptoms like rash, fever, or flu-like illness for several weeks. Seek medical attention if symptoms develop.',
  },
]

function EducationCenter() {
  const [selectedSpecies, setSelectedSpecies] = useState(null)

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Education Center
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Learn about tick species, prevention methods, and how to stay safe outdoors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800">
          <div className="text-4xl mb-2">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Check Within 2 Hours
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Ticks need to be attached for 24-36 hours to transmit disease. Early removal greatly reduces risk.
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800">
          <div className="text-4xl mb-2">🌳</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Peak Season
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Tick activity is highest from March to October in the UK, especially in woodland areas.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-800">
          <div className="text-4xl mb-2">🏥</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Lyme Disease
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Around 3,000 cases of Lyme disease are reported annually in the UK. Early detection is key.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Tick Species Identification
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Learn to identify the five most common tick species found in the UK
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {tickSpecies.map((species) => (
            <div
              key={species.id}
              onClick={() => setSelectedSpecies(species)}
              className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer transition-all hover:shadow-lg"
              style={{ borderLeftWidth: '6px', borderLeftColor: species.color }}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                  {species.name}
                </h4>
                <div
                  className="w-6 h-6 rounded-full flex-shrink-0"
                  style={{ backgroundColor: species.color }}
                ></div>
              </div>
              
              <div className="mb-3 bg-gray-100 dark:bg-gray-900 rounded-lg p-3 flex items-center justify-center">
                <img 
                  src={species.image} 
                  alt={species.name}
                  className="w-full h-32 object-contain"
                />
              </div>
              
              <p className="text-sm italic text-gray-600 dark:text-gray-400 mb-2">
                {species.latin}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {species.description}
              </p>
              <button className="text-sm text-blue-60 font-semibold hover:underline">
                Learn more →
              </button>
            </div>
          ))}
        </div>

        {selectedSpecies && (
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border-2 border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {selectedSpecies.name}
                </h4>
                <p className="text-lg italic text-gray-600 dark:text-gray-400">
                  {selectedSpecies.latin}
                </p>
              </div>
              <button
                onClick={() => setSelectedSpecies(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl ml-4"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <img 
                    src={selectedSpecies.image} 
                    alt={selectedSpecies.name}
                    className="w-full h-48 object-contain"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <div>
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Description:
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedSpecies.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Size:
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedSpecies.size}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Active Season:
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedSpecies.season}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Habitat:
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedSpecies.habitat}
                  </p>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Health Risks:
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedSpecies.risks}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Prevention Tips
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Follow these guidelines to protect yourself and your family from tick bites
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {preventionTips.map((category, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{category.icon}</div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                  {category.category}
                </h4>
              </div>
              <ul className="space-y-2">
                {category.tips.map((tip, tipIndex) => (
                  <li
                    key={tipIndex}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          How to Safely Remove a Tick
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          If you find a tick attached to your skin, follow these steps for safe removal
        </p>

        <div className="space-y-4">
          {tickRemovalSteps.map((item) => (
            <div
              key={item.step}
              className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {item.step}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-800 dark:text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h4 className="font-bold text-red-800 dark:text-red-400 mb-2">
                When to Seek Medical Attention
              </h4>
              <ul className="space-y-1 text-red-700 dark:text-red-300">
                <li>• If you develop a rash, especially a bulls-eye pattern</li>
                <li>• If you experience fever, chills, or flu-like symptoms</li>
                <li>• If the tick was attached for more than 24 hours</li>
                <li>• If you cannot remove the entire tick</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-4">Need More Information?</h3>
        <p className="mb-4">
          For more detailed information about Lyme disease and tick-borne illnesses, visit these trusted resources:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.nhs.uk/conditions/lyme-disease/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            NHS - Lyme Disease
          </a>
          <a
            href="https://www.gov.uk/government/collections/lyme-disease-guidance-data-and-analysis"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            UK Government Resources
          </a>
        </div>
      </div>
    </div>
  )
}

export default EducationCenter