import { NextResponse } from 'next/server'

// Sample user data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor' },
]

interface User {
  id: number
  name: string
  email: string
  role: string
}

// GET /api/users
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    
    let filteredUsers = users
    if (role) {
      filteredUsers = users.filter(user => user.role.toLowerCase() === role.toLowerCase())
    }
    
    return NextResponse.json({
      success: true,
      data: filteredUsers,
      count: filteredUsers.length,
      message: 'Users retrieved successfully'
    })
  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'Failed to fetch users' 
      },
      { status: 500 }
    )
  }
}

// POST /api/users
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, role } = body
    
    // Basic validation
    if (!name || !email || !role) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation Error',
          message: 'Name, email, and role are required' 
        },
        { status: 400 }
      )
    }
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Conflict',
          message: 'User with this email already exists' 
        },
        { status: 409 }
      )
    }
    
    // Create new user
    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      role
    }
    
    users.push(newUser)
    
    return NextResponse.json(
      {
        success: true,
        data: newUser,
        message: 'User created successfully'
      },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'Failed to create user' 
      },
      { status: 500 }
    )
  }
}

// PUT /api/users
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, email, role } = body
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation Error',
          message: 'User ID is required' 
        },
        { status: 400 }
      )
    }
    
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not Found',
          message: 'User not found' 
        },
        { status: 404 }
      )
    }
    
    // Update user
    if (name) users[userIndex].name = name
    if (email) users[userIndex].email = email
    if (role) users[userIndex].role = role
    
    return NextResponse.json({
      success: true,
      data: users[userIndex],
      message: 'User updated successfully'
    })
  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'Failed to update user' 
      },
      { status: 500 }
    )
  }
}

// DELETE /api/users
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation Error',
          message: 'User ID is required' 
        },
        { status: 400 }
      )
    }
    
    const userIndex = users.findIndex(user => user.id === parseInt(id))
    if (userIndex === -1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not Found',
          message: 'User not found' 
        },
        { status: 404 }
      )
    }
    
    const deletedUser = users.splice(userIndex, 1)[0]
    
    return NextResponse.json({
      success: true,
      data: deletedUser,
      message: 'User deleted successfully'
    })
  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'Failed to delete user' 
      },
      { status: 500 }
    )
  }
}
