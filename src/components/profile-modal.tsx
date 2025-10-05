import { useTranslation } from 'react-i18next'
import { useUser, useSessionList } from '@clerk/clerk-react'
import { useState } from 'react'
import { format } from 'date-fns'
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Globe, 
  MapPin, 
  Calendar,
  Shield,
  Mail,
  User,
  LogOut
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface ProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { t } = useTranslation()
  const { user } = useUser()
  const { sessions } = useSessionList()
  const [activeTab, setActiveTab] = useState('profile')

  if (!user) return null

  const getDeviceIcon = (deviceType?: string) => {
    switch (deviceType?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />
      case 'tablet':
        return <Tablet className="h-4 w-4" />
      case 'desktop':
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const userInitials = user.fullName
    ? user.fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    : user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() || 'U'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{user.fullName || 'User'}</div>
              <div className="text-sm text-muted-foreground">
                {user.emailAddresses[0]?.emailAddress}
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            {t('profile.manageProfile')}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              {t('profile.profile')}
            </TabsTrigger>
            <TabsTrigger value="sessions">
              <Monitor className="h-4 w-4 mr-2" />
              {t('profile.sessions')}
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              {t('profile.security')}
            </TabsTrigger>
          </TabsList>

          <div className="max-h-[50vh] overflow-y-auto mt-4">
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {t('profile.personalInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">{t('profile.fullName')}</label>
                      <p className="text-sm text-muted-foreground">
                        {user.fullName || t('profile.notProvided')}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t('profile.username')}</label>
                      <p className="text-sm text-muted-foreground">
                        {user.username || t('profile.notSet')}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">{t('profile.primaryEmail')}</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{user.emailAddresses[0]?.emailAddress}</span>
                      {user.emailAddresses[0]?.verification.status === 'verified' && (
                        <Badge variant="secondary" className="text-xs">{t('profile.verified')}</Badge>
                      )}
                    </div>
                  </div>
                  {user.phoneNumbers && user.phoneNumbers.length > 0 && (
                    <div>
                      <label className="text-sm font-medium">{t('profile.phoneNumber')}</label>
                      <p className="text-sm text-muted-foreground">
                        {user.phoneNumbers[0]?.phoneNumber}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium">{t('profile.memberSince')}</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {format(new Date(user.createdAt!), 'MMMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    {t('profile.activeSessions')}
                  </CardTitle>
                  <CardDescription>
                    {t('profile.activeSessionsDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sessions?.map((session, index) => (
                    <div key={session.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getDeviceIcon(session.latestActivity?.deviceType)}
                          <div>
                            <div className="font-medium">
                              {session.latestActivity?.browserName || 'Unknown Browser'} 
                              {session.latestActivity?.browserVersion && 
                                ` ${session.latestActivity.browserVersion.split('.')[0]}`
                              }
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {session.latestActivity?.city && session.latestActivity?.country
                                ? `${session.latestActivity.city}, ${session.latestActivity.country}`
                                : t('profile.locationUnavailable')
                              }
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {t('profile.lastActive')}: {format(new Date(session.lastActiveAt), 'MMM dd, yyyy HH:mm')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {index === 0 && (
                            <Badge variant="secondary" className="text-xs">{t('profile.current')}</Badge>
                          )}
                          {index !== 0 && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => session.end()}
                            >
                              <LogOut className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {t('profile.accountSecurity')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">{t('profile.accountStatus')}</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={user.emailAddresses[0]?.verification.status === 'verified' ? 'default' : 'secondary'}>
                        {user.emailAddresses[0]?.verification.status === 'verified' ? t('profile.verified') : t('profile.unverified')}
                      </Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <label className="text-sm font-medium">{t('profile.twoFactor')}</label>
                    <p className="text-sm text-muted-foreground">
                      {user.twoFactorEnabled ? t('profile.enabled') : t('profile.disabled')}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">{t('profile.backupCodes')}</label>
                    <p className="text-sm text-muted-foreground">
                      {user.backupCodeEnabled ? t('profile.generated') : t('profile.notGenerated')}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">{t('profile.externalAccounts')}</label>
                    <div className="space-y-2 mt-2">
                      {user.externalAccounts?.map((account) => (
                        <div key={account.id} className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <span className="text-sm capitalize">{account.provider}</span>
                          <Badge variant="outline" className="text-xs">{t('profile.connected')}</Badge>
                        </div>
                      )) || (
                        <p className="text-sm text-muted-foreground">{t('profile.noExternalAccounts')}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

      </DialogContent>
    </Dialog>
  )
}
