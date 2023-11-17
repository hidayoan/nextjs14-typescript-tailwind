'use client'
import { faArrowRight, faBell, faChevronLeft, faChevronRight, faCircleArrowRight, faHome, faMoon, faSearch, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import './styles.scss'
import ReduxProvider from '@/app/store/ReduxProvider'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { setCollapse } from '@/app/store/slices/collapseSlice'
import { setDarkmode } from '@/app/store/slices/darkmodeSlice'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

const MAIN_MENU = [
  {
    i: 0,
    key: 'dashboard',
    route: '/',
    label: 'Dashboard',
    icon: faHome,
  },
  {
    i: 1,
    key: 'notifications',
    route: '/notifications',
    label: 'Notifications',
    icon: faBell,
  },
  {
    i: 2,
    key: 'users',
    route: '/users',
    label: 'Users',
    icon: faUser,
  }
]

const classNames = {
  menuButton: {
    parent: 'group flex items-center justify-start px-r-4 w-full cursor-pointer bg-transparent rounded-md transition-all',
    icon: 'h-4 w-4 p-[1rem] text-slate-500 group-hover:text-white dark:text-gray-50',
    label: 'text-sm text-slate-400 dark:text-gray-50 group-hover:text-white',
  }
}

function LeftMenu() {
  const [currentPos, setCurrentPos] = useState(0)
  const [boxPos, setBoxPos] = useState(0)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const dispatch = useAppDispatch();
  const pathname = usePathname()
  const router = useRouter()


  const isCollapsedStore = useAppSelector(state => {
    return state.collapse.value
  })

  const isDarkmode = useAppSelector(state => {
    return state.darkmode.value
  })


  useEffect(() => {
    let timeout: any = null

    if (!isCollapsedStore) {
      timeout = setTimeout(() => {
        setIsCollapsed(isCollapsedStore)
      }, 300)
    } else {
      setIsCollapsed(isCollapsedStore)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isCollapsedStore])

  const handleClick = () => {
    dispatch(setCollapse(!isCollapsed))
  }

  const handleChangeDarkmode = () => {
    dispatch(setDarkmode(!isDarkmode))
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const handleChangeRoute = (route: string) => {
    router.push(route)
  }

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-[300px] p-4 ${isCollapsedStore && 'w-[7.2rem]'} transition-all duration-500`}
    >
      <div className='h-fit w-full rounded-xl p-4 border-slate-300 dark:border-slate-800 border-[1px] shadow-md flex justify-start flex-col gap-8'>
        <div className='w-full flex items-center justify-start gap-3 relative'>
          <div className='w-12 h-12 bg-slate-900 dark:bg-cyan-700 rounded-md flex items-center justify-center text-white text-md font-semibold'>
            LOGO
          </div>
          <div className={`flex flex-col items-start justify-start text-xs ${isCollapsed && 'hidden'} transition-all`}>
            <div className='font-semibold text-sm'>
              App name
            </div>
            <div>
              description
            </div>
          </div>
          <div
            className='absolute box-border text-white  bg-slate-800 rounded-full cursor-pointer font-medium h-6 w-6 -right-7 hover:rotate-180 transition-all duration-500 flex items-center justify-center'
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft}
              className={``}
            />
          </div>
        </div>
        <div className='flex flex-col items-start justify-start gap-1'>
          <div className='flex items-stretch justify-between bg-slate-200 dark:bg-gray-700 rounded-md px-r-4 w-full mb-2'>
            <FontAwesomeIcon icon={faSearch} className='h-4 w-4 p-[1rem] text-slate-500 dark:text-gray-100' />
            <input type="text" className='w-[calc(100%-3rem)] bg-transparent text-sm' placeholder='Search...' />
          </div>
          <div className='flex flex-col items-start justify-start gap-1 w-full relative'>
            <div
              className={`h-12 w-full bg-slate-800 absolute z-0 rounded-lg transition-all duration-300 ${boxPos === 10.5 && 'bg-red-700'}`}
              style={{
                top: `${boxPos}rem`,
              }}
            ></div>
            {
              MAIN_MENU.map((item, index) => (
                <div
                  key={index}
                  className={`${classNames.menuButton.parent} h-12 z-1 relative`}
                  onClick={() => handleChangeRoute(item.route)}
                  onMouseEnter={() => {
                    setBoxPos(index * 3 + (index > 0 ? 0.25 * index : 0))
                  }}
                  onMouseLeave={() => {
                    setBoxPos(currentPos * 3 + (currentPos > 0 ? 0.25 * currentPos : 0))
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} className={`${classNames.menuButton.icon} transition-all ${currentPos === index && boxPos === currentPos * 3 + (currentPos > 0 ? 0.25 * currentPos : 0) && 'text-white'}`} />
                  <div className={`${classNames.menuButton.label} ${isCollapsed && 'hidden'} transition-all ${currentPos === index && boxPos === currentPos * 3 + (currentPos > 0 ? 0.25 * currentPos : 0) && 'text-white'}`}>
                    {item.label}
                  </div>
                </div>
              ))
            }
            <div className='w-full bg-slate-300 h-[1px]' />
            <div className={`group flex items-center justify-start px-r-4 w-full cursor-pointer rounded-md transition-all z-10 mt-2 mb-1`}
              onClick={handleSignOut}
              onMouseEnter={() => {
                setBoxPos(10.5)
              }}
              onMouseLeave={() => {
                setBoxPos(currentPos * 3 + (currentPos > 0 ? 0.25 * currentPos : 0))
              }}
            >
              <FontAwesomeIcon icon={faSignOut} className={`${classNames.menuButton.icon}`} />
              <div className={`${classNames.menuButton.label} ${isCollapsed && 'hidden'}`}>
                Logout
              </div>
            </div>
          </div>

          <div className={`flex items-center justify-start px-r-4 w-full cursor-pointer rounded-md transition-all bg-slate-200 dark:bg-gray-700`}>
            <FontAwesomeIcon icon={faMoon} className={classNames.menuButton.icon}
              onClick={() => {
                if (isCollapsed) {
                  handleChangeDarkmode()
                }
              }}
            />
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
