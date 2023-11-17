'use client'
import React, { useEffect } from 'react'
import { ReactNode } from 'react'
import { Header as MainLayoutHeader, LeftMenu } from '@/components/common'
import ReduxProvider from '@/app/store/ReduxProvider'
import { useAppSelector } from '@/app/store'

interface MainLayoutProps {
  children: ReactNode
}

function MainLayoutContent({ children }: MainLayoutProps) {
  const isCollapsed = useAppSelector(state => {
    return state.collapse.value
  })
  const darkmode = useAppSelector(state => {
    return state.darkmode.value
  })

  useEffect(() => {
    if (darkmode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }
    , [darkmode])
  return (
    <div
      className={`h-screen w-screen bg-white dark:bg-black dark:text-white`}
    >
      <LeftMenu />
      <div className={`ml-[300px] w-[calc(100%-300px)] ${isCollapsed && 'ml-[7rem] w-[calc(100%-7rem)]'} transition-all duration-500 p-4 flex flex-col gap-4 h-screen`}>
        <MainLayoutHeader />
        <div className='w-full p-4 border-[1px] border-slate-300 dark:border-slate-800 rounded-lg flex-1 shadow-sm'>
          {children}
        </div>
      </div>
    </div>
  )
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <ReduxProvider>
      <MainLayoutContent>
        {children}
      </MainLayoutContent>
    </ReduxProvider>
  )
}

export default MainLayout