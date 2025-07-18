'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PerformancePage() {
  const [imageOptimization, setImageOptimization] = useState(false);
  const [lazyLoading, setLazyLoading] = useState(false);
  const [codesplitting, setCodeSplitting] = useState(false);
  const [caching, setCaching] = useState(false);

  const performanceMetrics = {
    fcp: '1.2s',
    lcp: '2.1s',
    cls: '0.05',
    fid: '12ms',
    ttfb: '200ms'
  };

  const optimizedMetrics = {
    fcp: '0.8s',
    lcp: '1.3s',
    cls: '0.02',
    fid: '8ms',
    ttfb: '120ms'
  };

  const currentMetrics = (imageOptimization && lazyLoading && codesplitting && caching) 
    ? optimizedMetrics 
    : performanceMetrics;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              ← Performance Demo
            </Link>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Performance Optimization
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Image optimization, code splitting, lazy loading, and caching strategies
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Core Web Vitals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {currentMetrics.fcp}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                First Contentful Paint
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                {currentMetrics.lcp}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Largest Contentful Paint
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {currentMetrics.cls}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Cumulative Layout Shift
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                {currentMetrics.fid}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                First Input Delay
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                {currentMetrics.ttfb}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Time to First Byte
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Performance Optimizations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Image Optimization</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Next.js Image component with automatic WebP conversion</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={imageOptimization}
                    onChange={(e) => setImageOptimization(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Lazy Loading</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Load components and images only when needed</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lazyLoading}
                    onChange={(e) => setLazyLoading(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Code Splitting</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Automatic code splitting with dynamic imports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={codesplitting}
                    onChange={(e) => setCodeSplitting(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Caching Strategy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">ISR, SSG, and browser caching optimizations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={caching}
                    onChange={(e) => setCaching(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Image Optimization
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`import Image from 'next/image'

function MyComponent() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero Image"
      width={800}
      height={600}
      priority
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Dynamic Imports
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/heavy-component'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

function Page() {
  return <DynamicComponent />
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              ISR Configuration
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`export async function getStaticProps() {
  const data = await fetchData()
  
  return {
    props: { data },
    revalidate: 60, // ISR: revalidate every 60 seconds
  }
}

export async function getStaticPaths() {
  return {
    paths: ['/post/1', '/post/2'],
    fallback: 'blocking'
  }
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Bundle Analyzer
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  experimental: {
    optimizeCss: true,
  },
  images: {
    formats: ['image/webp'],
  },
})`}
              </pre>
            </div>
          </div>
        </div>

        {/* Performance Tips */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Best Practices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Use Next.js Image component for automatic optimization
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Implement proper caching strategies (ISR, SSG, CSR)
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Use dynamic imports for code splitting
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Minimize JavaScript bundle size
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Use CDN for static assets
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Implement lazy loading for images and components
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
