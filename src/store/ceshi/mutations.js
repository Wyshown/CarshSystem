/**
 * Created by yichenghui on 2017/5/16.
 */
import {
  CURIDX
} from './mutations-types'

const mutations = {
  [CURIDX] (state, data) {
    state.curIdx = data
  }
}

export default mutations
