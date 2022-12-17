import { faGear, faInfoCircle, faPen, faRightToBracket, faShieldVirus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './sliderbar.scss';
const cx = classNames.bind(styles);

function SliderBarProfile(props) {
    return (
        <div className={cx('wapper')}>
            <div className={cx('welcome')}>
                Xin Chào, <span> {localStorage.getItem('username')}</span>
            </div>
            <div className={cx('btn_barlist')}>
                <Link to={'/profile'} className={cx(props.name === '1' ? 'btn_bar active' : 'btn_bar')}>
                    <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Thông tin tài khoản</span>
                </Link>
                <Link to={'/editprofile'} className={cx(props.name === '2' ? 'btn_bar active' : 'btn_bar')}>
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Chỉnh sửa thông tin</span>
                </Link>
                <Link className={cx(props.name === '3' ? 'btn_bar active' : 'btn_bar')}>
                    <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Cài đặt thông báo</span>
                </Link>
                <Link to={'/changepass'} className={cx(props.name === '4' ? 'btn_bar active' : 'btn_bar')}>
                    <FontAwesomeIcon icon={faShieldVirus}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Đổi mật khẩu</span>
                </Link>
                <Link to="/login" className={cx('btn_logout')}>
                    <FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon>
                    <span className={cx('btn_logout_text')}>Đăng xuất</span>
                </Link>
            </div>
        </div>
    );
}

export default SliderBarProfile;
