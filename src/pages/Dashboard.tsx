import { useState, useEffect } from 'react'
import { QuickStats } from '@/components/dashboard/QuickStats'
import { FinancialHealthScore } from '@/components/dashboard/FinancialHealthScore'
import { SpendingChart } from '@/components/dashboard/SpendingChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { blink } from '@/blink/client'
import type { Transaction, Goal } from '@/types'

export function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const user = await blink.auth.me()
      
      // Load recent transactions
      const recentTransactions = await blink.db.transactions?.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        limit: 100
      }) || []

      // Load goals
      const userGoals = await blink.db.goals?.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      }) || []

      setTransactions(recentTransactions)
      setGoals(userGoals)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate stats from transactions
  const currentMonth = new Date().toISOString().slice(0, 7)
  const monthlyTransactions = transactions.filter(t => t.date.startsWith(currentMonth))
  
  const monthlyIncome = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const monthlyExpenses = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalSavings = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0) - 
    transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  // Calculate spending by category
  const spendingByCategory = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)

  const spendingData = Object.entries(spendingByCategory).map(([category, amount]) => ({
    category,
    amount,
    color: '#10B981'
  }))

  // Calculate financial health score
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0
  const budgetAdherence = 85 // Mock data
  const debtRatio = 20 // Mock data
  const emergencyFund = 60 // Mock data
  
  const healthScore = Math.round((savingsRate + budgetAdherence + (100 - debtRatio) + emergencyFund) / 4)

  const insights = [
    {
      type: 'tip' as const,
      title: 'Great job on saving!',
      description: `You've saved ${savingsRate.toFixed(1)}% of your income this month.`,
      icon: CheckCircle,
      color: 'text-emerald-600'
    },
    {
      type: 'warning' as const,
      title: 'High dining expenses',
      description: 'Your food spending is 15% above average this month.',
      icon: AlertTriangle,
      color: 'text-yellow-600'
    },
    {
      type: 'achievement' as const,
      title: 'Goal progress',
      description: `You're ${goals.length > 0 ? '65%' : '0%'} closer to your savings goal!`,
      icon: TrendingUp,
      color: 'text-blue-600'
    }
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Your financial overview at a glance</p>
      </div>

      <QuickStats
        monthlyIncome={monthlyIncome}
        monthlyExpenses={monthlyExpenses}
        totalSavings={Math.max(0, totalSavings)}
        activeGoals={goals.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialHealthScore
          score={healthScore}
          trend="up"
          factors={{
            budgetAdherence,
            savingsRate: Math.max(0, savingsRate),
            debtRatio,
            emergencyFund
          }}
        />

        {spendingData.length > 0 ? (
          <SpendingChart data={spendingData} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-gray-500">No expenses recorded this month</p>
                <Button className="mt-4 bg-emerald-500 hover:bg-emerald-600">
                  Add Your First Expense
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Icon className={`w-5 h-5 mt-0.5 ${insight.color}`} />
                  <div>
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}