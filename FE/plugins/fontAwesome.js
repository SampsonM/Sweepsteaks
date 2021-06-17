import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faCircleNotch, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faQuestionCircle)
library.add(faTimesCircle)
library.add(faCircleNotch)
library.add(faCog)

Vue.component('font-awesome-icon', FontAwesomeIcon)
