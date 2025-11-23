
import map from '../assets/map-thumbnail.png';

function Home({ setActiveTab }) {

    return (
        <>
            <section className="text-center py-12 px-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg mb-8">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    Track Tick Sightings Across the UK
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                    Help monitor tick populations and prevent disease outbreaks. Report sightings and view real-time data from across the country.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <button
                        className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md"
                        onClick={() => setActiveTab('map')}
                    >
                        View Map
                    </button>
                    <button
                        className="bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 border-2 border-green-600 dark:border-green-500 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 dark:hover:bg-gray-600 transition-colors duration-200"
                        onClick={() => setActiveTab('report')}
                    >
                        Report Sighting
                    </button>
                </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        Sightings Map
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        View tick activity across the UK
                    </p>
                </div>

                <div
                    className="relative cursor-pointer group"
                    style={{ height: '400px' }}
                    onClick={() => setActiveTab('map')}
                >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-green-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-green-700 transform group-hover:scale-105 transition-transform">
                            View Full Map
                        </button>
                    </div>

                    <img
                        src={map}
                        alt="Tick Sightings Map"
                        className="w-full h-full object-cover rounded-b-xl"
                    />
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900 text-center border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Click to explore detailed data with filters and species information
                    </p>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                        Why Track Ticks?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Ticks carry diseases like Lyme disease. Tracking helps identify high-risk areas and inform preventive measures.
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                        How It Works
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Report sightings with location data. View patterns on the map and learn about tick species and prevention.
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                        Community Data
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Every report contributes to understanding tick distribution and seasonal patterns across the UK.
                    </p>
                </div>
            </section>
        </>
    )
}

export default Home