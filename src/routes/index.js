import {
  Home,
  Ticket,
  Order,
  Payment,
  Admin,
  User,
  Film,
  History,
  Area,
  Login,
  AddFilm,
  EditFilm,
  Category,
  Theater,
  InfoUser,
  EditUser,
  Room,
  Animation,
  DetailsFilm,
  PaySuccess,
  ManagerTicket,
} from "../pages";
import { DefaultLayout, AdminLayout } from "../layouts";
const PrivateRoutes = ({ children }) => {
  // const isLogin = useSelector(getUser);
  if (true) {
    return children;
  } else {
  }
};

const publicRoutes = [
  {
    path: "/",
    layout: DefaultLayout,
    component: Home,
  },
  {
    path: "/ticket",
    layout: DefaultLayout,
    component: Ticket,
  },
  {
    path: "/paysuccess",
    layout: DefaultLayout,
    component: PaySuccess,
  },
  {
    path: "/order",
    layout: DefaultLayout,
    component: Order,
  },
  {
    path: "/payment",
    layout: DefaultLayout,
    component: Payment,
  },
  {
    path: "/history",
    layout: DefaultLayout,
    component: History,
  },
  {
    path: "/admin",
    layout: AdminLayout,
    component: Admin,
  },
  {
    path: "/managerTicket",
    layout: AdminLayout,
    component: ManagerTicket,
  },
  {
    path: "/user",
    layout: AdminLayout,
    component: User,
  },
  {
    path: "/movie",
    layout: AdminLayout,
    component: Film,
  },
  {
    path: "/area",
    layout: AdminLayout,
    component: Area,
  },
  {
    path: "/animation",
    layout: AdminLayout,
    component: Animation,
  },
  {
    path: "/theater",
    layout: AdminLayout,
    component: Theater,
  },
  {
    path: "/login",
    layout: DefaultLayout,
    component: Login,
  },
  {
    path: "/addfilm",
    layout: AdminLayout,
    component: AddFilm,
  },
  {
    path: "/editfilm",
    layout: AdminLayout,
    component: EditFilm,
  },
  {
    path: "/edituser",
    layout: AdminLayout,
    component: EditUser,
  },
  {
    path: "/category",
    layout: AdminLayout,
    component: Category,
  },
  {
    path: "/detailsfilm",
    layout: AdminLayout,
    component: DetailsFilm,
  },
  {
    path: "/room",
    layout: AdminLayout,
    component: Room,
  },
  {
    path: "/infouser",
    layout: DefaultLayout,
    component: InfoUser,
  },
];

const privateRoutes = (() => {
  return [{}];
})();

export { publicRoutes, privateRoutes, PrivateRoutes };
