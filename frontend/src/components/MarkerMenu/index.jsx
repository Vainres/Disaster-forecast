import classNames from 'classnames/bind';
import styles from './MarkerMenu.module.scss';

const cx = classNames.bind(styles);





export default function MarkerMenu({Onclick}){
    return( <button classname={cx('infomenu')} Onclick={Onclick}>
                Mark this
            </button>);
}
