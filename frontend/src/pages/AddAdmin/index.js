import styles from './Admin.module.scss';
import classNames from 'classnames/bind';
import SliderBarAdmin from '~/Layout/SliderBarAdmin';
import InfoProfile from '~/Layout/Info';
import AddAdmin from '~/Layout/AddAdmin';
import ListAddmin from '~/Layout/ListAdmin/ListAdmin';

const cx = classNames.bind(styles);
function AddAdminPage() {
    return (
        <div className={cx('wapper')}>
            <SliderBarAdmin className={cx('slider')} name="2" />
            <ListAddmin className={cx('contentpf')} type="pass" />
        </div>
    );
}

export default AddAdminPage;
