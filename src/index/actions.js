export const ACTION_SET_FROM = "SET_FROM";
export const ACTION_SET_TO = "SET_TO";
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = "SET_IS_CITY_SELECTOR_VISIBLE";
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = "SET_CURRENT_SELECTING_LEFT_CITY";
export const ACTION_SET_CITY_DATA = "SET_CITY_DATA";
export const ACTION_SET_IS_LOADING_CITY_DATA = "SET_IS_LOADING_CITY_DATA";
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = "SET_IS_DATE_SELECTOR_VISIBLE";
export const ACTION_SET_DEPART_DATE = "SET_DEPART_DATE";
export const ACTION_SET_HIGH_SPEED = "SET_HIGH_SPEED";

export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    payload: from,
  };
}

export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    payload: to,
  };
}

export function setIsloadingCityData(isloadingCityData) {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: isloadingCityData,
  };
}

export function setCityData(cityData) {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: cityData,
  };
}

export function toggleHightSpeed() {
  return (dispatch, getState) => {
    const { hightSpeed } = getState();
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !hightSpeed,
    });
  };
}

export function showCitySelector(currentSelectingLeftCity) {
  return (dispatch, getState) => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true,
    });
    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity,
    });
  };
}

export function hideCitySelector() {
  return {
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false,
  };
}

export function setSelectedCity(city) {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState();
    if (currentSelectingLeftCity) {
      dispatch(setFrom(city));
    } else {
      dispatch(setTo(city));
    }
  };
}

export function showDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: true,
  };
}

export function hideDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false,
  };
}

export function exchangeFromTo() {
  return (dispatch, getState) => {
    const { from, to } = getState();
    dispatch(setFrom(to));
    dispatch(setTo(from));
  };
}

export function setDepartDate(date) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: date,
  };
}