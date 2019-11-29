import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimesCircle)
library.add(faBars)

Vue.component('font-awesome-icon', FontAwesomeIcon)
