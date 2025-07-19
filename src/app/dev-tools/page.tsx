'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

// Types
interface CustomTheme {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  border: string
  [key: string]: string
}

interface LogEntry {
  type: 'log' | 'error' | 'warn'
  message: string
  timestamp: number
}

interface PerformanceMetrics {
  memory: number
  timing: {
    domContentLoaded?: number
    loadComplete?: number
    firstPaint?: number
  }
  fps: number
  loadTime: number
}

interface MemoryInfo {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
}

interface ExtendedPerformance extends Performance {
  memory?: MemoryInfo
}

interface NavigationTiming {
  navigationStart: number
  domContentLoadedEventEnd: number
  loadEventEnd: number
  responseStart: number
}

// Theme Provider and Context
interface ThemeContextType {
  theme: string
  setTheme: (theme: string) => void
  customTheme: CustomTheme
  setCustomTheme: (theme: CustomTheme) => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme Provider Component
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('light')
  const [customTheme, setCustomTheme] = useState<CustomTheme>({
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#8b5cf6',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    border: '#e2e8f0'
  })

  useEffect(() => {
    const savedTheme = localStorage.getItem('dev-tools-theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
    
    const savedCustomTheme = localStorage.getItem('dev-tools-custom-theme')
    if (savedCustomTheme) {
      setCustomTheme(JSON.parse(savedCustomTheme))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('dev-tools-theme', theme)
    
    // Apply theme to document
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    // Apply custom theme variables
    Object.entries(customTheme).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value)
    })
  }, [theme, customTheme])

  useEffect(() => {
    localStorage.setItem('dev-tools-custom-theme', JSON.stringify(customTheme))
  }, [customTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, customTheme, setCustomTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Theme Switcher Component
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  
  const themes = [
    { id: 'light', name: 'Light', icon: '☀️' },
    { id: 'dark', name: 'Dark', icon: '🌙' },
    { id: 'auto', name: 'Auto', icon: '🌓' },
    { id: 'high-contrast', name: 'High Contrast', icon: '🎭' },
    { id: 'sepia', name: 'Sepia', icon: '📜' },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Theme Switcher
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {themes.map((themeOption) => (
          <button
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id)}
            className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
              theme === themeOption.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <span className="text-2xl">{themeOption.icon}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {themeOption.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Color Customizer Component
const ColorCustomizer = () => {
  const { customTheme, setCustomTheme } = useTheme()
  
  const colorOptions = [
    { key: 'primary', label: 'Primary', description: 'Main brand color' },
    { key: 'secondary', label: 'Secondary', description: 'Secondary elements' },
    { key: 'accent', label: 'Accent', description: 'Highlight color' },
    { key: 'background', label: 'Background', description: 'Page background' },
    { key: 'surface', label: 'Surface', description: 'Card backgrounds' },
    { key: 'text', label: 'Text', description: 'Text color' },
    { key: 'border', label: 'Border', description: 'Border color' },
  ]

  const handleColorChange = (key: string, value: string) => {
    setCustomTheme({
      ...customTheme,
      [key]: value
    })
  }

  const resetToDefaults = () => {
    setCustomTheme({
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#8b5cf6',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      border: '#e2e8f0'
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Color Customizer
        </h3>
        <button
          onClick={resetToDefaults}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Reset to defaults
        </button>
      </div>
      
      <div className="space-y-4">
        {colorOptions.map((option) => (
          <div key={option.key} className="flex items-center justify-between">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {option.label}
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {option.description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={customTheme[option.key]}
                onChange={(e) => handleColorChange(option.key, e.target.value)}
                className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={customTheme[option.key]}
                onChange={(e) => handleColorChange(option.key, e.target.value)}
                className="w-20 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Performance Monitor Component
const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    memory: 0,
    timing: {},
    fps: 0,
    loadTime: 0
  })

  useEffect(() => {
    const updateMetrics = () => {
      // Memory usage
      const perf = performance as ExtendedPerformance
      if (perf.memory) {
        setMetrics(prev => ({
          ...prev,
          memory: Math.round(perf.memory!.usedJSHeapSize / 1024 / 1024)
        }))
      }

      // Navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as unknown as NavigationTiming
      if (navigation) {
        setMetrics(prev => ({
          ...prev,
          timing: {
            domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
            loadComplete: Math.round(navigation.loadEventEnd - navigation.navigationStart),
            firstPaint: Math.round(navigation.responseStart - navigation.navigationStart),
          },
          loadTime: Math.round(navigation.loadEventEnd - navigation.navigationStart)
        }))
      }
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 1000)
    return () => clearInterval(interval)
  }, [])

  // FPS Counter
  useEffect(() => {
    let fps = 0
    let lastTime = performance.now()
    let frames = 0

    const countFPS = () => {
      frames++
      const currentTime = performance.now()
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frames * 1000) / (currentTime - lastTime))
        setMetrics(prev => ({ ...prev, fps }))
        frames = 0
        lastTime = currentTime
      }
      requestAnimationFrame(countFPS)
    }

    countFPS()
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Performance Monitor
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {metrics.memory} MB
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Memory Usage
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {metrics.fps} FPS
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Frame Rate
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {metrics.loadTime} ms
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Load Time
          </div>
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {metrics.timing.domContentLoaded || 0} ms
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            DOM Ready
          </div>
        </div>
      </div>
    </div>
  )
}

// Debug Panel Component
const DebugPanel = () => {
  const [activeTab, setActiveTab] = useState('console')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [localStorageData, setLocalStorageData] = useState<Record<string, string>>({})

  useEffect(() => {
    // Capture console logs
    const originalConsoleLog = console.log
    const originalConsoleError = console.error
    const originalConsoleWarn = console.warn

    console.log = (...args) => {
      setLogs(prev => [...prev.slice(-99), { type: 'log', message: args.join(' '), timestamp: Date.now() }])
      originalConsoleLog(...args)
    }

    console.error = (...args) => {
      setLogs(prev => [...prev.slice(-99), { type: 'error', message: args.join(' '), timestamp: Date.now() }])
      originalConsoleError(...args)
    }

    console.warn = (...args) => {
      setLogs(prev => [...prev.slice(-99), { type: 'warn', message: args.join(' '), timestamp: Date.now() }])
      originalConsoleWarn(...args)
    }

    // Get local storage data
    const storage: Record<string, string> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        storage[key] = localStorage.getItem(key) || ''
      }
    }
    setLocalStorageData(storage)

    return () => {
      console.log = originalConsoleLog
      console.error = originalConsoleError
      console.warn = originalConsoleWarn
    }
  }, [])

  const clearLogs = () => {
    setLogs([])
  }

  const clearStorage = () => {
    localStorage.clear()
    setLocalStorageData({})
  }

  const tabs = [
    { id: 'console', name: 'Console', icon: '📝' },
    { id: 'network', name: 'Network', icon: '🌐' },
    { id: 'storage', name: 'Storage', icon: '💾' },
    { id: 'elements', name: 'Elements', icon: '🏗️' },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'console' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Console Logs
              </h4>
              <button
                onClick={clearLogs}
                className="text-xs text-red-600 dark:text-red-400 hover:underline"
              >
                Clear
              </button>
            </div>
            <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm h-64 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-gray-500">No logs yet. Try interacting with the page.</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className={`mb-1 ${
                    log.type === 'error' ? 'text-red-400' : 
                    log.type === 'warn' ? 'text-yellow-400' : 
                    'text-green-400'
                  }`}>
                    <span className="text-gray-500 text-xs">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span className="ml-2">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              Network Requests
            </h4>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Network monitoring would be implemented here. This would track:
              <ul className="mt-2 space-y-1 ml-4">
                <li>• API calls and responses</li>
                <li>• Request/response times</li>
                <li>• Status codes</li>
                <li>• Request/response headers</li>
                <li>• Payload sizes</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'storage' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Local Storage
              </h4>
              <button
                onClick={clearStorage}
                className="text-xs text-red-600 dark:text-red-400 hover:underline"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-2">
              {Object.keys(localStorageData).length === 0 ? (
                <div className="text-gray-500 text-sm">No data in local storage</div>
              ) : (
                Object.entries(localStorageData).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                    <div className="font-medium text-sm text-gray-900 dark:text-white">
                      {key}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-all">
                      {value.substring(0, 100)}
                      {value.length > 100 && '...'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'elements' && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              DOM Inspector
            </h4>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              DOM element inspection would be implemented here. This would show:
              <ul className="mt-2 space-y-1 ml-4">
                <li>• Element hierarchy</li>
                <li>• Element properties</li>
                <li>• Computed styles</li>
                <li>• Event listeners</li>
                <li>• Element dimensions</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Test Component for Demo
const TestComponent = () => {
  const [count, setCount] = useState(0)
  
  const handleClick = () => {
    setCount(prev => prev + 1)
    console.log(`Button clicked! Count: ${count + 1}`)
  }

  const handleError = () => {
    console.error('This is a test error message')
  }

  const handleWarning = () => {
    console.warn('This is a test warning message')
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Test Component
      </h3>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Click counter: {count}
          </p>
          <button
            onClick={handleClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Click me ({count})
          </button>
        </div>
        
        <div className="space-x-2">
          <button
            onClick={handleError}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Test Error
          </button>
          <button
            onClick={handleWarning}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Test Warning
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DevToolsPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                🛠️ Developer Tools
              </Link>
              <Link
                href="/"
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Developer Tools & Debug Panel
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive developer tools including theme switcher, performance monitor, and debug panel for enhanced development experience.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Performance Monitor */}
            <PerformanceMonitor />

            {/* Color Customizer */}
            <ColorCustomizer />

            {/* Test Component */}
            <TestComponent />
          </div>

          {/* Debug Panel */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Debug Panel
            </h2>
            <DebugPanel />
          </div>

          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Theme Management',
                description: 'Switch between light, dark, and custom themes with real-time preview',
                icon: '🎨',
                features: ['Light/Dark modes', 'Custom color schemes', 'Auto detection', 'Theme persistence']
              },
              {
                title: 'Performance Monitor',
                description: 'Real-time performance metrics and resource usage tracking',
                icon: '⚡',
                features: ['Memory usage', 'FPS counter', 'Load times', 'DOM metrics']
              },
              {
                title: 'Debug Console',
                description: 'Comprehensive debugging tools with console logs and state inspection',
                icon: '🐛',
                features: ['Console logs', 'Error tracking', 'Network monitor', 'Storage inspector']
              },
              {
                title: 'Color Customizer',
                description: 'Live theme customization with color picker and CSS variable control',
                icon: '🌈',
                features: ['Color picker', 'Live preview', 'CSS variables', 'Theme export']
              },
              {
                title: 'Element Inspector',
                description: 'DOM element inspection and style debugging capabilities',
                icon: '🔍',
                features: ['DOM tree', 'Style inspector', 'Event listeners', 'Computed styles']
              },
              {
                title: 'Network Monitor',
                description: 'Track API requests, response times, and network performance',
                icon: '📡',
                features: ['API tracking', 'Response times', 'Status codes', 'Payload analysis']
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-1">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}
