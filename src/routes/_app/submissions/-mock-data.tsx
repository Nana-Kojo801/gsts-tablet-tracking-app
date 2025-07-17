import { ClipboardList, CheckCircle, Clock, AlertCircle } from "lucide-react"

export const students = [
  { id: '1', name: 'John Doe', class: '3A' },
  { id: '2', name: 'Sarah Smith', class: '2B' },
  { id: '3', name: 'Michael Johnson', class: '3A' },
]
export const classes = ['1A', '1B', '1C', '2A', '2B', '3A', '3B']
// Collection-specific stats
export const summaryStats = [
  {
    label: 'Total Submissions',
    value: 120,
    icon: <ClipboardList className="w-6 h-6 text-primary" />,
    iconBg: 'bg-primary/10',
    desc: 'All collection records',
  },
  {
    label: 'Collected Today',
    value: 38,
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    iconBg: 'bg-green-500/10',
    desc: 'Tablets collected today',
  },
  {
    label: 'Pending Collections',
    value: 4,
    icon: <Clock className="w-6 h-6 text-yellow-600" />,
    iconBg: 'bg-yellow-500/10',
    desc: 'Awaiting return',
  },
  {
    label: 'Missing Devices',
    value: 1,
    icon: <AlertCircle className="w-6 h-6 text-red-600" />,
    iconBg: 'bg-red-500/10',
    desc: 'Marked as missing',
  },
]
export const recentSubmissions = [
  { id: 1, name: 'John Doe', class: '3A', status: 'Collected', time: '15:32' },
  { id: 2, name: 'Sarah Smith', class: '2B', status: 'Pending', time: '15:35' },
  {
    id: 3,
    name: 'Michael Johnson',
    class: '3A',
    status: 'Collected',
    time: '15:45',
  },
]
