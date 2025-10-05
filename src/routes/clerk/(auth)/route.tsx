import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/clerk/(auth)')({
  component: ClerkAuthLayout,
})

function ClerkAuthLayout() {
  const { t } = useTranslation()
  return (
    <div className='relative min-h-svh w-full lg:grid lg:grid-cols-2'>
      {/* Left side - Image background (hidden on mobile) */}
      <div className='relative hidden h-full min-h-svh flex-col p-6 text-white lg:flex lg:p-10'>
        <div 
          className='absolute inset-0 bg-cover bg-center bg-no-repeat' 
          style={{ backgroundImage: 'url(/login.png)' }}
        />
        <div className='absolute inset-0 bg-black/20' />
        <Link
          to='/'
          className='relative z-20 flex items-center text-lg font-medium'
        >
          <img 
            src='/logo.svg' 
            alt='Logo' 
            className='h-8 w-auto'
          />
        </Link>

        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo; {t('auth.secureAuth')} &rdquo;
            </p>
            <footer className='text-sm'>Admin Dashboard</footer>
          </blockquote>
        </div>
      </div>
      
      {/* Right side - Auth forms */}
      <div className='flex min-h-svh flex-col items-center justify-center p-4 lg:p-8'>
        <div className='w-full max-w-sm space-y-6'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
