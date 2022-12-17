import SliderBarProfile from '~/Layout/SliderBar';
import styles from './EditProfile.module.scss';
import classNames from 'classnames/bind';
import EditoProfile from '~/Layout/InfoEdit';
import SliderBarAdmin from '~/Layout/SliderBarAdmin';
import ListUser from '~/Layout/ListUser/ListAdmin';
import ListNoti from '~/Layout/ListNoti/ListAdmin';

const cx = classNames.bind(styles);
function NotificationPage() {
    return (
        <div className={cx('wapper')}>
            <SliderBarAdmin className={cx('slider')} name="4" />
            <ListNoti className={cx('contentpf')} />
        </div>
    );
}

export default NotificationPage;
