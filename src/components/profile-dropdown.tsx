import { useTranslation } from 'react-i18next'
import { useClerk, useUser } from '@clerk/clerk-react'
import useDialogState from '@/hooks/use-dialog-state'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { ProfileModal } from '@/components/profile-modal'

export function ProfileDropdown() {
  const { t } = useTranslation()
  const [signOutOpen, setSignOutOpen] = useDialogState()
  const [profileOpen, setProfileOpen] = useDialogState()
  const { user } = useUser()
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    await signOut()
    setSignOutOpen(false)
  }

  if (!user) return null

  const userInitials = user.fullName
    ? user.fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    : user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() || 'U'

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col gap-1.5'>
              <p className='text-sm leading-none font-medium'>
                {user.fullName || 'User'}
              </p>
              <p className='text-muted-foreground text-xs leading-none'>
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setProfileOpen(true)}>
              {t('profile.profileSettings')}
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSignOutOpen(true)}>
            {t('profile.signOut')}
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileModal 
        open={!!profileOpen} 
        onOpenChange={setProfileOpen} 
      />

      <ConfirmDialog
        open={!!signOutOpen}
        onOpenChange={setSignOutOpen}
        title={t('profile.signOut')}
        desc={t('profile.signOutConfirm')}
        confirmText={t('profile.signOut')}
        handleConfirm={handleSignOut}
        className='sm:max-w-sm'
      />
    </>
  )
}
