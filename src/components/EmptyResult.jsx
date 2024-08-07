import React from 'react'

export default function EmptyResult() {
  return (
    <div className="h-full w-full bg-slate-900 z-50 inset-0 m flex flex-col items-center justify-center font-bold">
        <div>Can't find that kind of anime.</div>
        <br />
        <div>Reset page and try again!</div>
    </div>
  )
}
