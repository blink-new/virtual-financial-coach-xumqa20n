import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, TrendingUp, Target, CreditCard } from 'lucide-react'

interface QuickStatsProps {
  monthlyIncome: number
  monthlyExpenses: number
  totalSavings: number
  activeGoals: number
}

export function QuickStats({ monthlyIncome, monthlyExpenses, totalSavings, activeGoals }: QuickStatsProps) {
  const netIncome = monthlyIncome - monthlyExpenses
  const savingsRate = monthlyIncome > 0 ? ((netIncome / monthlyIncome) * 100) : 0

  const stats = [
    {
      title: 'Monthly Income',
      value: `$${monthlyIncome.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Monthly Expenses',
      value: `$${monthlyExpenses.toLocaleString()}`,
      icon: CreditCard,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Total Savings',
      value: `$${totalSavings.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Goals',
      value: activeGoals.toString(),
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              {stat.title === 'Monthly Income' && (
                <p className="text-xs text-gray-500 mt-1">
                  Savings rate: {savingsRate.toFixed(1)}%
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}