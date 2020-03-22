import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faQuestionCircle)
library.add(faTimesCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)
