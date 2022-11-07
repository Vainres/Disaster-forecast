import classNames from 'classnames/bind';
import styles from './Info.module.scss';
const cx = classNames.bind(styles);

function ChangePass(props) {
    return (
        <div className={cx('wapper')}>
            <h2 className={cx('title')}>Thay đổi Mật Khẩu</h2>
        </div>
    );
}

export default ChangePass;
