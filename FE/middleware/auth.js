export default async function({ redirect, app }) {
  const isAuthenticated = await app.$UserApi.getUserLoginState()
  
  if (!isAuthenticated) {
    return redirect('/login')
  }
}
