export default function({ store, app, redirect }) {
  if (!store.state.allwd) {
    redirect('/login')
  }
}
