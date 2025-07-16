import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Search, 
  Camera, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Tablet,
  User,
  Calendar,
  MapPin,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  FileText,
  Settings,
  Battery,
  Eye,
  Shield,
  Wifi,
  Volume2,
  VolumeX
} from 'lucide-react'

type AccessoryKey = 'tablet' | 'powerBank' | 'charger' | 'keyboard' | 'powerBankCharger' | 'tabletCharger';

export const Route = createFileRoute('/_app/collection/')({
  component: CollectionInterface,
})

function CollectionInterface() {
  const [currentStep, setCurrentStep] = useState(1)
  const [mode, setMode] = useState<'student' | 'class'>('student')
  const [selectedClass, setSelectedClass] = useState('1A')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [tabletCondition, setTabletCondition] = useState({
    screen: 'good',
    battery: 'good',
    physical: 'good',
    functionality: 'good'
  })
  const [collectionStatus, setCollectionStatus] = useState('on_time')
  const [notes, setNotes] = useState('')
  const [accessories, setAccessories] = useState<Record<AccessoryKey, boolean>>({
    tablet: false,
    powerBank: false,
    charger: false,
    keyboard: false,
    powerBankCharger: false,
    tabletCharger: false,
  })
  const [missingNote, setMissingNote] = useState('')
  const [activityFilter, setActivityFilter] = useState<'student' | 'class'>('student')
  const [activitySearch, setActivitySearch] = useState('')
  const [activityClass, setActivityClass] = useState('all')

  // Mock data for demonstration
  const students = [
    {
      id: '1',
      name: 'John Doe',
      class: '3A',
      photo: 'https://via.placeholder.com/60',
      tabletAssigned: 'GT-2024-001',
      tabletIMEI: '123456789012345',
      distributionTime: '2024-01-15 07:30',
      expectedCollection: '2024-01-15 15:30'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      class: '2B',
      photo: 'https://via.placeholder.com/60',
      tabletAssigned: 'GT-2024-002',
      tabletIMEI: '123456789012346',
      distributionTime: '2024-01-15 07:45',
      expectedCollection: '2024-01-15 15:30'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      class: '3A',
      photo: 'https://via.placeholder.com/60',
      tabletAssigned: 'GT-2024-003',
      tabletIMEI: '123456789012347',
      distributionTime: '2024-01-15 08:00',
      expectedCollection: '2024-01-15 15:30'
    }
  ]
  const classes = ['1A', '1B', '1C', '2A', '2B', '3A', '3B']
  const studentsInClass = students.filter(s => s.class === selectedClass)

  // Mock recent activities data
  const recentActivities = [
    {
      id: 1,
      type: 'student',
      name: 'John Doe',
      class: '3A',
      status: 'Collected',
      time: '15:32',
    },
    {
      id: 2,
      type: 'student',
      name: 'Sarah Smith',
      class: '2B',
      status: 'Pending',
      time: '15:35',
    },
    {
      id: 3,
      type: 'class',
      class: '3A',
      status: 'Completed',
      time: '15:40',
    },
    {
      id: 4,
      type: 'student',
      name: 'Michael Johnson',
      class: '3A',
      status: 'Collected',
      time: '15:45',
    },
    {
      id: 5,
      type: 'class',
      class: '2B',
      status: 'In Progress',
      time: '15:50',
    },
  ]

  const handleStudentSearch = (query: string) => {
    setSearchQuery(query)
    // Mock search functionality
    const found = students.find(s => 
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.tabletAssigned.toLowerCase().includes(query.toLowerCase())
    )
    if (found) {
      setSelectedStudent(found)
      setCurrentStep(2)
    }
  }

  const handleCompleteCollection = () => {
    // Mock completion
    console.log('Collection completed:', {
      student: selectedStudent,
      condition: tabletCondition,
      status: collectionStatus,
      notes
    })
    // Reset for next student
    setSelectedStudent(null)
    setCurrentStep(1)
    setSearchQuery('')
    setTabletCondition({ screen: 'good', battery: 'good', physical: 'good', functionality: 'good' })
    setCollectionStatus('on_time')
    setNotes('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_time':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'late':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'missing':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'fair':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'poor':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const allAccessoriesPresent = Object.values(accessories).every(Boolean)

  // Filtered activities
  const filteredActivities = recentActivities.filter(a => {
    if (activityFilter === 'student') {
      const matchesName = a.name?.toLowerCase().includes(activitySearch.toLowerCase())
      const matchesClass = activityClass !== 'all' ? a.class === activityClass : true
      return a.type === 'student' && matchesName && matchesClass
    } else {
      const matchesClass = activityClass !== 'all' ? a.class === activityClass : true
      return a.type === 'class' && matchesClass
    }
  })

  const getActivityStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'collected':
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending':
      case 'in progress':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'missing':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }
  const getActivityStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'collected':
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'missing':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Tablet Collection</h1>
          <p className="text-muted-foreground">
            Afternoon tablet collection session - {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Session Report</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>
      {/* Collection Mode Tabs */}
      <Tabs value={mode} onValueChange={v => setMode(v as 'student' | 'class')} className="w-full">
        <TabsList className="w-full h-10">
          <TabsTrigger value="student" className="flex-1">By Student</TabsTrigger>
          <TabsTrigger value="class" className="flex-1">By Class</TabsTrigger>
        </TabsList>
      </Tabs>
      {/* Progress Indicator - always show all steps, disable inactive ones */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Collection Progress</h2>
          <span className="text-sm text-muted-foreground">Step {currentStep} of 4</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { step: 1, title: mode === 'student' ? 'Student ID' : 'Class', icon: User },
            { step: 2, title: 'Device Check', icon: Tablet },
            { step: 3, title: 'Condition', icon: Eye },
            { step: 4, title: 'Complete', icon: CheckCircle }
          ].map((item) => (
            <div key={item.step} className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
              currentStep === item.step
                ? 'bg-primary/10 border-primary/30 text-primary'
                : currentStep > item.step
                  ? 'bg-muted/20 border-primary/10 text-muted-foreground'
                  : 'bg-muted/30 border-border/30 text-muted-foreground opacity-60 pointer-events-none'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= item.step ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-xs opacity-75">Step {item.step}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Main Collection Interface - show all steps, disable if not currentStep */}
      {mode === 'student' ? (
        <div className="space-y-6">
          {/* Step 1: Student Search & Info */}
          <div className={`${currentStep !== 1 ? 'opacity-60 pointer-events-none' : ''}`}> 
            {/* Student Search */}
            <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Student Identification</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or tablet bag number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleStudentSearch(searchQuery)}
                    className="pl-10"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleStudentSearch(searchQuery)}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Student Information */}
            {selectedStudent && (
              <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg mt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Student Information</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-foreground">{selectedStudent.name}</div>
                    <div className="text-sm text-muted-foreground">Class {selectedStudent.class}</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm font-medium">Tablet Bag Number</span>
                      <span className="text-sm font-semibold text-primary">{selectedStudent.tabletAssigned}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm font-medium">IMEI</span>
                      <span className="text-sm font-mono">{selectedStudent.tabletIMEI}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm font-medium">Distributed</span>
                      <span className="text-sm">{new Date(selectedStudent.distributionTime).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm font-medium">Expected Return</span>
                      <span className="text-sm">{new Date(selectedStudent.expectedCollection).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Step 2: Device & Accessories Check-In */}
          <div className={`${currentStep !== 2 ? 'opacity-60 pointer-events-none' : ''}`}> 
            {/* Device & Accessories Check-In */}
            <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Device & Accessories Check-In</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  { key: 'tablet', label: 'Tablet' },
                  { key: 'powerBank', label: 'Power Bank' },
                  { key: 'charger', label: 'Charger' },
                  { key: 'keyboard', label: 'Keyboard' },
                  { key: 'powerBankCharger', label: 'Power Bank Charger' },
                  { key: 'tabletCharger', label: 'Tablet Charger' },
                ].map(item => (
                  <label key={item.key} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={accessories[item.key as AccessoryKey]}
                      onChange={() => setAccessories(a => ({ ...a, [item.key as AccessoryKey]: !a[item.key as AccessoryKey] }))}
                      className="form-checkbox h-5 w-5 text-primary border-border/50 rounded focus:ring-2 focus:ring-primary/20"
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </label>
                ))}
              </div>
              {!allAccessoriesPresent && (
                <div className="mb-4">
                  <Label className="text-sm font-medium text-red-600">Some items are missing. Please add a note:</Label>
                  <Input
                    placeholder="Describe missing items or issues..."
                    value={missingNote}
                    onChange={e => setMissingNote(e.target.value)}
                  />
                </div>
              )}
              <Button
                onClick={() => allAccessoriesPresent ? setCurrentStep(3) : null}
                className="w-full"
                disabled={!allAccessoriesPresent}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                {allAccessoriesPresent ? 'Proceed to Condition Assessment' : 'All items must be present to proceed'}
              </Button>
            </div>
          </div>
          {/* Step 3: Condition Assessment */}
          <div className={`${currentStep !== 3 ? 'opacity-60 pointer-events-none' : ''}`}> 
            {/* Condition Assessment */}
            <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Condition Assessment</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Screen Condition</Label>
                    <Select value={tabletCondition.screen} onValueChange={(value) => setTabletCondition({...tabletCondition, screen: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent defaultValue="excellent">
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Battery Health</Label>
                    <Select value={tabletCondition.battery} onValueChange={(value) => setTabletCondition({...tabletCondition, battery: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Physical Condition</Label>
                    <Select value={tabletCondition.physical} onValueChange={(value) => setTabletCondition({...tabletCondition, physical: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Functionality</Label>
                    <Select value={tabletCondition.functionality} onValueChange={(value) => setTabletCondition({...tabletCondition, functionality: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Notes (Optional)</Label>
                  <Input
                    placeholder="Any additional notes about the tablet condition..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(4)}
                    className="flex-1"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Proceed to Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Step 4: Status Classification */}
          <div className={`${currentStep !== 4 ? 'opacity-60 pointer-events-none' : ''}`}> 
            {/* Status Classification */}
            <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Status Classification</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Collection Status</Label>
                  <Select value={collectionStatus} onValueChange={setCollectionStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on_time">On Time</SelectItem>
                      <SelectItem value="late">Late (with reason)</SelectItem>
                      <SelectItem value="missing">Missing Device</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-lg border text-center cursor-pointer transition-all ${
                    collectionStatus === 'on_time' ? getStatusColor('on_time') : 'bg-muted/30 border-border/30'
                  }`} onClick={() => setCollectionStatus('on_time')}>
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-semibold">On Time</div>
                    <div className="text-xs opacity-75">Submitted within deadline</div>
                  </div>
                  <div className={`p-4 rounded-lg border text-center cursor-pointer transition-all ${
                    collectionStatus === 'late' ? getStatusColor('late') : 'bg-muted/30 border-border/30'
                  }`} onClick={() => setCollectionStatus('late')}>
                    <Clock className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-semibold">Late</div>
                    <div className="text-xs opacity-75">Submitted after deadline</div>
                  </div>
                  <div className={`p-4 rounded-lg border text-center cursor-pointer transition-all ${
                    collectionStatus === 'missing' ? getStatusColor('missing') : 'bg-muted/30 border-border/30'
                  }`} onClick={() => setCollectionStatus('missing')}>
                    <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-semibold">Missing</div>
                    <div className="text-xs opacity-75">Device not returned</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(3)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    onClick={handleCompleteCollection}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Collection
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Step 1: Class Selection */}
          <div className={`bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg ${currentStep !== 1 ? 'opacity-60 pointer-events-none' : ''}`}> 
            <h3 className="text-lg font-semibold text-foreground mb-4">Select Class</h3>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a class..." />
              </SelectTrigger>
              <SelectContent>
                {classes.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedClass && (
              <Button className="mt-4" onClick={() => setCurrentStep(2)}>
                <ArrowRight className="w-4 h-4 mr-2" />
                Proceed to Device Check
              </Button>
            )}
          </div>
          {/* Step 2: Device & Accessories Check for Class */}
          <div className={`bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg ${currentStep !== 2 ? 'opacity-60 pointer-events-none' : ''}`}> 
            <h3 className="text-lg font-semibold text-foreground mb-4">Device & Accessories Check-In (Class)</h3>
            {studentsInClass.map(student => (
              <div key={student.id} className="mb-4 p-4 border rounded-lg">
                <div className="font-semibold mb-2">{student.name}</div>
                {/* Per-student accessories checklist, similar to single student mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    { key: 'tablet', label: 'Tablet' },
                    { key: 'powerBank', label: 'Power Bank' },
                    { key: 'charger', label: 'Charger' },
                    { key: 'keyboard', label: 'Keyboard' },
                    { key: 'powerBankCharger', label: 'Power Bank Charger' },
                    { key: 'tabletCharger', label: 'Tablet Charger' },
                  ].map(item => (
                    <label key={item.key} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={accessories[item.key as AccessoryKey]}
                        onChange={() => setAccessories(a => ({ ...a, [item.key as AccessoryKey]: !a[item.key as AccessoryKey] }))}
                        className="form-checkbox h-5 w-5 text-primary border-border/50 rounded focus:ring-2 focus:ring-primary/20"
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                    </label>
                  ))}
                </div>
                {!allAccessoriesPresent && (
                  <div className="mb-4">
                    <Label className="text-sm font-medium text-red-600">Some items are missing. Please add a note:</Label>
                    <Input
                      placeholder="Describe missing items or issues..."
                      value={missingNote}
                      onChange={e => setMissingNote(e.target.value)}
                    />
                  </div>
                )}
                <Button
                  onClick={() => allAccessoriesPresent ? setCurrentStep(3) : null}
                  className="w-full"
                  disabled={!allAccessoriesPresent}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {allAccessoriesPresent ? 'Proceed to Status' : 'All items must be present to proceed'}
                </Button>
              </div>
            ))}
            <Button className="mt-4" onClick={() => setCurrentStep(3)}>
              <ArrowRight className="w-4 h-4 mr-2" />
              Proceed to Status
            </Button>
          </div>
          {/* Step 3: Status Classification for Class (now the final step) */}
          <div className={`bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg ${currentStep !== 3 ? 'opacity-60 pointer-events-none' : ''}`}> 
            <h3 className="text-lg font-semibold text-foreground mb-4">Status Classification (Class)</h3>
            {studentsInClass.map(student => (
              <div key={student.id} className="mb-4 p-4 border rounded-lg">
                <div className="font-semibold mb-2">{student.name}</div>
                <div>
                  <Label className="text-sm font-medium">Collection Status</Label>
                  <Select value={collectionStatus} onValueChange={setCollectionStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on_time">On Time</SelectItem>
                      <SelectItem value="late">Late (with reason)</SelectItem>
                      <SelectItem value="missing">Missing Device</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-lg border text-center cursor-pointer transition-all ${
                    collectionStatus === 'on_time' ? getStatusColor('on_time') : 'bg-muted/30 border-border/30'
                  }`} onClick={() => setCollectionStatus('on_time')}>
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-semibold">On Time</div>
                    <div className="text-xs opacity-75">Submitted within deadline</div>
                  </div>
                  <div className={`p-4 rounded-lg border text-center cursor-pointer transition-all ${
                    collectionStatus === 'late' ? getStatusColor('late') : 'bg-muted/30 border-border/30'
                  }`} onClick={() => setCollectionStatus('late')}>
                    <Clock className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-semibold">Late</div>
                    <div className="text-xs opacity-75">Submitted after deadline</div>
                  </div>
                  <div className={`p-4 rounded-lg border text-center cursor-pointer transition-all ${
                    collectionStatus === 'missing' ? getStatusColor('missing') : 'bg-muted/30 border-border/30'
                  }`} onClick={() => setCollectionStatus('missing')}>
                    <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-semibold">Missing</div>
                    <div className="text-xs opacity-75">Device not returned</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(2)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    onClick={() => {/* handle class submission */}}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Collection for Class
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Session Summary */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-foreground mb-4">Today's Collection Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">42</div>
            <div className="text-sm text-muted-foreground">Collected</div>
          </div>
          <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">0</div>
            <div className="text-sm text-muted-foreground">Missing</div>
          </div>
          <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">45</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
        </div>
      </div>
      {/* Recent Activities Section */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4 p-6 pb-0">
          <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <ToggleGroup type="single" value={activityFilter} onValueChange={v => setActivityFilter((v as 'student' | 'class') || 'student')} className="gap-2">
              <ToggleGroupItem value="student">By Student</ToggleGroupItem>
              <ToggleGroupItem value="class">By Class</ToggleGroupItem>
            </ToggleGroup>
            <Select value={activityClass} onValueChange={setActivityClass}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {activityFilter === 'student' && (
              <Input
                type="text"
                placeholder="Search by name..."
                value={activitySearch}
                onChange={e => setActivitySearch(e.target.value)}
                className="w-48"
              />
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gradient-to-r from-muted/80 via-muted/60 to-muted/80 border-b border-border/50">
                {activityFilter === 'student' ? (
                  <>
                    <th className="px-4 py-3 text-left font-semibold text-foreground text-sm uppercase tracking-wide">Student</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground text-sm uppercase tracking-wide">Class</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground text-sm uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground text-sm uppercase tracking-wide">Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground text-sm uppercase tracking-wide">Actions</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3 text-left font-semibold text-foreground text-sm uppercase tracking-wide">Class</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground text-sm uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground text-sm uppercase tracking-wide">Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground text-sm uppercase tracking-wide">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredActivities.map((a, index) => (
                <tr key={a.id} className={`hover:bg-muted/40 transition-all duration-200 ${index % 2 === 0 ? 'bg-muted/10' : 'bg-transparent'}`}>
                  {activityFilter === 'student' ? (
                    <>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-foreground text-sm truncate">{a.name}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20">
                          {a.class}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          {getActivityStatusIcon(a.status)}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getActivityStatusColor(a.status)}`}>
                            {a.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-muted-foreground">{a.time}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary">
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20">
                          {a.class}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          {getActivityStatusIcon(a.status)}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getActivityStatusColor(a.status)}`}>
                            {a.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-muted-foreground">{a.time}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary">
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
