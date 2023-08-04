/* eslint-disable react-hooks/rules-of-hooks */
// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import Spinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Util Import
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute'

const AclGuard = props => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  // Si l'utilisateur est en cours de chargement, affichez un spinner
  if (auth.isLoading) {
    return <Spinner />
  }

  // ** Vars
  let ability
  useEffect(() => {
    // Si l'utilisateur est authentifié et sur la route principale, le rediriger vers le tableau de bord
    if (auth.user && auth.user.role && !guestGuard && router.route === '/') {
      const homeRoute = getHomeRoute(auth.user.role)
      router.replace(homeRoute)
    }
  }, [auth.user, guestGuard, router])

  // L'utilisateur est connecté, créer des capacités pour l'utilisateur en fonction de son rôle.
  if (auth.user && auth.user.roles && auth.user.roles.length > 0) {
    const role = auth.user.roles[0]?.shortName // Ceci extrait le premier rôle de l'utilisateur
    ability = buildAbilityFor(role, aclAbilities.subject)
    console.log(`Ability built for user ${auth.user.id} with role ${role}:`, ability)
  }

  // If guest guard or no guard is true or any error page
  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
    // If user is logged in and his ability is built
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      // If user is not logged in (render pages like login, register etc..)
      return <>{children}</>
    }
  }

  // Check the access of current user and render pages
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    console.log(`User ${auth.user.firstName} has ability for action ${aclAbilities.action} on subject ${aclAbilities.subject}`)
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  console.log(auth.user.id);
  console.log(`User ${auth.user.sub} does not have ability for action ${aclAbilities.action} on subject ${aclAbilities.subject}`)
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
