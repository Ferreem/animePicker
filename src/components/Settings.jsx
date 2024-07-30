import React from 'react'

export default function Settings({showSettings, setShowSettings}) {
  const back = () => {
    setShowSettings(false);
  }
  return (
    <>
        <div className='h-full w-full bg-slate-900 z-50 inset-0'>
          <button onClick={back}>Back</button>
        </div>

    </>
  )
}
