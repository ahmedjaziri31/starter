import {
  LayoutDashboard,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const getSidebarData = (t: (key: string) => string): SidebarData => ({
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [],
  navGroups: [
    {
      title: t('navigation.dashboard'),
      items: [
        {
          title: t('navigation.dashboard'),
          url: '/',
          icon: LayoutDashboard,
        },
      ],
    },
  ],
})

// Keep the original export for backward compatibility
export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [],
  navGroups: [
    {
      title: 'Dashboard',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
      ],
    },
  ],
}
