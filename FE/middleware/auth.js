export default async function({ store, redirect, app }) {
  const loggedIn = await app.$UserApi.getUserLoginState()

  if (!loggedIn && !store.state.allwd) {
    redirect('/login')
  }
}
