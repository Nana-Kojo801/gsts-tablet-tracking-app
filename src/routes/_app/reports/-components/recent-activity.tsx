import { Button } from '@/components/ui/button'
import { useAppData } from '@/hooks/use-app-data'
import { Link } from '@tanstack/react-router'
import { Calendar, Gift, Inbox } from 'lucide-react'

const RecentActivity = () => {
  const { submissions, distributions } = useAppData()
  const recentActivity = [
    ...distributions.map((d) => ({
      type: 'distribution',
      name: d.student?.name || 'Unknown Student',
      date: d.distributionTime,
      _id: d._id,
    })),
    ...submissions.map((s) => ({
      type: 'submission',
      name: s.student?.name || 'Unknown Student',
      date: s.submissionTime,
      _id: s._id,
    })),
  ]
    .sort((a, b) => b.date - a.date)
    .slice(0, 10)
  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Recent Activity
        </h2>
        <Link to='/reports/recent-activties'>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            View All
          </Button>
        </Link>
      </div>
      <ul className="space-y-2">
        {recentActivity.length === 0 && <p>No recent activities</p>}
        {recentActivity.map((item) => (
          <li key={item._id} className="flex items-center gap-3 text-sm py-2">
            {item.type === 'distribution' ? (
              <>
                <Gift className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-700">{item.name}</span>
                <span className="text-muted-foreground">received a tablet</span>
              </>
            ) : (
              <>
                <Inbox className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-700">{item.name}</span>
                <span className="text-muted-foreground">
                  submitted a tablet
                </span>
              </>
            )}
            <span className="ml-auto text-xs text-muted-foreground">
              {new Date(item.date).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentActivity
