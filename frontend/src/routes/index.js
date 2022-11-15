import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import EditProfilepage from '~/pages/EditProfile';
import EditPasspage from '~/pages/ChangePass';
import Admin from '~/pages/AdminMainPage/Admin';
import AddAdminPage from '~/pages/AddAdmin';

//public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/editprofile', component: EditProfilepage },
    { path: '/changepass', component: EditPasspage },
    { path: '/admin', component: Admin },
    { path: '/admin/add', component: AddAdminPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
