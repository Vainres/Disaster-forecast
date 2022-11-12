import classNames from 'classnames/bind';
import styles from './Info.module.scss';
const cx = classNames.bind(styles);

function InfoProfile(props) {
    return (
        <div className={cx('wapper')}>
            <h2 className={cx('title')}>Thông tin tài khoản</h2>
        </div>
    );
}

export default InfoProfile;
