/**
 * Created by yichenghui on 2017/5/8.
 */
export const isPaginData = ({commit}, num) => {
  return commit('CURIDX', num)
}
