import { faAngleRight, faInfo, faInfoCircle, faPlus, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Request from '~/utils/requests';
import styles from './ThreeBtn.module.scss';
const cx = classNames.bind(styles);

function ThreeBtn(props) {
    const request = new Request();
    const data = props.data;
    const handelfix = () => {
        document.getElementById('showpopup_edit').click();
        localStorage.setItem('id_edit', data.id);
    };
    const handeldelete = () => {
        document.getElementById('showpopup_alert').click();
        localStorage.setItem('id_delete', data.id);
    };
    const handelseenDetails = () => {
        document.getElementById('showpopup_details').click();
        localStorage.setItem('id_seen', data.id);
    };
    const handelAddChil = () => {
        document.getElementById('showpopup_addchill').click();
        localStorage.setItem('id_addchill', data.id);
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
            <Button muti warns onClick={handelAddChil}>
                {'Lịch'}
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </Button>
            <Button muti fix onClick={handelseenDetails}>
                {'Xem'}
                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
            </Button>
        </div>
    );
}

export default ThreeBtn;
