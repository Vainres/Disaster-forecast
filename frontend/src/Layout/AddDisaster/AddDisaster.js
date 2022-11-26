import styles from './AddDisaster.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function AddDisaster({ close }) {
    return (
        <div className={cx('modal')}>
            <a className={cx('close')} onClick={close}>
                &times;
            </a>
            <div className={cx('header')}> Thêm Thiên Tai </div>
            <div className={cx('cxcontent')}>
                <h1>In put các kiểu</h1>
            </div>
        </div>
    );
}

export default AddDisaster;
