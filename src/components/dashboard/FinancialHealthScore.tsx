import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface FinancialHealthScoreProps {
  score: number
  trend: 'up' | 'down' | 'stable'
  factors: {
    budgetAdherence: number
    savingsRate: number
    debtRatio: number
    emergencyFund: number
  }
}

export function FinancialHealthScore({ score, trend, factors }: FinancialHealthScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Improvement'
  }

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Financial Health Score
          <div className="flex items-center space-x-1">
            <TrendIcon className={`w-4 h-4 ${
              trend === 'up' ? 'text-emerald-500' : 
              trend === 'down' ? 'text-red-500' : 'text-gray-500'
            }`} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {getScoreLabel(score)}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Budget Adherence</span>
                <span>{factors.budgetAdherence}%</span>
              </div>
              <Progress value={factors.budgetAdherence} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Savings Rate</span>
                <span>{factors.savingsRate}%</span>
              </div>
              <Progress value={factors.savingsRate} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Debt Management</span>
                <span>{100 - factors.debtRatio}%</span>
              </div>
              <Progress value={100 - factors.debtRatio} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Emergency Fund</span>
                <span>{factors.emergencyFund}%</span>
              </div>
              <Progress value={factors.emergencyFund} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}