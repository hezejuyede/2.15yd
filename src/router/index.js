import Vue from 'vue'
import Router from 'vue-router'


import Index from '../components/engineering/waitingForHomework'

import CurrentTask from '../components/engineering/currentTask'
import ProductionExecutionLogin from '../components/login/ProductionExecutionLogin'
import Drawing from '../components/drawing/drawing'
import Safe from '../components/safe/safe'
import Quality from '../components/quality/quality'

import Equipment from '../components/equipment/equipment'

import equipmentInspection from '../components/equipment/equipmentInspection'

import abnormalReporting from '../components/equipment/abnormalReporting'

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
      path: '/Equipment',
      name: 'Equipment',
      component: Equipment,
      meta: {
        keepAlive: false
      },
      children: [
        {
          path: 'equipmentInspection',
          name: 'equipmentInspection',
          component: equipmentInspection,
          meta: {
            keepAlive: true
          },
        },
        {
          path: 'abnormalReporting',
          name: 'abnormalReporting',
          component: abnormalReporting,
          meta: {
            keepAlive: true
          },
        }
      ]
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
