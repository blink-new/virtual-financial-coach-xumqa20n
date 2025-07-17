import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Plus, Wallet } from 'lucide-react'

export function Budget() {
  const budgetCategories = [
    { category: 'Food & Dining', budgeted: 800, spent: 650, color: 'bg-orange-500' },
    { category: 'Transportation', budgeted: 300, spent: 280, color: 'bg-blue-500' },
    { category: 'Entertainment', budgeted: 200, spent: 150, color: 'bg-purple-500' },
    { category: 'Shopping', budgeted: 400, spent: 520, color: 'bg-pink-500' },
    { category: 'Bills & Utilities', budgeted: 600, spent: 580, color: 'bg-red-500' },
  ]

  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0)
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget Planner</h1>
          <p className="text-gray-600">Plan and track your monthly budget</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Budget Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Budgeted</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${totalBudgeted.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-red-600">
                  ${totalSpent.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-sm text-gray-600">Remaining</p>
                <p className={`text-2xl font-bold ${
                  totalBudgeted - totalSpent >= 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  ${(totalBudgeted - totalSpent).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetCategories.map((category) => {
              const percentage = (category.spent / category.budgeted) * 100
              const isOverBudget = category.spent > category.budgeted
              
              return (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <span className="font-medium">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
                        ${category.spent.toLocaleString()} / ${category.budgeted.toLocaleString()}
                      </div>
                      <div className={`text-sm ${isOverBudget ? 'text-red-500' : 'text-gray-500'}`}>
                        {percentage.toFixed(1)}% used
                      </div>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className={`h-2 ${isOverBudget ? '[&>div]:bg-red-500' : ''}`}
                  />
                  {isOverBudget && (
                    <p className="text-sm text-red-500">
                      Over budget by ${(category.spent - category.budgeted).toLocaleString()}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}