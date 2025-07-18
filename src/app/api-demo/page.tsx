'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ApiResponse {
  data: Record<string, unknown> | null;
  loading: boolean;
  error: string | null;
}

export default function DataFetchingPage() {
  const [swrData, setSwrData] = useState<ApiResponse>({ data: null, loading: false, error: null });
  const [reactQueryData, setReactQueryData] = useState<ApiResponse>({ data: null, loading: false, error: null });
  const [graphqlData, setGraphqlData] = useState<ApiResponse>({ data: null, loading: false, error: null });
  const [fetchStrategy, setFetchStrategy] = useState('rest');

  // Simulate SWR-like data fetching
  const fetchWithSWR = async () => {
    setSwrData({ data: null, loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = {
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        ],
        cached: true,
        timestamp: new Date().toISOString()
      };
      setSwrData({ data, loading: false, error: null });
    } catch {
      setSwrData({ data: null, loading: false, error: 'Failed to fetch data' });
    }
  };

  // Simulate React Query data fetching
  const fetchWithReactQuery = async () => {
    setReactQueryData({ data: null, loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const data = {
        posts: [
          { id: 1, title: 'First Post', content: 'This is the first post content' },
          { id: 2, title: 'Second Post', content: 'This is the second post content' },
        ],
        stale: false,
        refetchTime: new Date().toISOString()
      };
      setReactQueryData({ data, loading: false, error: null });
    } catch {
      setReactQueryData({ data: null, loading: false, error: 'Failed to fetch data' });
    }
  };

  // Simulate GraphQL data fetching
  const fetchWithGraphQL = async () => {
    setGraphqlData({ data: null, loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = {
        user: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          posts: [
            { id: 1, title: 'GraphQL Post', content: 'Learning GraphQL' },
            { id: 2, title: 'Apollo Client', content: 'Using Apollo Client' },
          ],
          profile: {
            bio: 'Full-stack developer',
            location: 'San Francisco',
            website: 'https://johndoe.com'
          }
        },
        query: `
          query GetUser($id: ID!) {
            user(id: $id) {
              id
              name
              email
              posts {
                id
                title
                content
              }
              profile {
                bio
                location
                website
              }
            }
          }
        `
      };
      setGraphqlData({ data, loading: false, error: null });
    } catch {
      setGraphqlData({ data: null, loading: false, error: 'GraphQL query failed' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              ← Data Fetching
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
            Data Fetching Patterns
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            SWR, React Query, Apollo GraphQL, and fetch strategies
          </p>
        </div>

        {/* Strategy Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Choose Fetching Strategy
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFetchStrategy('rest')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                fetchStrategy === 'rest'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              REST API
            </button>
            <button
              onClick={() => setFetchStrategy('swr')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                fetchStrategy === 'swr'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              SWR
            </button>
            <button
              onClick={() => setFetchStrategy('reactquery')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                fetchStrategy === 'reactquery'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              React Query
            </button>
            <button
              onClick={() => setFetchStrategy('graphql')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                fetchStrategy === 'graphql'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              GraphQL
            </button>
          </div>
        </div>

        {/* Data Fetching Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* SWR Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SWR</h3>
              <button
                onClick={fetchWithSWR}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Fetch
              </button>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 text-sm font-mono">
              npm install swr
            </div>
            {swrData.loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            )}
            {swrData.error && (
              <div className="text-red-600 text-sm py-2">{swrData.error}</div>
            )}
            {swrData.data && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-sm">
                <pre className="text-gray-700 dark:text-gray-300">
                  {JSON.stringify(swrData.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* React Query Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">React Query</h3>
              <button
                onClick={fetchWithReactQuery}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
              >
                Fetch
              </button>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 text-sm font-mono">
              npm install @tanstack/react-query
            </div>
            {reactQueryData.loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              </div>
            )}
            {reactQueryData.error && (
              <div className="text-red-600 text-sm py-2">{reactQueryData.error}</div>
            )}
            {reactQueryData.data && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-sm">
                <pre className="text-gray-700 dark:text-gray-300">
                  {JSON.stringify(reactQueryData.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* GraphQL Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Apollo GraphQL</h3>
              <button
                onClick={fetchWithGraphQL}
                className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
              >
                Query
              </button>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 text-sm font-mono">
              npm install @apollo/client graphql
            </div>
            {graphqlData.loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              </div>
            )}
            {graphqlData.error && (
              <div className="text-red-600 text-sm py-2">{graphqlData.error}</div>
            )}
            {graphqlData.data && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-sm">
                <pre className="text-gray-700 dark:text-gray-300">
                  {JSON.stringify(graphqlData.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Implementation Examples
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">SWR Hook</h4>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  return <div>Hello {data.name}!</div>
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">React Query Hook</h4>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`import { useQuery } from '@tanstack/react-query'

function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then((res) => res.json())
  })

  if (isLoading) return 'Loading...'
  if (error) return 'An error occurred'
  return (
    <div>
      {data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Apollo GraphQL Query</h4>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`import { useQuery, gql } from '@apollo/client'

const GET_USERS = gql\`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
\`

function Users() {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      {data.users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Native Fetch</h4>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`import { useState, useEffect } from 'react'

function DataComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return <div>{JSON.stringify(data)}</div>
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
