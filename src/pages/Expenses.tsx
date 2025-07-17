import { useState, useEffect } from 'react'
import { ExpenseForm } from '@/components/expenses/ExpenseForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit, Calendar, DollarSign } from 'lucide-react'
import { blink } from '@/blink/client'
import type { Transaction } from '@/types'
import { format } from 'date-fns'

export function Expenses() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    try {
      const user = await blink.auth.me()
      const userTransactions = await blink.db.transactions?.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      }) || []

      setTransactions(userTransactions)
    } catch (error) {
      console.error('Failed to load transactions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExpenseAdded = (newExpense: Transaction) => {
    setTransactions(prev => [newExpense, ...prev])
  }

  const handleDeleteExpense = async (id: string) => {
    try {
      await blink.db.transactions?.delete(id)
      setTransactions(prev => prev.filter(t => t.id !== id))
    } catch (error) {
      console.error('Failed to delete expense:', error)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Food & Dining': 'bg-orange-100 text-orange-800',
      'Transportation': 'bg-blue-100 text-blue-800',
      'Shopping': 'bg-purple-100 text-purple-800',
      'Entertainment': 'bg-pink-100 text-pink-800',
      'Bills & Utilities': 'bg-red-100 text-red-800',
      'Healthcare': 'bg-green-100 text-green-800',
      'Education': 'bg-indigo-100 text-indigo-800',
      'Travel': 'bg-cyan-100 text-cyan-800',
      'Personal Care': 'bg-yellow-100 text-yellow-800',
      'Other': 'bg-gray-100 text-gray-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
        <p className="text-gray-600">Track and manage your expenses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">
                  ${totalExpenses.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-sm text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${totalIncome.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-blue-600">
                  {transactions.filter(t => 
                    t.date.startsWith(new Date().toISOString().slice(0, 7))
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No transactions yet</p>
                  <p className="text-sm text-gray-400">Add your first expense to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Badge className={getCategoryColor(transaction.category)}>
                            {transaction.category}
                          </Badge>
                          <span className={`font-medium ${
                            transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {transaction.description || 'No description'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {format(new Date(transaction.date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteExpense(transaction.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <ExpenseForm onExpenseAdded={handleExpenseAdded} />
        </div>
      </div>
    </div>
  )
}