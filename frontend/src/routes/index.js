import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import EditProfilepage from '~/pages/EditProfile';
import EditPasspage from '~/pages/ChangePass';
import Admin from '~/pages/AdminMainPage/Admin';
import AddAdminPage from '~/pages/AddAdmin';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Usermanagement from '~/pages/Usermanagement';
import NotificationPage from '~/pages/Notification';

//public routes
const publicRoutes = [
    { path: '/', component: Home, Header: true },
    { path: '/profile', component: Profile, Header: true },
    { path: '/editprofile', component: EditProfilepage, Header: true },
    { path: '/usermanagerment', component: Usermanagement, Header: true },
    { path: '/changepass', component: EditPasspage, Header: true },
    { path: '/admin', component: Admin, Header: true },
    { path: '/admin/add', component: AddAdminPage, Header: true },
    { path: '/login', component: Login, Header: false },
    { path: '/register', component: Register, Header: false },
    { path: '/admin/notification', component: NotificationPage, Header: true },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
