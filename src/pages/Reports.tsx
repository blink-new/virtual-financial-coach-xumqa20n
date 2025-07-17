import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react'

export function Reports() {
  const monthlyData = [
    { month: 'Jan', income: 5000, expenses: 3800, savings: 1200 },
    { month: 'Feb', income: 5200, expenses: 4100, savings: 1100 },
    { month: 'Mar', income: 5000, expenses: 3600, savings: 1400 },
    { month: 'Apr', income: 5300, expenses: 4200, savings: 1100 },
    { month: 'May', income: 5100, expenses: 3900, savings: 1200 },
    { month: 'Jun', income: 5400, expenses: 4000, savings: 1400 },
  ]

  const categoryTrends = [
    { category: 'Food & Dining', jan: 800, feb: 850, mar: 750, apr: 900, may: 820, jun: 780 },
    { category: 'Transportation', jan: 300, feb: 320, mar: 280, apr: 350, may: 310, jun: 290 },
    { category: 'Entertainment', jan: 200, feb: 180, mar: 220, apr: 250, may: 200, jun: 190 },
    { category: 'Shopping', jan: 400, feb: 450, mar: 380, apr: 520, may: 420, jun: 400 },
  ]

  const currentMonth = monthlyData[monthlyData.length - 1]
  const previousMonth = monthlyData[monthlyData.length - 2]
  
  const incomeChange = ((currentMonth.income - previousMonth.income) / previousMonth.income) * 100
  const expenseChange = ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100
  const savingsChange = ((currentMonth.savings - previousMonth.savings) / previousMonth.savings) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
        <p className="text-gray-600">Analyze your financial trends and patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-sm text-gray-600">Income Trend</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    ${currentMonth.income.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 ${
                incomeChange >= 0 ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {incomeChange >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(incomeChange).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600">Expense Trend</p>
                  <p className="text-2xl font-bold text-red-600">
                    ${currentMonth.expenses.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 ${
                expenseChange <= 0 ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {expenseChange <= 0 ? (
                  <TrendingDown className="w-4 h-4" />
                ) : (
                  <TrendingUp className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(expenseChange).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Savings Trend</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${currentMonth.savings.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 ${
                savingsChange >= 0 ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {savingsChange >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(savingsChange).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#10B981" name="Income" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Savings Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="Savings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Spending Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {categoryTrends.map((category) => {
              const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun'] as const
              const currentSpend = category.jun
              const previousSpend = category.may
              const change = ((currentSpend - previousSpend) / previousSpend) * 100
              
              return (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        ${currentSpend.toLocaleString()}
                      </span>
                      <div className={`flex items-center space-x-1 ${
                        change <= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {change <= 0 ? (
                          <TrendingDown className="w-3 h-3" />
                        ) : (
                          <TrendingUp className="w-3 h-3" />
                        )}
                        <span className="text-xs">
                          {Math.abs(change).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1 h-2">
                    {months.map((month, index) => {
                      const value = category[month]
                      const maxValue = Math.max(...months.map(m => category[m]))
                      const height = (value / maxValue) * 100
                      
                      return (
                        <div
                          key={month}
                          className="flex-1 bg-gray-200 rounded-sm relative"
                        >
                          <div
                            className="bg-blue-500 rounded-sm absolute bottom-0 w-full"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      )
                    })}
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