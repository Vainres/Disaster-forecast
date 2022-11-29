import {
    faGear,
    faHurricane,
    faInfoCircle,
    faPen,
    faPeopleRoof,
    faRightToBracket,
    faShieldVirus,
    faUserPlus,
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
                Xin Chào, <span> Nghĩa</span>
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
                <Link to={'/editprofile'} className={cx(props.name === '3' ? 'btn_bar active' : 'btn_bar')}>
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Chỉnh sửa thông tin</span>
                </Link>
                <Link className={cx(props.name === '4' ? 'btn_bar active' : 'btn_bar')}>
                    <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                    <span className={cx('btn_bar_name')}>Cài đặt thông báo</span>
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
