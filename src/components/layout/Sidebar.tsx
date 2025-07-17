import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Receipt, 
  Target, 
  MessageCircle, 
  BarChart3,
  Wallet
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'expenses', name: 'Expenses', icon: Receipt },
  { id: 'budget', name: 'Budget', icon: Wallet },
  { id: 'goals', name: 'Goals', icon: Target },
  { id: 'chat', name: 'AI Coach', icon: MessageCircle },
  { id: 'reports', name: 'Reports', icon: BarChart3 },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start',
                activeTab === item.id 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="w-4 h-4 mr-3" />
              {item.name}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}