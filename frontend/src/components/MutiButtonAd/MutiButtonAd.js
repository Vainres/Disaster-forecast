import { faAngleRight, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './MutiButton.module.scss';
const cx = classNames.bind(styles);

function MutiButtonAd(props) {
    const data = props.data;
    const handelfix = () => {
        console.log('handelfix', data);
    };
    const handeldelete = () => {
        console.log('handeldelete', data);
    };
    return (
        <div className={cx('wrapper')}>
            <Button muti fix onClick={handelfix}>
                {'Sửa'}
                <FontAwesomeIcon icon={faWrench}></FontAwesomeIcon>
            </Button>
            <Button muti danger onClick={handeldelete}>
                {'Xóa'}
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </Button>
        </div>
    );
}

export default MutiButtonAd;
