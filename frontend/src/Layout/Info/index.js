import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import styles from './Info.module.scss';
const cx = classNames.bind(styles);

function InfoProfile(props) {
    return (
        <div className={cx('wapper')}>
            <h2 className={cx('title')}>Thông tin tài khoản</h2>
            <Input name="name" title="Name" placeholder="Nguyễn Văn A">
                Nguyễn Văn A
            </Input>
            <Input name="email" title="Email" placeholder="Nguyễn Văn A">
                19521898@gm.uit.edu.vn
            </Input>
            <Input small title="Password" type="password" placeholder="Passs1xy#">
                12345678
            </Input>
            <div className={cx('colum2')}>
                <div className={cx('insertcolumn')}></div>
                <Button primary medium href="https://hndev.tech" onClick={() => alert('click đã đã')}>
                    Lưu Thông Tin
                </Button>
            </div>
        </div>
    );
}

export default InfoProfile;
