import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import EditProfilepage from '~/pages/EditProfile';
import EditPasspage from '~/pages/ChangePass';

//public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/editprofile', component: EditProfilepage },
    { path: '/changepass', component: EditPasspage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
