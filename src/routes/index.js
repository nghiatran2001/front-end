import {
  AddProduct,
  Cart,
  Categories,
  Follow,
  Home,
  InfoUser,
  Login,
  Order,
  OrderAdmin,
  Payment,
  Product,
  ProductDetail,
  Register,
  User,
  EditProduct,
  Filter,
  EditUser,
  AddTech,
  AddCategory,
  TechDetail,
  Search,
  Brand,
  AddBrand,
  UpdateOrderAdmin,
  UpdateBrand,
  UpdateCategory,
  SearchProduct,
} from "../pages";
import { DefaultLayout, AdminLayout } from "../layouts";
import Admin from "../pages/Admin/Admin";

const PrivateRoutes = ({ children }) => {
  if (true) {
    return children;
  } else {
  }
};

const publicRoutes = [
  {
    path: "/",
    layout: DefaultLayout,
    element: Home,
  },
  {
    path: "/login",
    layout: DefaultLayout,
    element: Login,
  },
  {
    path: "/register",
    element: Register,
    layout: DefaultLayout,
  },
  {
    path: "/productdetail",
    element: ProductDetail,
    layout: DefaultLayout,
  },
  {
    path: "/cart",
    element: Cart,
    layout: DefaultLayout,
  },
  {
    path: "/order",
    element: Order,
    layout: DefaultLayout,
  },
  {
    path: "/infouser",
    element: InfoUser,
    layout: DefaultLayout,
  },
  {
    path: "/payment",
    element: Payment,
    layout: DefaultLayout,
  },
  {
    path: "/follow",
    element: Follow,
    layout: DefaultLayout,
  },
  {
    path: "/admin",
    element: Admin,
    AdminLayout,
  },
  {
    path: "/user",
    element: User,
    AdminLayout,
  },
  {
    path: "/product",
    element: Product,
    AdminLayout,
  },
  {
    path: "/categories",
    element: Categories,
    AdminLayout,
  },
  {
    path: "/orderadmin",
    element: OrderAdmin,
    AdminLayout,
  },
  {
    path: "/addproduct",
    element: AddProduct,
    AdminLayout,
  },
  {
    path: "/editproduct",
    element: EditProduct,
    AdminLayout,
  },
  {
    path: "/filter",
    element: Filter,
    AdminLayout,
  },
  {
    path: "/edituser",
    element: EditUser,
    AdminLayout,
  },
  {
    path: "/addtech",
    element: AddTech,
    AdminLayout,
  },
  {
    path: "/addcategory",
    element: AddCategory,
    AdminLayout,
  },
  {
    path: "/techdetail",
    element: TechDetail,
    AdminLayout,
  },
  {
    path: "/search",
    element: Search,
    DefaultLayout,
  },
  {
    path: "/brand",
    element: Brand,
    AdminLayout,
  },
  {
    path: "/addbrand",
    element: AddBrand,
    AdminLayout,
  },
  {
    path: "/updateorderadmin",
    element: UpdateOrderAdmin,
    AdminLayout,
  },
  {
    path: "/updatebrand",
    element: UpdateBrand,
    AdminLayout,
  },
  {
    path: "/updatecategory",
    element: UpdateCategory,
    AdminLayout,
  },
  {
    path: "/searchproduct",
    element: SearchProduct,
    AdminLayout,
  },
];

const privateRoutes = (() => {
  return [{}];
})();

export { publicRoutes, privateRoutes, PrivateRoutes };
