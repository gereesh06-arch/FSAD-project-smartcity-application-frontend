import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
