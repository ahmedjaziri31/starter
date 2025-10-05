import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageSwitcher } from '@/components/language-switcher'

export function Dashboard() {
  const { t } = useTranslation()
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <LanguageSwitcher />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold tracking-tight mb-4'>{t('dashboard.title')}</h1>
          <p className='text-xl text-muted-foreground mb-8'>
            {t('dashboard.subtitle')}
          </p>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.authenticated.title')}</CardTitle>
              <CardDescription>
                {t('dashboard.authenticated.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                {t('dashboard.authenticated.content')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.modernUI.title')}</CardTitle>
              <CardDescription>
                {t('dashboard.modernUI.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                {t('dashboard.modernUI.content')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.performance.title')}</CardTitle>
              <CardDescription>
                {t('dashboard.performance.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                {t('dashboard.performance.content')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.readyToBuild.title')}</CardTitle>
              <CardDescription>
                {t('dashboard.readyToBuild.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                {t('dashboard.readyToBuild.content')}
              </p>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
