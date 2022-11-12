import SliderBarProfile from '~/Layout/SliderBar';
import styles from './EditProfile.module.scss';
import classNames from 'classnames/bind';
import ChangePass from '~/Layout/ChangePass';

const cx = classNames.bind(styles);
function EditPasspage() {
    return (
        <div className={cx('wapper')}>
            <SliderBarProfile className={cx('slider')} name="4" />
            <ChangePass className={cx('contentpf')} />
        </div>
    );
}

export default EditPasspage;
