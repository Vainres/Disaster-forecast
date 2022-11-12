import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import styles from './Info.module.scss';
const cx = classNames.bind(styles);

function ChangePass(props) {
    return (
        <div className={cx('wapper')}>
            <h2 className={cx('title')}>Thay đổi Mật Khẩu</h2>
            <Input
                longtitle
                name="name"
                title="Mật Khẩu Cũ"
                type="password"
                placeholder="Hãy nhập mật khẩu hiện tại"
            ></Input>
            <Input
                longtitle
                name="email"
                title="Mật Khẩu Mới"
                type="password"
                placeholder="Hãy nhập mật khẩu mới"
            ></Input>
            <Input longtitle title="Xác Nhận Mật Khẩu" type="password" placeholder="Xác nhận mật khẩu mới"></Input>
            <div className={cx('colum2')}>
                <div className={cx('insertcolumn')}></div>
                <Button primary medium href="https://hndev.tech" onClick={() => alert('click đã đã')}>
                    Lưu Thay Đổi
                </Button>
            </div>
        </div>
    );
}

export default ChangePass;
