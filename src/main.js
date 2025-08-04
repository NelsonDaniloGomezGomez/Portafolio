import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Solid Icons (fas)
import { faFileAlt, faAdjust, faServer, faDatabase, faCloud, faCode, faLayerGroup, faDownload, faGamepad  } from '@fortawesome/free-solid-svg-icons'

// Brand Icons (fab)
import { faLinkedin, faGithub, faAngular, faJs, faPython, faHtml5, faVuejs, faReact } from '@fortawesome/free-brands-svg-icons'

// Agregar íconos a la librería
library.add(
  faFileAlt,
  faAdjust,
  faServer,
  faDatabase,
  faCloud,
  faCode,
  faLayerGroup,
  faLinkedin,
  faGithub,
  faAngular,
  faVuejs, 
  faReact,
  faJs,
  faPython,
  faHtml5,
  faDownload,
  faGamepad 
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')