import { useTranslation } from 'react-i18next'
import { useLayout } from '@/context/layout-provider'
import { useUser } from '@clerk/clerk-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { AppTitle } from './app-title'
import { getSidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'

export function AppSidebar() {
  const { t } = useTranslation()
  const { collapsible, variant } = useLayout()
  const { user } = useUser()

  // Get translated sidebar data
  const sidebarData = getSidebarData(t)

  // Create user data for sidebar from Clerk user
  const userData = user ? {
    name: user.fullName || 'User',
    email: user.emailAddresses[0]?.emailAddress || '',
    avatar: user.imageUrl || '/avatars/shadcn.jpg',
  } : sidebarData.user

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
