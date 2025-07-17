export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FC</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Financial Coach</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Your AI-powered financial companion
          </div>
        </div>
      </div>
    </header>
  )
}