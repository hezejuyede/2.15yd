import Vue from 'vue'
import Router from 'vue-router'


import Index from '../components/index'
import CurrentTask from '../components/currentTask/currentTask'
import ProductionExecutionLogin from '../components/ProductionExecutionLogin'
import Drawing from '../components/drawing/drawing'
import Safe from '../components/safe/safe'
import Quality from '../components/quality/quality'
import Equipment from '../components/equipment/equipment'
import Materiel from '../components/materiel/materiel'
import Security from '../components/security/security'
import TaskList from '../components/taskList/TaskList'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/ProductionExecutionLogin',
      name: 'ProductionExecutionLogin',
      component: ProductionExecutionLogin,

    },
    {
      path: '/taskList',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/Drawing',
      name: 'Drawing',
      component: Drawing
    },
    {
      path: '/CurrentTask',
      name: 'CurrentTask',
      component: CurrentTask
    },
    {
      path: '/Safe',
      name: 'Safe',
      component: Safe
    },
    {
      path: '/Quality',
      name: 'Quality',
      component: Quality
    },
    {
      path: '/Equipment',
      name: 'Equipment',
      component: Equipment
    },
    {
      path: '/Materiel',
      name: 'Materiel',
      component: Materiel
    },
    {
      path: '/Security',
      name: 'Security',
      component: Security
    },
  ]
})
