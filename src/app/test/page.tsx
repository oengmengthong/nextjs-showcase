'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TestPage() {
  const [buttonClicks, setButtonClicks] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [progress, setProgress] = useState(0)
  const [animationRunning, setAnimationRunning] = useState(false)
  const [counter, setCounter] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => prev < 100 ? prev + 1 : 0)
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const handleButtonClick = () => {
    setButtonClicks(prev => prev + 1)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const runAnimation = () => {
    setAnimationRunning(true)
    setTimeout(() => setAnimationRunning(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Interactive Components Test
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Test all interactive elements to ensure they work correctly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Button Test */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Button Test</h2>
            <div className="space-y-4">
              <button
                onClick={handleButtonClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Click Me! ({buttonClicks})
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Open Modal
              </button>
              <button
                onClick={runAnimation}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Run Animation
              </button>
            </div>
          </div>

          {/* Counter Test */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Counter Test</h2>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {counter}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setCounter(prev => prev + 1)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  +
                </button>
                <button
                  onClick={() => setCounter(prev => prev - 1)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  -
                </button>
                <button
                  onClick={() => setCounter(0)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Animation Test */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Animation Test</h2>
            <div className="space-y-4">
              <div className={`p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg transition-all duration-500 ${animationRunning ? 'scale-110 rotate-3' : ''}`}>
                {animationRunning ? 'Animating!' : 'Click to animate'}
              </div>
              
              <div className="space-y-2">
                <div className="animate-pulse bg-blue-400 h-4 rounded"></div>
                <div className="animate-bounce bg-green-400 h-4 rounded w-3/4"></div>
                <div className="animate-ping bg-purple-400 h-4 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          {/* Progress Test */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Progress Test</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Auto Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            </div>
          </div>

          {/* Card Flip Test */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Card Flip Test</h2>
            <div className="perspective-1000">
              <div 
                className={`relative w-full h-32 transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center justify-center backface-hidden">
                  <span className="font-medium">Click to flip!</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg flex items-center justify-center backface-hidden rotate-y-180">
                  <span className="font-medium">Flipped!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Elements Test */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Interactive Elements</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-center cursor-pointer transition-colors">
                  Hover Me
                </div>
                <div className="bg-green-500 hover:scale-105 text-white p-3 rounded-lg text-center cursor-pointer transition-transform">
                  Scale Me
                </div>
                <div className="bg-purple-500 hover:shadow-lg hover:-translate-y-1 text-white p-3 rounded-lg text-center cursor-pointer transition-all">
                  Lift Me
                </div>
                <div className="bg-pink-500 hover:rotate-3 text-white p-3 rounded-lg text-center cursor-pointer transition-transform">
                  Rotate Me
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg inline-block">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Test Status</h3>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span className="text-green-600">✓ Buttons Working</span>
              <span className="text-green-600">✓ Animations Working</span>
              <span className="text-green-600">✓ Interactions Working</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Modal Test
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This modal is working correctly! You can interact with it.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
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

      {/* Custom CSS */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}
