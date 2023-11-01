'use client'
import { faArrowRight, faBell, faChevronLeft, faChevronRight, faCircleArrowRight, faHome, faMoon, faSearch, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Switch } from 'antd'
import React, { useState } from 'react'
import './styles.scss'
import ReduxProvider from '@/app/store/ReduxProvider'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { setCollapse } from '@/app/store/slices/collapseSlice'
import { stat } from 'fs'
import { setDarkmode } from '@/app/store/slices/darkmodeSlice'

const MAIN_MENU = [
  {
    route: '/',
    label: 'Dashboard',
    icon: faHome,
  },
  {
    route: '/notifications',
    label: 'Notifications',
    icon: faBell,
  },
  {
    route: '/users',
    label: 'Users',
    icon: faUser,
  }
]

const classNames = {
  menuButton: {
    parent: 'group flex items-center justify-start px-r-4 w-full cursor-pointer hover:bg-slate-800 rounded-md transition-all',
    icon: 'h-4 w-4 p-[1rem] text-slate-500 group-hover:text-white',
    label: 'text-sm text-slate-400 group-hover:text-white group-hover:font-semibold',
  }
}

function LeftMenu() {
  const dispatch = useAppDispatch();
  const isCollapsed = useAppSelector(state => {
    return state.collapse.value
  })

  const isDarkmode = useAppSelector(state => {
    return state.darkmode.value
  })

  const handleClick = () => {
    dispatch(setCollapse(!isCollapsed))
  }

  const handleChangeDarkmode = () => {
    dispatch(setDarkmode(!isDarkmode))
  }

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-[300px] p-4 ${isCollapsed && 'w-[7rem]'} transition-all duration-500`}
    >
      <div className='h-fit w-full rounded-md p-4 border-slate-300 border-[1px] shadow-md flex justify-start flex-col gap-8'>
        <div className='w-full flex items-center justify-start gap-3 relative'>
          <div className='w-12 h-12 bg-slate-900 rounded-md flex items-center justify-center text-white text-md font-semibold'>
            HY
          </div>
          <div className={`flex flex-col items-start justify-start text-xs ${isCollapsed && 'hidden'}`}>
            <div className='font-semibold text-sm'>
              Hida Yoan
            </div>
            <div>
              Admin
            </div>
          </div>
          <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft}
            onClick={handleClick}
            className='absolute -right-7 top-3 h-3 w-3 text-white p-1 bg-slate-800 rounded-full cursor-pointer'
          />
        </div>
        <div className='flex flex-col items-start justify-start gap-1'>
          <div className='flex items-stretch justify-between bg-slate-200 rounded-md px-r-4 w-full mb-2'>
            <FontAwesomeIcon icon={faSearch} className='h-4 w-4 p-[1rem] text-slate-500' />
            <input type="text" className='w-[calc(100%-3rem)] bg-transparent text-sm' placeholder='Search...' />
          </div>
          {
            MAIN_MENU.map((item, index) => (
              <div
                key={index}
                className={classNames.menuButton.parent}
              >
                <FontAwesomeIcon icon={item.icon} className={classNames.menuButton.icon} />
                <div className={`${classNames.menuButton.label} ${isCollapsed && 'hidden'}`}>
                  {item.label}
                </div>
              </div>
            ))
          }
          <div className='w-full bg-slate-300 h-[1px]' />
          <div className={`${classNames.menuButton.parent} hover:bg-red-600`}>
            <FontAwesomeIcon icon={faSignOut} className={classNames.menuButton.icon} />
            <div className={`${classNames.menuButton.label} ${isCollapsed && 'hidden'}`}>
              Logout
            </div>
          </div>
          <div className={`flex items-center justify-start px-r-4 w-full cursor-pointer rounded-md transition-all bg-slate-200`}>
            <FontAwesomeIcon icon={faMoon} className={classNames.menuButton.icon} />
            <div className={`${classNames.menuButton.label} flex items-center justify-between w-[calc(100%-3rem)] pr-2 ${isCollapsed && 'hidden'}`}>
              Dark Mode

              <Switch
                className='menu-switch' checkedChildren="🌙" unCheckedChildren="🌞"
                checked={isDarkmode}
                onChange={handleChangeDarkmode}

              ></Switch>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}


const LeftMenuWrapperWithRedux = () => {
  return (
    <ReduxProvider>
      <LeftMenu />
    </ReduxProvider>
  )
}
export default LeftMenuWrapperWithRedux
