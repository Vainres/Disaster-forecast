import SliderBarProfile from '~/Layout/SliderBar';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import InfoProfile from '~/Layout/Info';

const cx = classNames.bind(styles);
function Profile() {
    return (
        <div className={cx('wapper')}>
            <SliderBarProfile className={cx('slider')} name="1" />
            <InfoProfile className={cx('contentpf')} type="pass" />
        </div>
    );
}

export default Profile;
