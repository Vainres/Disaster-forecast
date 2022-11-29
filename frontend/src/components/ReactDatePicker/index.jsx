import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ReactDatePicker.module.scss"
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


export default function ReactDatePicker({value,setValue}){



    return (
        <DatePicker 
        selected={value} 
        onChange={(date) => setValue(date) } 
        wrapperClassName={cx("datePicker")}
        placeholderText="DD/MM/YYYY"
        />
    );
}