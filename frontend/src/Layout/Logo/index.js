import classNames from 'classnames/bind';
import styles from './Logo.module.scss';
const cx = classNames.bind(styles);
function LogoWebsite() {
    return (
        <div>
            <img className={cx('logo')} src={require('~/asset/Disasterforecast.png')} alt="" />
        </div>
    );
}

export default LogoWebsite;
