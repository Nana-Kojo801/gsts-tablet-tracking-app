import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Ban, ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

// Mock data for confiscation summary
const mockConfiscationSummary = {
  totalConfiscated: 12,
}

export default function ConfiscationSection() {
  return (
    <Card className="border-destructive/20 bg-destructive/5">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Ban className="h-4 w-4 text-destructive" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">
                Confiscated Devices
              </h3>
              <p className="text-sm text-muted-foreground">
                {mockConfiscationSummary.totalConfiscated} tablets currently
                confiscated
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="destructive">
              <Ban className="mr-2 h-4 w-4" />
              Confiscate Device
            </Button>
            <Link to='/confiscations'>
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
