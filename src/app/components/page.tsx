'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ComponentsDemo() {
  const [activeTab, setActiveTab] = useState('buttons')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)
  const [isChecked, setIsChecked] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [buttonClickCount, setButtonClickCount] = useState(0)
  const [showToast, setShowToast] = useState(false)

  const tabs = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'forms', label: 'Forms' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'data-display', label: 'Data Display' },
    { id: 'layout', label: 'Layout' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                ← Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Components Demo</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Buttons Tab */}
          {activeTab === 'buttons' && (
            <section className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Button Variations</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Buttons</h3>
                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => {
                          setButtonClickCount(prev => prev + 1)
                          setShowToast(true)
                          setTimeout(() => setShowToast(false), 3000)
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Primary (Clicked: {buttonClickCount})
                      </button>
                      <button 
                        onClick={() => alert('Secondary button clicked!')}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Secondary
                      </button>
                      <button 
                        onClick={() => alert('Success! Operation completed.')}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Success
                      </button>
                      <button 
                        onClick={() => alert('Danger! This action cannot be undone.')}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Danger
                      </button>
                      <button 
                        onClick={() => alert('Warning! Please review your action.')}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Warning
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Outline Buttons</h3>
                    <div className="flex flex-wrap gap-4">
                      <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Primary Outline
                      </button>
                      <button className="border-2 border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Secondary Outline
                      </button>
                      <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Success Outline
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Button Sizes</h3>
                    <div className="flex flex-wrap items-center gap-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                        Small
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Medium
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors">
                        Large
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Button States</h3>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Normal
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors opacity-50 cursor-not-allowed" disabled>
                        Disabled
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Forms Tab */}
          {activeTab === 'forms' && (
            <section className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Form Elements</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Text Input
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter your text"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Input
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Password Input
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter your password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Dropdown
                      </label>
                      <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Choose an option</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Textarea
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your message"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="checkbox1"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="checkbox1" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                        I agree to the terms and conditions
                      </label>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="radio1"
                          name="radio-group"
                          value="option1"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="radio1" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                          Option 1
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="radio2"
                          name="radio-group"
                          value="option2"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="radio2" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                          Option 2
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Range Slider: {sliderValue}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderValue}
                      onChange={(e) => setSliderValue(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <section className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Feedback Components</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Alerts</h3>
                    <div className="space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 px-4 py-3 rounded-lg">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          This is an info alert with some important information.
                        </div>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Success! Your action was completed successfully.
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-lg">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Warning! Please review your input before proceeding.
                        </div>
                      </div>
                      
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          Error! Something went wrong. Please try again.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Progress Indicators</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="text-gray-600 dark:text-gray-400">Loading...</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Badges</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        New
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Active
                      </span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                        Pending
                      </span>
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                        Inactive
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Navigation Tab */}
          {activeTab === 'navigation' && (
            <section className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Navigation Components</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Breadcrumbs</h3>
                    <nav className="flex" aria-label="Breadcrumb">
                      <ol className="flex items-center space-x-1 md:space-x-3">
                        <li className="flex items-center">
                          <a href="#" className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                          </a>
                        </li>
                        <li>
                          <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <a href="#" className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700 md:ml-2 dark:text-gray-400 dark:hover:text-gray-300">
                              Components
                            </a>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-1 text-sm font-medium text-gray-900 md:ml-2 dark:text-gray-300">
                              Navigation
                            </span>
                          </div>
                        </li>
                      </ol>
                    </nav>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pagination</h3>
                    <nav className="flex justify-center">
                      <ul className="flex items-center space-x-1">
                        <li>
                          <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Previous
                          </button>
                        </li>
                        <li>
                          <button className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                            1
                          </button>
                        </li>
                        <li>
                          <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            2
                          </button>
                        </li>
                        <li>
                          <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            3
                          </button>
                        </li>
                        <li>
                          <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Data Display Tab */}
          {activeTab === 'data-display' && (
            <section className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Data Display Components</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              John Doe
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              john@example.com
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              Admin
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Active
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              Jane Smith
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              jane@example.com
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              User
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                Pending
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Card Title
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          This is a sample card with some content to demonstrate the card component.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Action
                        </button>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Success Card
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              With icon
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          This card includes an icon and demonstrates different card layouts.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md p-6 text-white">
                        <h4 className="text-lg font-semibold mb-2">
                          Gradient Card
                        </h4>
                        <p className="text-purple-100 mb-4">
                          This card has a gradient background to show design variations.
                        </p>
                        <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Layout Tab */}
          {activeTab === 'layout' && (
            <section className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Layout Components</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Grid System</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                        <span className="text-blue-800 dark:text-blue-200 font-medium">Column 1</span>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg text-center">
                        <span className="text-green-800 dark:text-green-200 font-medium">Column 2</span>
                      </div>
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                        <span className="text-purple-800 dark:text-purple-200 font-medium">Column 3</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Flexbox Layout</h3>
                    <div className="flex flex-wrap gap-4 justify-between items-center bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded">
                        <span className="text-red-800 dark:text-red-200 font-medium">Flex Item 1</span>
                      </div>
                      <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded">
                        <span className="text-yellow-800 dark:text-yellow-200 font-medium">Flex Item 2</span>
                      </div>
                      <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded">
                        <span className="text-indigo-800 dark:text-indigo-200 font-medium">Flex Item 3</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Container</h3>
                    <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <p className="text-gray-600 dark:text-gray-300 text-center">
                        This is a container component that centers content with a maximum width.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Button clicked successfully!
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Modal Title
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This is a modal dialog. You can put any content here.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  )
}
