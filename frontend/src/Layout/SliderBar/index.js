import { faGear, faInfoCircle, faPen, faRightToBracket, faShieldVirus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './sliderbar.scss';
const cx = classNames.bind(styles);

function SliderBarProfile() {
    return (
        <div className={cx('wapper')}>
            <div className={cx('welcome')}>
                Xin Chào, <span> Nghĩa</span>
            </div>
            <div className={cx('btn_barlist')}>
                <div className={cx('btn_bar')}>
                    <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Thông tin tài khoản</span>
                </div>
                <div className={cx('btn_bar')}>
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Chỉnh sửa thông tin</span>
                </div>
                <div className={cx('btn_bar')}>
                    <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Cài đặt thông báo</span>
                </div>
                <div className={cx('btn_bar')}>
                    <FontAwesomeIcon icon={faShieldVirus}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Đổi mật khẩu</span>
                </div>
                <div className={cx('btn_logout')}>
                    <FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon>
                    <span className={cx('btn_logout_text')}>Đăng xuất</span>
                </div>
            </div>
        </div>
    );
}

export default SliderBarProfile;
