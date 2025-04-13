import React from 'react'

const Loading = () => {
  return (
    <>
      <div class="flex space-x-2">
          <div class="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></div>
          <div class="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></div>
          <div class="w-4 h-4 rounded-full bg-blue-500 animate-bounce"></div>
        </div>
    </>
  )
}

export default Loading
