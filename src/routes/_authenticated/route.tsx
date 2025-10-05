import { createFileRoute } from '@tanstack/react-router'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

function ProtectedRoute() {
  return (
    <>
      <SignedIn>
        <AuthenticatedLayout />
      </SignedIn>
      <SignedOut>
        <RedirectToClerkSignIn />
      </SignedOut>
    </>
  )
}

function RedirectToClerkSignIn() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({
      to: '/clerk/sign-in',
      replace: true,
    })
  }, [navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to sign in...</p>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated')({
  component: ProtectedRoute,
})
