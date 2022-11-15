import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import styles from './Info.module.scss';
const cx = classNames.bind(styles);

function AddAdmin(props) {
    return (
        <div className={cx('wapper')}>
            <h2 className={cx('title')}>Thêm Người Quản Trị</h2>
            <Input name="name" title="Name" placeholder="Nguyễn Văn A"></Input>
            <Input name="email" title="Email" placeholder="Nguyễn Văn A"></Input>
            <Input small title="Password" type="password" placeholder="Passs1xy#"></Input>
            <div className={cx('colum2')}>
                <div className={cx('insertcolumn')}></div>
                <Button success small href="https://hndev.tech" onClick={() => alert('click đã đã')}>
                    Thêm
                </Button>
            </div>
        </div>
    );
}

export default AddAdmin;
