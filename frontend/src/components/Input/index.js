import classNames from 'classnames/bind';

import styles from './Input.module.scss';
const cx = classNames.bind(styles);
function Input({ placeholder, type = 'text', small, medium, tiny, children, title }) {
    const classes = cx('input', { small, medium, tiny });
    console.log('aaaa', children);
    return (
        <label className={classes}>
            <input className={cx('input__field')} type={type} placeholder={placeholder} value={children} />
            <span className={cx('input__label')}>{title}:</span>
        </label>
    );
}

export default Input;
