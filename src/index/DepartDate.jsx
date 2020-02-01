import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { h0 } from '../common/fp';
import dayjs from 'dayjs';
import './DepartDate.css';

// @tips DepartDate函数没有使用memo包裹，原因是除了props，函数中的h0()也可以获取变量，这个是容易忽略的地方
// 解决方案是将h0()中需要的变量收敛到props中
export default function DepartDate(props) {
    const { time, onClick } = props;

    const h0OfDepart = h0(time);
    const departDate = new Date(h0OfDepart);

    const departDateString = useMemo(() => {
        return dayjs(h0OfDepart).format('YYYY-MM-DD');
    }, [h0OfDepart]);

    const isToday = h0OfDepart === h0();

    // @tips 获取今日是周几
    const weekString =
        '周' +
        ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()] +
        (isToday ? '(今天)' : '');

    return (
        <div className="depart-date" onClick={onClick}>
            <input type="hidden" name="date" value={departDateString} />
            {departDateString} <span className="depart-week">{weekString}</span>
        </div>
    );
}

DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};
