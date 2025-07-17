import { AICoachChat } from '@/components/chat/AICoachChat'

export function Chat() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Financial Coach</h1>
        <p className="text-gray-600">Get personalized financial advice and guidance</p>
      </div>

      <AICoachChat />
    </div>
  )
}