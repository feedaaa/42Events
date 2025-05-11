// Mock authentication functions
// In a real application, this would connect to a database and use NextAuth.js

// Sample user data
const usersData = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@university.edu",
    password: "password123", // In a real app, this would be hashed
    isAdmin: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@university.edu",
    password: "password123", // In a real app, this would be hashed
    isAdmin: false,
    image: "/placeholder.svg?height=40&width=40",
  },
]

// Mock function to get the current user
export async function getCurrentUser() {
  // In a real app, this would check the session
  // For demo purposes, we'll just return the admin user

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return usersData[0]
}

// Mock function to authenticate a user
export async function authenticateUser(email: string, password: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const user = usersData.find((user) => user.email === email && user.password === password)

  if (!user) {
    return null
  }

  // In a real app, we would create a session here
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    image: user.image,
  }
}
