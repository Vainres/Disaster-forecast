import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import EditProfilepage from '~/pages/EditProfile';
import EditPasspage from '~/pages/ChangePass';
import Admin from '~/pages/AdminMainPage/Admin';
import AddAdminPage from '~/pages/AddAdmin';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

//public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/editprofile', component: EditProfilepage },
    { path: '/changepass', component: EditPasspage },
    { path: '/admin', component: Admin },
    { path: '/admin/add', component: AddAdminPage },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
