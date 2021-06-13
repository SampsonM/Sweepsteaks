export default async function({ redirect, app, route, store }) {
  const user = await app.$UserApi.getUserLoginState()

  store.commit('UPDATE_USER', user)
  store.commit('UPDATE_CURRENT_GROUPS', user.groups)
  store.commit('UPDATE_ALLWD', user.authenticated)

  console.log(route.fullPath)

  if (!user.authenticated && route.fullPath !== '/login') {
    return redirect('/login')
  } else if (user.authenticated && route.fullPath === '/login') {
    return redirect('/dashboard')
  }
}
