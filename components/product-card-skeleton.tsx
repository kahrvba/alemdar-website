import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-gray-900/50 border-gray-800 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-800/50">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-5 flex flex-col flex-grow">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-5 w-1/3 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="flex justify-between items-center mt-auto">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}
