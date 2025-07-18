'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

export default function DatabasePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  // Simulate database operations
  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', created_at: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', created_at: '2024-01-16' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', created_at: '2024-01-17' },
    ]);
    setLoading(false);
  };

  const fetchPosts = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPosts([
      { id: 1, title: 'Getting Started with Next.js', content: 'Learn how to build modern web applications...', author: 'John Doe', created_at: '2024-01-15' },
      { id: 2, title: 'Database Integration Best Practices', content: 'Tips for working with databases in Next.js...', author: 'Jane Smith', created_at: '2024-01-16' },
      { id: 3, title: 'Building RESTful APIs', content: 'Create robust API endpoints with Next.js...', author: 'Bob Johnson', created_at: '2024-01-17' },
    ]);
    setLoading(false);
  };

  const addUser = () => {
    const newUser: User = {
      id: users.length + 1,
      name: `User ${users.length + 1}`,
      email: `user${users.length + 1}@example.com`,
      role: 'User',
      created_at: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              ← Database Integration
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
            Database Integration
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Prisma, Supabase, MongoDB, and other database solutions
          </p>
        </div>

        {/* Database Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Prisma ORM</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Type-safe database client with auto-generated queries
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-sm font-mono">
              npm install prisma @prisma/client
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Supabase</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Open-source Firebase alternative with PostgreSQL
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-sm font-mono">
              npm install @supabase/supabase-js
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">MongoDB</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              NoSQL database with flexible document structure
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-sm font-mono">
              npm install mongodb mongoose
            </div>
          </div>
        </div>

        {/* Data Demo */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Users Table
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'posts'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Posts Table
              </button>
              <button
                onClick={() => setActiveTab('schema')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'schema'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Schema
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Users</h3>
                  <button
                    onClick={addUser}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add User
                  </button>
                </div>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Loading users...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            ID
                          </th>
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
                            Created
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {user.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {user.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.role === 'Admin' 
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' 
                                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {user.created_at}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                onClick={() => deleteUser(user.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'posts' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Posts</h3>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">{post.content}</p>
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>By {post.author}</span>
                        <span>{post.created_at}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'schema' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Database Schema</h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`// Prisma Schema Example
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  role      String   @default("User")
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
