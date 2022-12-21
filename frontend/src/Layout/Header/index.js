import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBell, faCircle, faHome, faMap, faSearch, faUser,faToolbox} from '@fortawesome/free-solid-svg-icons';

import LogoWebsite from '~/Layout/Logo';
import { Link, useNavigate } from 'react-router-dom';
import Request from '~/utils/requests';

import { useState, useEffect } from 'react';
const cx = classNames.bind(styles);
function Header() {
    const [dataUser, setDataUser] = useState(0);
    const [noti, setNoti] = useState([]);

    useEffect(() => {
        request.Get(`http://127.0.0.1:8000/api/admin/getuserif?id=${id}`, [], (res) => {

            setDataUser({ ...res.data.data });
            let username = res.data.data.name;
            username = username.split(' ');
            username = username[username.length - 1];

            localStorage.setItem('username', username);
        });


        request.Get(`http://127.0.0.1:8000/api/user/noti/${id}`, [], (res) => {
            setNoti(res.data.data);
        });
    }, []);
    const navigate = useNavigate();
    const request = new Request();
    const id = localStorage.getItem('user_id');
    if (id == null) {
        alert('Thao Tác Lỗi!! Hãy Đăng Nhập lại.');
        return navigate('/login');
    }

    console.log('sisis', dataUser);
    return (
        <header className={cx('wapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <LogoWebsite />
                </div>
                <div className={cx('searchbar')}>
                    <input type="text" className={cx('searchinput')} placeholder="Hãy Nhập gì đó..." />
                    <span className={cx('searchdecore')}>|</span>
                    <button className={cx('searchbtn')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className={cx('HeaderRightContain')}>
                    <Link to={'/'} className={cx('headerbtn')}>
                        <FontAwesomeIcon icon={faHome} />
                    </Link>

                    {dataUser.isUser === 0 ? (
                        <Link to={'/admin'} className={cx('headerbtn')}>
                            <FontAwesomeIcon icon={faToolbox} />
                        </Link>
                    ) : (
                        ''
                    )}

                    <button className={cx('headerbtn')}>
                        <FontAwesomeIcon icon={faBell} />
                        <span className={cx('alertheader')}>
                            <FontAwesomeIcon icon={faCircle} />
                        </span>
                        <span className={cx('insertcmomtor')}></span>
                        <div className={cx('dropinfo')}>
                            <div className={cx('attention')}>Thông báo</div>
                            <hr/>
                            <div className={cx('dropdown')}>
                            {
                                noti.map((eachNoti)=>{
                                    let severity = ()=> <div className={cx('notify_icon_attention')}>
                                                            <i class="fa-solid fa-exclamation"></i>
                                                        </div>
                                    if(eachNoti.important==2)
                                    {
                                        severity = ()=> <div className={cx('notify_icon_warning')}>
                                                            <i class="fa-solid fa-triangle-exclamation"></i>
                                                        </div>
                                    }
                                    else if(eachNoti.important==3){
                                        severity = ()=> <div className={cx('notify_icon_danger')}>
                                                            <i class="fa-solid fa-triangle-exclamation"></i>
                                                        </div>
                                    }
                                    let [mark,...textNoti] = eachNoti.content.split(".");
                                    let [label,name] = mark.split(":")
                                    console.log('rest',name);
                                    if(eachNoti.ispass==0)
                                        return (                                
                                        <div className={cx('notify_item')}>
                                            {severity()}
                                            <div className={cx('notify_info')}>
                                                <p>{label+":"}<b>{name} </b></p>
                                                <span className={cx('notify_time')}>{textNoti.join(".")}</span>
                                            </div>
                                        </div>)
                                })
                            }

                                
                                
                            </div>
                            
                        </div>
                    </button>
                    <Link
                        to={localStorage.getItem('username') != null ? '/Profile' : '/login'}
                        className={cx('headerbtn')}
                    >
                        <FontAwesomeIcon icon={faUser} />
                        {'  '}
                        {localStorage.getItem('username')}
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
