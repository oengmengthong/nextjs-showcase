'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AnimationsDemo() {
  const [isVisible, setIsVisible] = useState(false)
  const [counter, setCounter] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [animationTrigger, setAnimationTrigger] = useState(false)
  const [flipCard, setFlipCard] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleLoadingDemo = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const triggerAnimation = () => {
    setAnimationTrigger(true)
    setTimeout(() => setAnimationTrigger(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 transition-colors">
                ← Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Animations Demo</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CSS Animations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">CSS Animations</h2>
            
            <div className="space-y-8">
              {/* Fade In */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Fade In</h3>
                <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg">
                    This element fades in on page load
                  </div>
                </div>
              </div>

              {/* Hover Effects */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hover Effects</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors duration-300 cursor-pointer">
                    Hover Color
                  </div>
                  <div className="bg-green-500 text-white p-4 rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer">
                    Hover Scale
                  </div>
                  <div className="bg-purple-500 text-white p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                    Hover Lift
                  </div>
                  <div className="bg-pink-500 text-white p-4 rounded-lg transition-all duration-300 hover:rotate-3 cursor-pointer">
                    Hover Rotate
                  </div>
                </div>
              </div>

              {/* Trigger Animation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trigger Animation</h3>
                <div className="text-center">
                  <div className={`mb-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg transition-all duration-500 ${animationTrigger ? 'scale-110 rotate-1' : ''}`}>
                    Click the button to animate me!
                  </div>
                  <button
                    onClick={triggerAnimation}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Trigger Animation
                  </button>
                </div>
              </div>

              {/* Loading Animations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Loading Animations</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">Spinner</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="animate-pulse bg-gray-300 dark:bg-gray-600 rounded h-8 w-24"></div>
                    <span className="text-gray-600 dark:text-gray-300">Pulse</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="animate-bounce bg-purple-600 rounded-full h-8 w-8"></div>
                    <span className="text-gray-600 dark:text-gray-300">Bounce</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-1">
                      <div className="animate-ping bg-purple-600 rounded-full h-2 w-2"></div>
                      <div className="animate-ping bg-purple-600 rounded-full h-2 w-2 animation-delay-200"></div>
                      <div className="animate-ping bg-purple-600 rounded-full h-2 w-2 animation-delay-400"></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">Ping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Animations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Interactive Animations</h2>
            
            <div className="space-y-8">
              {/* Button Animations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Button Animations</h3>
                <div className="space-y-4">
                  <button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    Gradient Button
                  </button>
                  
                  <button
                    className="relative overflow-hidden bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 group"
                  >
                    <span className="relative z-10">Ripple Effect</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>
                  
                  <button
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
                  >
                    Lift Button
                  </button>
                </div>
              </div>

              {/* Counter Animation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Counter Animation</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4 transition-all duration-300">
                    {counter}
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => setCounter(counter + 1)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => setCounter(counter - 1)}
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

              {/* Loading Button */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Loading States</h3>
                <div className="text-center">
                  <button
                    onClick={handleLoadingDemo}
                    disabled={isLoading}
                    className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg'
                    } text-white`}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      'Start Loading'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card Animations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Card Animations</h2>
            
            <div className="space-y-6">
              {/* Flip Card */}
              <div className="group perspective-1000">
                <div 
                  className={`relative w-full h-32 transition-transform duration-700 transform-style-3d cursor-pointer ${flipCard ? 'rotate-y-180' : ''}`}
                  onClick={() => setFlipCard(!flipCard)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center justify-center backface-hidden">
                    <span className="text-lg font-medium">Click to flip!</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg flex items-center justify-center backface-hidden rotate-y-180">
                    <span className="text-lg font-medium">Flipped! Click again.</span>
                  </div>
                </div>
              </div>

              {/* Slide In Cards */}
              <div className="space-y-4">
                {[1, 2, 3].map((item, index) => (
                  <div
                    key={item}
                    className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-4 rounded-lg transform transition-all duration-500 hover:scale-105 hover:shadow-lg"
                    style={{
                      animationDelay: `${index * 200}ms`,
                      animation: 'slideInFromLeft 0.6s ease-out forwards'
                    }}
                  >
                    <h4 className="font-semibold">Card {item}</h4>
                    <p className="text-sm opacity-90">This card slides in with a delay</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Animations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Progress Animations</h2>
            
            <div className="space-y-6">
              {/* Animated Progress Bar */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Progress Bar</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? '75%' : '0%' }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">75% Complete</div>
              </div>

              {/* Circular Progress */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Circular Progress</h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-300 dark:text-gray-700"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        className="text-purple-600 dark:text-purple-400 animate-pulse"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="60, 100"
                        strokeDashoffset="0"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">60%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skeleton Loading */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skeleton Loading</h3>
                <div className="space-y-3">
                  <div className="animate-pulse bg-gray-300 dark:bg-gray-600 rounded h-4 w-3/4"></div>
                  <div className="animate-pulse bg-gray-300 dark:bg-gray-600 rounded h-4 w-1/2"></div>
                  <div className="animate-pulse bg-gray-300 dark:bg-gray-600 rounded h-4 w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed top-20 right-4 space-y-4">
          <div className="animate-bounce bg-purple-600 text-white p-3 rounded-full shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </div>
          
          <div className="animate-pulse bg-pink-600 text-white p-3 rounded-full shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
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
        
        .group:hover .group-hover\\:rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  )
}
