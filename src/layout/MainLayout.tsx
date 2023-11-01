'use client'
import React from 'react'
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
  return (
    <div
      className={`h-screen w-screen bg-white ${darkmode && 'dark'}`}
    >
      <LeftMenu />
      <div className={`ml-[300px] w-[calc(100%-300px)] ${isCollapsed && 'ml-[7rem] w-[calc(100%-7rem)]'} transition-all duration-500`}>
        <MainLayoutHeader />
        <div>
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