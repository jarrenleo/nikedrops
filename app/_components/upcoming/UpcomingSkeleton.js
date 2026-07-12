import Skeleton from "../ui/Skeleton";

function CardSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="mb-4 aspect-square w-full" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Skeleton className="h-20 w-20 flex-shrink-0" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}

export default function UpcomingSkeleton() {
  return (
    <div className="space-y-3 py-6 md:space-y-6">
      {[0, 1].map((group) => (
        <div key={group}>
          <div className="px-4 pb-3 md:pb-6">
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="md:hidden">
            {[0, 1, 2].map((row) => (
              <RowSkeleton key={row} />
            ))}
          </div>
          <div className="hidden gap-4 px-4 md:grid md:grid-cols-3 lg:grid-cols-4">
            {[0, 1, 2, 3].map((card) => (
              <CardSkeleton key={card} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
