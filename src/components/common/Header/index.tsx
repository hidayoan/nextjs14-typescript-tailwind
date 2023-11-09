import React from 'react'

function Header() {
  return (
    <div
      className='w-full px-4 py-3 border-[1px] border-slate-300 dark:border-slate-800 rounded-lg shadow-sm flex items-center justify-between'
    >
      <div className='font-bold text-lg'>
        Dashboard
      </div>
      <div className='flex items-center justify-start gap-2'>
        <div className='w-8 h-8 bg-slate-900 dark:bg-cyan-700 rounded-full flex items-center justify-center text-white text-xs font-semibold'>
          HY
        </div>
        <div className={`flex flex-col items-start justify-start text-xs transition-all`}>
          <div className='font-semibold text-xs'>
            Hida Yoan
          </div>
          <div>
            Admin
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header