import {
    faGear,
    faHurricane,
    faInfoCircle,
    faNoteSticky,
    faPen,
    faPeopleRoof,
    faRightToBracket,
    faShieldVirus,
    faUserPlus,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './sliderbar.scss';
const cx = classNames.bind(styles);

function SliderBarAdmin(props) {
    return (
        <div className={cx('wapper')}>
            <div className={cx('welcome')}>
                Xin Chào, <span> {localStorage.getItem('username')}</span>
            </div>
            <div className={cx('btn_barlist')}>
                <Link to={'/admin'} className={cx(props.name === '1' ? 'btn_bar active' : 'btn_bar')}>
                    <FontAwesomeIcon icon={faHurricane}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Danh sách thiên tai</span>
                </Link>
                <Link to={'/admin/add'} className={cx(props.name === '2' ? 'btn_bar active' : 'btn_bar')}>
                    <FontAwesomeIcon icon={faPeopleRoof}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Danh sách Admin</span>
                </Link>
                <Link to={'/usermanagerment'} className={cx(props.name === '3' ? 'btn_bar active' : 'btn_bar')}>
                    <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Quản Lý Người Dùng</span>
                </Link>
                <Link to={'/admin/notification'} className={cx(props.name === '4' ? 'btn_bar active' : 'btn_bar')}>
                    <FontAwesomeIcon icon={faNoteSticky}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Quản Lý Notification</span>
                </Link>

                {/* <div className={cx('btn_logout')}>
                    <FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon>
                    <span className={cx('btn_logout_text')}>Đăng xuất</span>
                </div> */}
            </div>
        </div>
    );
}

export default SliderBarAdmin;
