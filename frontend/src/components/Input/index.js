import classNames from 'classnames/bind';

import styles from './Input.module.scss';
const cx = classNames.bind(styles);
function Input({
    placeholder,
    type = 'text',
    small,
    forpopup,
    medium,
    tiny,
    longtitle,
    children,
    title,
    ...passprops
}) {
    const classes = cx('input', { small, medium, tiny, forpopup, longtitle });
    console.log('aaaa', children);
    return (
        <label className={classes}>
            <input
                className={cx('input__field')}
                type={type}
                placeholder={placeholder}
                value={children}
                {...passprops}
            />
            <span className={cx('input__label')}>{title}:</span>
        </label>
    );
}

export default Input;
