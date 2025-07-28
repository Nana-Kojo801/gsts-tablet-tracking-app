import Spinner from '@/components/spinner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useReturnDeviceMutation } from '@/mutations'
import type { Confiscation } from '@/types'
import { RotateCcw, Ban } from 'lucide-react'

const ConsficationItem = ({
  confiscation,
  idx,
}: {
  confiscation: Confiscation
  idx: number
}) => {
  const returnDevice = useReturnDeviceMutation()
  return (
    <div
      key={confiscation._id}
      className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-sm hover:shadow transition-all duration-200 animate-in fade-in-10 slide-in-from-bottom-4"
      style={{ animationDelay: `${idx * 50}ms` }}
    >
      <div className="flex flex-col gap-2">
        {/* Top row - compact header */}
        <div className="flex justify-between items-start gap-3">
          <div>
            <h3 className="font-semibold text-foreground">
              {confiscation.student.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs text-muted-foreground">
                {confiscation.student.indexNumber}
              </span>
              <span className="text-muted-foreground text-xs">•</span>
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                {confiscation.student.class}
              </Badge>
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                {confiscation.student.programme}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              className={`px-2 py-0.5 text-xs rounded-md ${
                confiscation.status === 'confiscated'
                  ? 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400'
                  : 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400'
              }`}
            >
              {confiscation.status === 'confiscated'
                ? 'Confiscated'
                : 'Returned'}
            </Badge>

            {confiscation.status === 'confiscated' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  returnDevice.mutate({
                    studentId: confiscation.student._id,
                    confiscationId: confiscation._id,
                  })
                }
                className="text-green-600 dark:text-green-400 border-green-300 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/30 px-3 py-1.5"
              >
                {returnDevice.isPending ? (
                  <Spinner className="text-green-600 dark:text-green-400" />
                ) : (
                  <>
                    <RotateCcw className="h-3 w-3 mr-1.5" />
                    Return
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Middle section - device info */}
        <div className="mt-2 flex items-center gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">IMEI:</span>
            <span className="ml-1 font-mono">
              {confiscation.student.tablet?.imei || 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Date:</span>
            <span className="ml-1">
              {new Date(confiscation.confiscationTime).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Bottom section - reason */}
        <div className="mt-2 pt-2 border-t border-border/20">
          <p className="text-sm">
            <span className="text-muted-foreground">Reason:</span>
            <span className="ml-1.5">{confiscation.reason}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const ConfiscationsList = ({
  filteredConfiscations,
}: {
  filteredConfiscations: Confiscation[]
}) => {
  return (
    <div className="space-y-3">
      {filteredConfiscations.map((confiscation, idx) => (
        <ConsficationItem key={idx} confiscation={confiscation} idx={idx} />
      ))}

      {filteredConfiscations.length === 0 && (
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 text-center">
          <div className="w-14 h-14 rounded-xl bg-muted/30 flex items-center justify-center mx-auto mb-3">
            <Ban className="h-6 w-6 text-muted-foreground/60" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1.5">
            No confiscations found
          </h3>
        </div>
      )}
    </div>
  )
}

export default ConfiscationsList
