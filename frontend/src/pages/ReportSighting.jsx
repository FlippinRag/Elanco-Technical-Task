import { useState } from 'react'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const ukCities = [
  'London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool', 'Newcastle',
  'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Cardiff', 'Leicester',
  'Nottingham', 'Southampton'
]

const tickSpecies = [
  { name: 'Marsh tick', latin: 'Ixodes apronophorus' },
  { name: 'Southern rodent tick', latin: 'Ixodes acuminatus' },
  { name: 'Passerine tick', latin: 'Dermacentor frontalis' },
  { name: 'Tree-hole tick', latin: 'Ixodes arboricola' },
  { name: 'Fox/badger tick', latin: 'Ixodes canisuga' },
]

function ReportSighting() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    species: '',
    notes: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.date) {
      newErrors.date = 'Please select a date'
    } else if (new Date(formData.date) > new Date()) {
      newErrors.date = 'Date cannot be in the future'
    }

    if (!formData.time) newErrors.time = 'Please select a time'
    if (!formData.location) newErrors.location = 'Please select a location'
    if (!formData.species) newErrors.species = 'Please select a species'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`)
      const selectedSpecies = tickSpecies.find(s => s.name === formData.species)

      await addDoc(collection(db, 'sightings'), {
        date: Timestamp.fromDate(dateTime),
        location: formData.location,
        species: formData.species,
        latinName: selectedSpecies.latin,
        notes: formData.notes || '',
        createdAt: Timestamp.now(),
      })

      setSubmitStatus('success')
      setFormData({ date: '', time: '', location: '', species: '', notes: '' })

    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Report a Sighting
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Help us track tick activity across the UK
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-xl p-4 mb-6">
          <p className="text-green-800 dark:text-green-300 font-semibold">
            ✓ Sighting reported successfully!
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-xl p-4 mb-6">
          <p className="text-red-800 dark:text-red-300 font-semibold">
            × Failed to submit. Please try again.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white ${
                errors.date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Time *
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white ${
                errors.time ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Location *
          </label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white ${
              errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select a city</option>
            {ukCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Species *
          </label>
          <select
            name="species"
            value={formData.species}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white ${
              errors.species ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select a species</option>
            {tickSpecies.map(species => (
              <option key={species.name} value={species.name}>
                {species.name} ({species.latin})
              </option>
            ))}
          </select>
          {errors.species && <p className="text-red-600 text-sm mt-1">{errors.species}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Notes (optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Any additional details..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({ date: '', time: '', location: '', species: '', notes: '' })
              setErrors({})
            }}
            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReportSighting