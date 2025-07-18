'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function FeaturesDemo() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const features = [
    {
      id: 1,
      category: 'performance',
      title: 'Image Optimization',
      description: 'Automatic image optimization with Next.js Image component',
      icon: '🖼️',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      category: 'seo',
      title: 'SEO Metadata',
      description: 'Dynamic metadata generation for better search visibility',
      icon: '🔍',
      color: 'bg-green-500'
    },
    {
      id: 3,
      category: 'routing',
      title: 'App Router',
      description: 'Modern routing with server components and streaming',
      icon: '🛣️',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      category: 'data',
      title: 'Data Fetching',
      description: 'Server-side data fetching with automatic caching',
      icon: '📊',
      color: 'bg-orange-500'
    },
    {
      id: 5,
      category: 'performance',
      title: 'Code Splitting',
      description: 'Automatic code splitting for optimal performance',
      icon: '⚡',
      color: 'bg-yellow-500'
    },
    {
      id: 6,
      category: 'styling',
      title: 'CSS Solutions',
      description: 'Multiple styling options including Tailwind CSS',
      icon: '🎨',
      color: 'bg-pink-500'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Features' },
    { id: 'performance', name: 'Performance' },
    { id: 'seo', name: 'SEO' },
    { id: 'routing', name: 'Routing' },
    { id: 'data', name: 'Data' },
    { id: 'styling', name: 'Styling' }
  ]

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const itemsPerPage = 4
  const totalPages = Math.ceil(filteredFeatures.length / itemsPerPage)
  const currentFeatures = filteredFeatures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors">
                  ← Back to Home
                </Link>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Features Demo</h1>
              </div>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filter */}
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search features..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    🔍
                  </div>
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentFeatures.map((feature, index) => (
              <div
                key={feature.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        feature.category === 'performance' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        feature.category === 'seo' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        feature.category === 'routing' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                        feature.category === 'data' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {feature.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mb-8">
              <nav className="flex items-center space-x-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-2 text-sm font-medium border ${
                      currentPage === index + 1
                        ? 'text-blue-600 bg-blue-50 border-blue-300 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </nav>
            </div>
          )}

          {/* Demo Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Image Optimization Demo */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Image Optimization</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Image
                      src="/next.svg"
                      alt="Next.js Logo"
                      width={120}
                      height={24}
                      className="mx-auto mb-2 dark:invert"
                      priority
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Optimized Image</p>
                  </div>
                  <div className="text-center">
                    <Image
                      src="/vercel.svg"
                      alt="Vercel Logo"
                      width={120}
                      height={24}
                      className="mx-auto mb-2 dark:invert"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-300">With Blur Placeholder</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-medium mb-2">Features:</p>
                  <ul className="space-y-1">
                    <li>• Automatic WebP/AVIF conversion</li>
                    <li>• Lazy loading by default</li>
                    <li>• Responsive image sizing</li>
                    <li>• Blur placeholder support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Performance Metrics</h2>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">First Contentful Paint</span>
                    <span className="text-sm text-green-600 dark:text-green-400">1.2s</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Largest Contentful Paint</span>
                    <span className="text-sm text-blue-600 dark:text-blue-400">2.1s</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Cumulative Layout Shift</span>
                    <span className="text-sm text-purple-600 dark:text-purple-400">0.05</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* API Routes Demo */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">API Routes</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Available Endpoints</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">GET</span>
                      <code className="text-gray-600 dark:text-gray-300">/api/users</code>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium">POST</span>
                      <code className="text-gray-600 dark:text-gray-300">/api/users</code>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded text-xs font-medium">PUT</span>
                      <code className="text-gray-600 dark:text-gray-300">/api/users/[id]</code>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded text-xs font-medium">DELETE</span>
                      <code className="text-gray-600 dark:text-gray-300">/api/users/[id]</code>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Test API Endpoints
                </button>
              </div>
            </div>

            {/* SEO Features */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">SEO Features</h2>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Dynamic Meta Tags</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Open Graph Protocol</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Twitter Cards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Structured Data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Sitemap Generation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Robots.txt</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>SEO Score:</strong> 95/100
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2 dark:bg-gray-600">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  )
}
