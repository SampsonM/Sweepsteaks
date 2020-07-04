export default async function({ store, redirect, $UserApi }) {
  const loggedIn = await $UserApi.getUserLoginState()

  if (!loggedIn && !store.state.allwd) {
    redirect('/login')
  }
}
