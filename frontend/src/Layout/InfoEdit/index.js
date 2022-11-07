import classNames from 'classnames/bind';
import styles from './Info.module.scss';
const cx = classNames.bind(styles);

function EditoProfile(props) {
    return (
        <div className={cx('wapper')}>
            <h2 className={cx('title')}>Chỉnh Sửa Thông Tin</h2>
        </div>
    );
}

export default EditoProfile;
