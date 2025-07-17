export interface User {
  id: string
  email: string
  displayName?: string
}

export interface Transaction {
  id: string
  userId: string
  amount: number
  category: string
  description: string
  date: string
  type: 'income' | 'expense'
  createdAt: string
}

export interface Budget {
  id: string
  userId: string
  category: string
  amount: number
  spent: number
  month: string
  createdAt: string
}

export interface Goal {
  id: string
  userId: string
  title: string
  targetAmount: number
  currentAmount: number
  targetDate: string
  category: string
  description?: string
  createdAt: string
}

export interface ChatMessage {
  id: string
  userId: string
  message: string
  response: string
  timestamp: string
}

export interface FinancialInsight {
  id: string
  userId: string
  type: 'tip' | 'warning' | 'achievement'
  title: string
  description: string
  category: string
  createdAt: string
}