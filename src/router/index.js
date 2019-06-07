import Vue from 'vue'
import Router from 'vue-router'


import Index from '../components/engineering/waitingForHomework'

import CurrentTask from '../components/engineering/currentTask'
import ProductionExecutionLogin from '../components/login/ProductionExecutionLogin'
import Drawing from '../components/drawing/drawing'
import Safe from '../components/safe/safe'

//质量管理
import Quality from '../components/quality/quality'
import jizhunxuexi from '../components/quality/jizhunxuexi.vue'
import kehuwuzuo from '../components/quality/kehuwuzuo.vue'
import neibuwuzuo from '../components/quality/neibuwuzuo.vue'
import tixiangxuexi from '../components/quality/tixiangxuexi.vue'


import Equipment from '../components/equipment/equipment'

import equipmentInspection from '../components/equipment/equipmentInspection'

import abnormalReporting from '../components/equipment/abnormalReporting'

import fenlei from '../components/equipment/fenlei'

import haocairuk from '../components/equipment/haocairuk.vue'

import haocaichuku from '../components/equipment/haocaichuku.vue'

import guzhangchuli from '../components/equipment/guzhangchuli.vue'

import haocai from '../components/equipment/haocai'

import Materiel from '../components/materiel/materiel'

import TaskList from '../components/engineering/TaskList'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/ProductionExecutionLogin',
      name: 'ProductionExecutionLogin',
      component: ProductionExecutionLogin,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/taskList',
      name: 'TaskList',
      component: TaskList,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Drawing',
      name: 'Drawing',
      component: Drawing,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/CurrentTask',
      name: 'CurrentTask',
      component: CurrentTask,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Safe',
      name: 'Safe',
      component: Safe,
      meta: {
        keepAlive: false
      }
    },

    {
      path: '/Quality',
      name: 'Quality',
      component: Quality,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/jizhunxuexi',
      name: 'jizhunxuexi',
      component: jizhunxuexi,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/kehuwuzuo',
      name: 'kehuwuzuo',
      component: kehuwuzuo,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/neibuwuzuo',
      name: 'neibuwuzuo',
      component: neibuwuzuo,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/tixiangxuexi',
      name: 'tixiangxuexi',
      component: tixiangxuexi,
      meta: {
        keepAlive: false
      }
    },



    {
      path: '/Equipment',
      name: 'Equipment',
      component: Equipment,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/equipmentInspection',
      name: 'equipmentInspection',
      component: equipmentInspection,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/abnormalReporting',
      name: 'abnormalReporting',
      component: abnormalReporting,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/fenlei',
      name: 'fenlei',
      component: fenlei,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/haocai',
      name: 'haocai',
      component: haocai,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/haocairuk',
      name: 'haocairuk',
      component: haocairuk,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/haocaichuku',
      name: 'haocaichuku',
      component: haocaichuku,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/guzhangchuli',
      name: 'guzhangchuli',
      component: guzhangchuli,
      meta: {
        keepAlive: false
      }
    },

    {
      path: '/Materiel',
      name: 'Materiel',
      component: Materiel,
      meta: {
        keepAlive: false
      }
    },
  ]
})
