import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
const cx = classNames.bind(styles);

function Button({
    title = '',
    to,
    href,
    primary = false,
    outline = false,
    small = false,
    medium = false,
    large = false,
    success = false,
    muti = false,
    fix = false,
    danger = false,
    warns = false,
    children,
    onClick,
    ...passprops
}) {
    let Comp = 'Button';
    const props = {
        onClick,
        ...passprops,
    };
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wapper', { fix, danger, muti, primary, outline, warns, small, medium, large, success });
    return (
        <Comp className={classes} {...props}>
            <span>
                {children}
                {title}
            </span>
        </Comp>
    );
}

export default Button;
