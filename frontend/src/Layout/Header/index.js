import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircle, faHome, faMap, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import LogoWebsite from '~/Layout/Logo';

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
                    <button className={cx('headerbtn')}>
                        <FontAwesomeIcon icon={faHome} />
                    </button>
                    <button className={cx('headerbtn')}>
                        <FontAwesomeIcon icon={faMap} />
                    </button>
                    <button className={cx('headerbtn')}>
                        <FontAwesomeIcon icon={faBell} />
                        <span className={cx('alertheader')}>
                            <FontAwesomeIcon icon={faCircle} />
                        </span>
                        <span className={cx('insertcmomtor')}></span>
                        <div className={cx('dropinfo')}>1111</div>
                    </button>
                    <button className={cx('headerbtn')}>
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
