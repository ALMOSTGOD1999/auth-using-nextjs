import React from 'react'

function profile({params}:any) {
  return (
      <div>
          <h1>profile</h1>
      <hr/>
          <p>profile page</p>
          <span className='p-2 ml-2 rounded bg-orange-500 text-blackf'>{params.id}</span>
      </div>
  )
}

export default profile