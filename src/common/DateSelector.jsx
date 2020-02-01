import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { h0 } from './fp';
import './DateSelector.css';

import Header from './Header';

function Day(props) {
  const { day, onSelect } = props;

  if (!day) {
    return <td className="null"></td>;
  }

  const classes = [];
  const now = h0();

  const dateString = new Date(day);

  if (day < now) {
    classes.push('disabled');
  }

  if (dateString.getDay() === 6 || dateString.getDay() === 0) {
    classes.push('weekend');
  }

  const dayString = now === day ? '今天' : dateString.getDate();

  return (
    <td className={classnames(classes)} onClick={() => onSelect(day)}>
      {dayString}
    </td>
  );
}

Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
}

function Week(props) {
  const { days, onSelect } = props;
  return (
    <tr className="date-table-days">
      {days.map((day, idx) =>
        <Day
          key={idx}
          day={day}
          onSelect={onSelect}
        />
      )}
    </tr>
  );
}

Week.propTypes = {
  days: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

function Month(props) {
  const { startingTimeInMonth, onSelect } = props;

  const startDay = new Date(startingTimeInMonth);
  const currentDay = new Date(startingTimeInMonth);

  let days = [];

  // @tips 利用两个月份是否相等判作为判定，获取一个月的每天。月份一旦不等，即当月已遍历结束
  while (startDay.getMonth() === currentDay.getMonth()) {
    days.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }

  // 获取startDay是周几
  const startDayWeek = startDay.getDay();
  // @tips 一个月的开始有可能不是周一，所以要用空补位。补位的个数是周几减1
  days = new Array(startDayWeek ? startDayWeek - 1 : 6)
    .fill(null)
    .concat(days);

  // 填充月尾
  const lastDayWeek = (new Date(days[days.length - 1])).getDay();
  days = days.concat(new Array(lastDayWeek ? 7 - lastDayWeek : 0).fill(null));

  const weeks = [];

  for (let row = 0; row < days.length / 7; ++row) {
    const week = days.slice(row * 7, (row + 1) * 7);
    weeks.push(week);
  }

  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>
              {startDay.getFullYear()}年{startDay.getMonth() + 1}月
            </h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="data-table-weeks">
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className="weekend">周六</th>
          <th className="weekend">周日</th>
        </tr>
        {weeks.map((week, idx) =>
          <Week
            key={idx}
            days={week}
            onSelect={onSelect}
          />
        )}
      </tbody>
    </table>
  );
}

Month.propTypes = {
  startingTimeInMonth: PropTypes.number.isRequired, // 以每月的第一天的0时0分代表这个月
  onSelect: PropTypes.func.isRequired,
};

function DateSelector(props) {
  const {
    show,
    onBack,
    onSelect,
  } = props;

  const today = new Date();

  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  // 获取当月第一天
  today.setDate(1);

  //获取当前月及后两个月
  const monthList = [today.getTime()];
  // @tips 使用setMonth获取下个月，不会产生月份溢出问题
  today.setMonth(today.getMonth() + 1);
  monthList.push(today.getTime());

  today.setMonth(today.getMonth() + 1);
  monthList.push(today.getTime());

  return (
    <div className={classnames('date-selector', { hidden: !show })}>
      <Header title="日期选择" onBack={onBack}/>
      <div className="date-selector-tables">
        {monthList.map((month, idx) =>
          <Month
            key={idx}
            startingTimeInMonth={month}
            onSelect={onSelect}
          />
        )}
      </div>
    </div>
  );
}

DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default DateSelector;
