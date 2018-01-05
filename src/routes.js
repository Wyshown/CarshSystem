import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Componet - View
import HomeView from './components/Home/Home.vue'
import UpdateInforView from './components/CustomerManage/UpdateInformation.vue'
import ReportView from './components/ReportForm/ReportForm.vue'
import ReportCollectionView from './components/ReportForm/ReportCollection.vue'
import getUserInfo from './components/Configure/Authority/UserInfo.vue'
import RoleListView from './components/Configure/Authority/RoleList.vue'
import Staff from './components/Configure/Authority/Staff.vue'
import PwdView from './components/Password.vue'
// 二期
import InventoryFlow from './components/Storage/InventoryFlow.vue'
import OrderInfos from './components/Storage/OrderDetails.vue'
import InventoryHistory from './components/Storage/InventoryHistory.vue'
import CancelOrder from './components/Storage/CancelOrder.vue'
import ServiersManager from './components/ServiersAndGoods/ServiersManager.vue'
import ServiersDetail from './components/ServiersAndGoods/ServiersDetail.vue'

import GoodsManager from './components/ServiersAndGoods/GoodsManager.vue'
import GoodsDetail from './components/ServiersAndGoods/GoodsDetail.vue'
import ServiersAndGoodsDetail from './components/ServiersAndGoods/ServiersAndGoodsDetail.vue'
// 三期
import Message from './components/Message/Message.vue'

import FoodListView from './components/Food/FoodList.vue'
import FoodKindListView from './components/Food/FoodKindList.vue'
import foodDetailView from './components/Food/FoodDetail.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/pwd',
    component: PwdView
  },
  {
    path: '/',
    component: DashView,
    meta: {keepAlive: true},
    children: [
      {
        path: '',
        component: HomeView,
        name: 'Index',
        meta: {description: '首页'}
      },
      {
        path: 'Index/:orderId',
        component: HomeView,
        name: 'Index',
        meta: {description: '首页'}
      },
      {
        path: 'customerDetails/:userId',
        component: UpdateInforView,
        name: 'UpdateInfor',
        meta: {description: '修改用户基本信息'}
      },
      {
        path: 'reportCardVipConsume',
        component: ReportView,
        name: 'reportCardVipConsume',
        meta: {description: '流量统计'}
      },
      {
        path: 'reportCollection',
        component: ReportCollectionView,
        name: 'reportCollection',
        meta: {description: '收藏统计'}
      },
      {
        path: 'getUserInfo',
        component: getUserInfo,
        name: 'getUserInfo',
        meta: {description: '用户管理'}
      },
      {
        path: 'getRoleList',
        component: RoleListView,
        name: 'getRoleList',
        meta: {description: '角色管理'}
      },
      {
        path: 'getManagerList',
        component: Staff,
        name: 'getManagerList',
        meta: {description: '员工管理'}
      },
      {
        path: 'goodsProList',
        component: GoodsManager,
        name: 'goodsProList',
        meta: {description: '销售产品', keepAlive: true}
      },
      {
        path: 'goodsList',
        component: ServiersManager,
        name: 'goodsList',
        meta: {description: '服务项目', keepAlive: true}
      },
      {
        path: 'goodsDetail/:type/:id', /* type : add 添加 edit 编辑 detail 详情 */
        component: GoodsDetail,
        name: 'GoodsDetail',
        meta: {description: '销售产品'}
      },
      {
        path: 'serviersDetail/:type/:id', /* type : add 添加 edit 编辑 detail 详情 */
        component: ServiersDetail,
        name: 'ServiersDetail',
        meta: {description: '服务项目'}
      },
      {
        path: 'serviersAndGoodsDetail/:type/:id', /* type : add 添加 edit 编辑 detail 详情 */
        component: ServiersAndGoodsDetail,
        name: 'ServiersAndGoodsDetail',
        meta: {description: '项目详情'}
      },
      {
        path: 'inventoryFlow/:flowId',
        component: InventoryFlow,
        name: 'InventoryFlow',
        meta: {description: '库存流水'}
      },
      {
        path: 'orderInfos/:orderId/:form', // orderId: 0:产品退货 form: Storage:入库、 order:盘点、 returnOrder:退货
        component: OrderInfos,
        name: 'OrderInfos',
        meta: {description: '详情'}
      },
      {
        path: 'inventory/:historyId',
        component: InventoryHistory,
        name: 'InventoryHistory',
        meta: {description: '盘点历史'}
      },
      {
        path: 'cancelOrder/:cancelOrderId',
        component: CancelOrder,
        name: 'CancelOrder',
        meta: {description: '产品退货'}
      },
      {
        path: 'message',
        component: Message,
        name: 'Message',
        meta: {description: '消息推送'}
      },
      // --------------------------------------------------
      {
        path: 'FoodList',
        component: FoodListView,
        name: 'FoodList',
        meta: {description: '食物列表'}
      },
      {
        path: 'FoodKindList',
        component: FoodKindListView,
        name: 'FoodKindList',
        meta: {description: '食物分类'}
      },
      {
        path: 'foodDetail/:type/:id/:foodKindId', /* type : add 添加 edit 编辑 detail 详情 */
        component: foodDetailView,
        name: 'foodDetail',
        meta: {description: '食物详情'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }, {
    // not found handler
    path: '*/*',
    component: NotFoundView
  }
]

export default routes
