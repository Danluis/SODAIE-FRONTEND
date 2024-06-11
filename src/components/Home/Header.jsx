import { useAuth } from '../../context/AuthContext'
import HeaderLogged from './HeaderLogged'
import HeaderUnlogged from './HeaderUnlogged'
export default function Header() {
  const {isAuthenticated} = useAuth()
  return (
    isAuthenticated ? <HeaderLogged/> : <HeaderUnlogged/>
  )
}
