import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import styles from './Alertpopup.module.scss';

const cx = classNames.bind(styles);

function Alertpopup({
    close,
    message = { msg: 'Bạn có chắc chắn muốn xóa??', deleted: false },
    FunDelDone,
    FunDel = () => {},
}) {
    return (
        <div className={cx('modal')}>
            <a id="close" className={cx('close')} onClick={close}>
                &times;
            </a>
            <div className={cx('header')} color={'red'}>
                <FontAwesomeIcon icon={faTriangleExclamation} /> Cảnh Báo{' '}
            </div>
            <div className={cx('cxcontent')}>
                <span className={cx('msg')}>{message.msg}</span>
                <div className={cx('btn')}>
                    <Button onClick={FunDel}>XÓA</Button>
                    <Button onClick={FunDelDone}>ĐÓNG</Button>
                </div>
            </div>
        </div>
    );
}

export default Alertpopup;
