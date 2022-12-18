import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircle, faHome, faMap, faSearch, faUser,faExclamation,faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import LogoWebsite from '~/Layout/Logo';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('wapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <LogoWebsite />
                </div>
                <div className={cx('searchbar')}>
                    <input type="text" className={cx('searchinput')} placeholder="Hãy Nhập gì đó..." />
                    <span className={cx('searchdecore')}>|</span>
                    <button className={cx('searchbtn')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className={cx('HeaderRightContain')}>
                    <Link to={'/'} className={cx('headerbtn')}>
                        <FontAwesomeIcon icon={faHome} />
                    </Link>
                    <Link to={'/admin'} className={cx('headerbtn')}>
                        <FontAwesomeIcon icon={faMap} />
                    </Link>
                    <button className={cx('headerbtn')}>
                        <FontAwesomeIcon icon={faBell} />
                        <span className={cx('alertheader')}>
                            <FontAwesomeIcon icon={faCircle} />
                        </span>
                        <span className={cx('insertcmomtor')}></span>
                        <div className={cx('dropinfo')}>
                            <div className={cx('attention')}>Thông báo</div>
                            <hr/>
                            <div className={cx('dropdown')}>
                                <div className={cx('notify_item')}>
                                    <div className={cx('notify_icon_attention')}>
                                        <FontAwesomeIcon icon={faExclamation}/>
                                    </div>
                                    <div className={cx('notify_info')}>
					                    <p>Stom on Timeline Share </p>
					                    <span className={cx('notify_time')}>10 phút trước</span>
                                    </div>
			                    </div>
                                <div className={cx('notify_item')}>
                                    <div className={cx('notify_icon_warning')}>
                                        <FontAwesomeIcon icon={faTriangleExclamation}/>
                                    </div>
                                    <div className={cx('notify_info')}>
					                    <p>Stom is coming Timeline Share </p>
					                    <span className={cx('notify_time')}>1 ngày trước</span>
                                    </div>
			                    </div>
                                <div className={cx('notify_item')}>
                                    <div className={cx('notify_icon_warning')}>
                                        <FontAwesomeIcon icon={faTriangleExclamation}/>
                                    </div>
                                    <div className={cx('notify_info')}>
					                    <p>Stom is coming Timeline Share </p>
					                    <span className={cx('notify_time')}>1 ngày trước</span>
                                    </div>
			                    </div>
                                <div className={cx('notify_item')}>
                                    <div className={cx('notify_icon_warning')}>
                                        <FontAwesomeIcon icon={faTriangleExclamation}/>
                                    </div>
                                    <div className={cx('notify_info')}>
					                    <p>Stom is coming Timeline Share </p>
					                    <span className={cx('notify_time')}>1 ngày trước</span>
                                    </div>
			                    </div>
                                <div className={cx('notify_item')}>
                                    <div className={cx('notify_icon_warning')}>
                                        <FontAwesomeIcon icon={faTriangleExclamation}/>
                                    </div>
                                    <div className={cx('notify_info')}>
					                    <p>Stom is coming Timeline Share </p>
					                    <span className={cx('notify_time')}>1 ngày trước</span>
                                    </div>
			                    </div>


                               
                                
                            </div>
                            
                        </div>
                    </button>
                    <Link to="/Profile" className={cx('headerbtn')}>
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
