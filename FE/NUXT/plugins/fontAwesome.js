import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faQuestionCircle)
library.add(faTimesCircle)
library.add(faCircleNotch)

Vue.component('font-awesome-icon', FontAwesomeIcon)
