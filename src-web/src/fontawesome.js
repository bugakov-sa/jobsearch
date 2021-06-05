import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faPen, faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faTrashAlt)
library.add(faPen)
library.add(faSave)
library.add(faWindowClose)
