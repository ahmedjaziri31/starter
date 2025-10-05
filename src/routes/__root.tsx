import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from '@/components/ui/sonner'
import { NavigationProgress } from '@/components/navigation-progress'
import { GeneralError } from '@/features/errors/general-error'
import { NotFoundError } from '@/features/errors/not-found-error'
import { useRTL } from '@/hooks/use-rtl'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function RootLayout() {
  useRTL() // Initialize RTL support
  
  return (
    <>
      <NavigationProgress />
      <Outlet />
      <Toaster duration={5000} />
      {import.meta.env.MODE === 'development' && (
        <>
          <ReactQueryDevtools buttonPosition='bottom-left' />
          <TanStackRouterDevtools position='bottom-right' />
        </>
      )}
    </>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    if (!PUBLISHABLE_KEY) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-md text-center">
            <h1 className="text-xl font-semibold mb-4">Missing Clerk Configuration</h1>
            <p className="text-muted-foreground">
              Please add your VITE_CLERK_PUBLISHABLE_KEY to the .env file
            </p>
          </div>
        </div>
      )
    }

    return (
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        signInFallbackRedirectUrl='/'
        signUpFallbackRedirectUrl='/'
      >
        <RootLayout />
      </ClerkProvider>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
