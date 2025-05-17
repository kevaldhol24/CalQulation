export default function Loading() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 animate-pulse">
      <div className="text-center mb-12">
        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4"></div>
        <div className="h-4 w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
        <div className="h-4 w-full max-w-sm bg-gray-200 dark:bg-gray-700 rounded mx-auto mt-2"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        {/* Contact Information */}
        <div className="bg-white/80 dark:bg-gray-800/80 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
            </div>
            
            {[...Array(5)].map((_, i) => (
              <div className="flex items-start gap-3" key={i}>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full mt-1 h-9 w-9"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white/80 dark:bg-gray-800/80 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="mb-6">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="mt-16 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="aspect-[16/9] w-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
}
