import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Plus, Target, Calendar, DollarSign } from 'lucide-react'

export function Goals() {
  const goals = [
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 6500,
      targetDate: '2024-12-31',
      category: 'Savings',
      description: 'Build a 6-month emergency fund'
    },
    {
      id: '2',
      title: 'Vacation to Europe',
      targetAmount: 5000,
      currentAmount: 2800,
      targetDate: '2024-08-15',
      category: 'Travel',
      description: 'Two-week trip to Europe'
    },
    {
      id: '3',
      title: 'New Car Down Payment',
      targetAmount: 8000,
      currentAmount: 3200,
      targetDate: '2024-10-01',
      category: 'Transportation',
      description: 'Down payment for a reliable car'
    }
  ]

  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const overallProgress = (totalSaved / totalGoalAmount) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-gray-600">Track your progress towards financial milestones</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Active Goals</p>
                <p className="text-2xl font-bold text-blue-600">{goals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-sm text-gray-600">Total Saved</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${totalSaved.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold text-purple-600">
                  {overallProgress.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100
          const remaining = goal.targetAmount - goal.currentAmount
          const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
          
          return (
            <Card key={goal.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{goal.title}</span>
                  <span className="text-sm font-normal text-gray-500">{goal.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{goal.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${goal.currentAmount.toLocaleString()} saved</span>
                    <span>${goal.targetAmount.toLocaleString()} goal</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-4 h-4 mx-auto text-red-500 mb-1" />
                    <p className="text-sm text-gray-600">Remaining</p>
                    <p className="font-medium">${remaining.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4 mx-auto text-blue-500 mb-1" />
                    <p className="text-sm text-gray-600">Days Left</p>
                    <p className="font-medium">{daysLeft > 0 ? daysLeft : 'Overdue'}</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Add Contribution
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}