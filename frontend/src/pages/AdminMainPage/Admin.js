import styles from './Admin.module.scss';
import classNames from 'classnames/bind';
import SliderBarAdmin from '~/Layout/SliderBarAdmin';
import InfoProfile from '~/Layout/Info';
import AddAdminPage from '~/pages/AddAdmin';
import EditPasspage from '~/pages/ChangePass';
import DisasterList from '~/Layout/Disaster';

const cx = classNames.bind(styles);
function Admin() {
    return (
        <div className={cx('wapper')}>
            <SliderBarAdmin className={cx('slider')} name="1" />
            <DisasterList className={cx('contentpf')} type="pass" />
        </div>
    );
}

export default Admin;
