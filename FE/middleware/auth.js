export default async function({ store, redirect, app }) {
  const loggedIn = await app.$UserApi.getUserLoginState()

  if (!loggedIn) {
    redirect('/login')
  }
}
