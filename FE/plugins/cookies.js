import VueCookie from 'vue-cookies'

export default function(ctx, inject) {
  inject('cookie', VueCookie)
}
