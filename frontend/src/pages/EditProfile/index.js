import SliderBarProfile from '~/Layout/SliderBar';
import styles from './EditProfile.module.scss';
import classNames from 'classnames/bind';
import InfoProfile from '~/Layout/Info';
import EditoProfile from '~/Layout/InfoEdit';

const cx = classNames.bind(styles);
function EditProfilepage() {
    return (
        <div className={cx('wapper')}>
            <SliderBarProfile className={cx('slider')} name="2" />
            <EditoProfile className={cx('contentpf')} />
        </div>
    );
}

export default EditProfilepage;
