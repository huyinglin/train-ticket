import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

export default createStore(
  combineReducers(reducers),
  {
    from: '北京', // 始发站
    to: '上海', // 终到站
    isCitySelectorVisible: false, // 城市选择浮层状态
    currentSelectingLeftCity: false, // 选择城市后需要回填的地方（始发站或终到站）
    cityData: null, // 城市数据
    isLoadingCityData: false,
    isDateSelectorVisible: false, // 日期选择浮层状态
    departDate: Date.now(), // 默认日期
    highSpeed: false, // 是否选择高铁
  },
  applyMiddleware(thunk),
);
