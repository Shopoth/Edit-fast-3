import  React from 'react'
import  {Link} from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="bg-purple-700 items-center py-3 flex justify-around">
      <ul className="flex justify-center">
          <li className="text-3xl list-none">
              Edit-Fast
          </li>
      </ul>
      <ul className="flex  justify-center gap-6">
          <li className="text-white list-none hover:underline">
            <Link to="/"> Home </Link>
          </li>
          <li className="text-white list-none hover:underline">
          <Link to="/about"> About </Link>
          </li>
      </ul>
    </nav>
  )
}
