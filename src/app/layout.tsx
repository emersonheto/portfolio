import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Link } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-950 antialiased dark:bg-gray-950 dark:text-gray-50">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold">
                  Portfolio
                </Link>
                <nav className="flex items-center gap-6">
                  <Link
                    href="/about"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    About
                  </Link>
                  <Link
                    href="/experience"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    Experience
                  </Link>
                  <Link
                    href="/projects"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    Contact
                  </Link>
                  <ThemeToggle />
                </nav>
              </div>
            </header>
            <main>{children}</main>
            <footer className="border-t border-gray-200 py-8 dark:border-gray-800">
              <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
              </div>
            </footer>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
