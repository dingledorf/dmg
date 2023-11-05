"use client"
import {Inter} from 'next/font/google'
import './globals.css'
import Header from "@/app/layout/Header";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePathname } from 'next/navigation';
import {SnackbarProvider} from "notistack";

const queryClient = new QueryClient()
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-gray-900`}>
      {pathname !== "/login" && <Header/>}
        <SnackbarProvider />
        <QueryClientProvider client={queryClient}>
          <div className={"min-h-screen relative container flex mx-auto pt-5"}>
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  )
}
