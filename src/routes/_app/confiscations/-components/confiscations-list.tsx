import Spinner from '@/components/spinner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useDeleteConfiscationMutation, useReturnDeviceMutation, useUpdateConfiscationMutation } from '@/mutations'
import type { Confiscation } from '@/types'
import { RotateCcw, Ban, X, Edit, Check, Trash } from 'lucide-react'

import { useState } from 'react'

const ConsficationItem = ({
  confiscation,
  idx,
}: {
  confiscation: Confiscation
  idx: number
}) => {
  const returnDevice = useReturnDeviceMutation()
  const updateConfiscation = useUpdateConfiscationMutation()
  const deleteConfiscation = useDeleteConfiscationMutation()
  
  // State for editing reason
  const [isEditingReason, setIsEditingReason] = useState(false)
  const [editedReason, setEditedReason] = useState(confiscation.reason)
  const [reasonError, setReasonError] = useState('')

  const handleEditReason = () => {
    if (isEditingReason) {
      // Validate reason
      if (!editedReason.trim()) {
        setReasonError('Reason cannot be empty')
        return
      }
      
      // Clear error and update confiscation
      setReasonError('')
      updateConfiscation.mutate({
        id: confiscation._id,
        reason: editedReason.trim(),
      })
      setIsEditingReason(false)
    } else {
      setIsEditingReason(true)
      setEditedReason(confiscation.reason)
      setReasonError('')
    }
  }

  const handleCancelEdit = () => {
    setIsEditingReason(false)
    setEditedReason(confiscation.reason)
    setReasonError('')
  }

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedReason(e.target.value)
    if (reasonError && e.target.value.trim()) {
      setReasonError('')
    }
  }

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
            
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                deleteConfiscation.mutate({
                  id: confiscation._id,
                })
              }
              disabled={confiscation.status !== 'returned' || deleteConfiscation.isPending}
              className={`px-3 py-1.5 ${
                confiscation.status === 'returned'
                  ? 'text-red-600 dark:text-red-400 border-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/30'
                  : 'text-muted-foreground border-muted cursor-not-allowed'
              }`}
            >
              {deleteConfiscation.isPending ? (
                <Spinner className="h-3 w-3" />
              ) : (
                <>
                  <Trash className="h-3 w-3 mr-1.5" />
                  Delete
                </>
              )}
            </Button>
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
        
        {/* Bottom section - reason with edit functionality */}
        <div className="mt-2 pt-2 border-t border-border/20">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <span className="text-muted-foreground text-sm">Reason:</span>
              {isEditingReason ? (
                <div className="mt-1">
                  <input
                    type="text"
                    value={editedReason}
                    onChange={handleReasonChange}
                    className={`w-full px-2 py-1 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      reasonError 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-border'
                    }`}
                    placeholder="Enter reason for confiscation"
                    autoFocus
                  />
                  {reasonError && (
                    <p className="text-xs text-red-500 mt-1">{reasonError}</p>
                  )}
                </div>
              ) : (
                <span className="ml-1.5 text-sm">{confiscation.reason}</span>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleEditReason}
                className="h-6 px-2 text-xs hover:bg-muted"
                disabled={updateConfiscation.isPending}
              >
                {updateConfiscation.isPending ? (
                  <Spinner className="h-3 w-3" />
                ) : isEditingReason ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </>
                )}
              </Button>
              
              {isEditingReason && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCancelEdit}
                  className="h-6 px-2 text-xs hover:bg-muted text-muted-foreground"
                >
                  <X className="h-3 w-3 mr-1" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
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
