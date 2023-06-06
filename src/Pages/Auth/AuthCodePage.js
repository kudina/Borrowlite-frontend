import React from 'react'

const AuthCodePage = () => {
  return (
    // full width page with text in the center of the page saying "Authenticating..." and a spinner using tailwindcss
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-1xl font-bold text-accent">Authenticating...</h1>
        <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin mt-3"></div>
    </div>

  )
}

export default AuthCodePage