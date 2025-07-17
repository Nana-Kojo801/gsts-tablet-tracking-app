import { Skeleton } from '@/components/ui/skeleton'

const SystemPageSkeleton = () => {
  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 rounded" />
          <Skeleton className="h-5 w-80 rounded" />
        </div>
      </div>
      {/* Dashboard Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
      {/* Tabs Skeleton */}
      <div>
        <div className="flex gap-2 mb-4 h-10">
          {["Students", "Classes", "Tablets", "Users"].map((tab, i) => (
            <Skeleton key={tab} className="h-10 w-32 rounded-lg" />
          ))}
        </div>
        {/* Tab Content Skeleton */}
        <div className="space-y-4">
          {/* Table header */}
          <Skeleton className="h-10 w-full rounded" />
          {/* Table rows */}
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SystemPageSkeleton