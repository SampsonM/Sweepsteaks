export default async function({ redirect, app }) {
     
  console.log('stored cookie - ', app.$cookie.get('ssTok'))

  const loggedIn = await app.$UserApi.getUserLoginState()

  if (!loggedIn) {
    redirect('/login')
  }
}
