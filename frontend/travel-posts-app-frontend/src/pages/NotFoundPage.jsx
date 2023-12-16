import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div>
        <h3> 404 page not found</h3>
        <Link to="/"> Go to home page</Link>
    </div>
  )
}

export default NotFoundPage