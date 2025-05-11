// Mock data and functions for categories
// In a real application, this would connect to a database

// Sample categories data
const categoriesData = [
  { value: "academic", label: "Academic" },
  { value: "arts", label: "Arts & Culture" },
  { value: "athletics", label: "Athletics" },
  { value: "career", label: "Career & Professional" },
  { value: "community", label: "Community Service" },
  { value: "conference", label: "Conference" },
  { value: "cultural", label: "Cultural" },
  { value: "entertainment", label: "Entertainment" },
  { value: "health", label: "Health & Wellness" },
  { value: "networking", label: "Networking" },
  { value: "research", label: "Research" },
  { value: "social", label: "Social" },
  { value: "student-life", label: "Student Life" },
  { value: "workshop", label: "Workshop & Training" },
]

// Mock function to fetch all categories
export async function fetchCategories() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return categoriesData
}

// Mock function to get a category by value
export async function getCategoryByValue(value: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  return categoriesData.find((category) => category.value === value) || null
}
