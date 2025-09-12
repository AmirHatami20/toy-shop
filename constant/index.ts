import {HiOutlineUser} from "react-icons/hi2";
import {LiaShoppingBasketSolid} from "react-icons/lia";
import {IoHomeOutline} from "react-icons/io5";
import {AiOutlineProduct} from "react-icons/ai";
import {TbCategory} from "react-icons/tb";
import {LuUsers} from "react-icons/lu";
import {FaClipboardList, FaGift, FaLock, FaMoneyCheckAlt, FaTruck, FaUndo} from "react-icons/fa";

export const HEADER_NAV = [
    {icon: IoHomeOutline, title: "صفحه اصلی", href: "/"},
    {icon: AiOutlineProduct, title: "همه محصولات", href: "/products"},
];

export const HEADER_USER_MENU = [
    {icon: HiOutlineUser, title: "پروفایل", href: "/profile"},
    {icon: LiaShoppingBasketSolid, title: "سبد خرید", href: "/cart"},
];

export const ADMIN_SIDEBAR = [
    {
        Icon: IoHomeOutline,
        route: "/admin",
        text: "صفحه اصلی",
    },
    {
        Icon: AiOutlineProduct,
        route: "/admin/product",
        text: "محصولات",
    },
    {
        Icon: TbCategory,
        route: "/admin/category",
        text: "دسته بندی ها",
    },
    {
        Icon: LuUsers,
        route: "/admin/user",
        text: "کاربران",
    },
    {
        Icon: FaClipboardList,
        route: "/admin/order",
        text: "سفارشات",
    },
    {
        Icon: FaMoneyCheckAlt,
        route: "/admin/payment",
        text: "پرداخت ها",
    },
];


export const CATEGORIES_DATA = [
    {
        id: "68b83fcd447d776d49376c47",
        title: "اکشن فیگور",
        subtitle: "خرید اکشن فیگور ها",
        color1: "#dc2626", // red-600
        color2: "#f66161", // red-400
        image: "/categories/actionFigure.png",
    },
    {
        id: "68bad2e0d98cdd8b00185823",
        title: "لگو",
        subtitle: "خرید انواع لگو",
        color1: "#eab308", // yellow-500
        color2: "#fde047", // yellow-300
        image: "/categories/lego.png",
    },
    {
        id: "68c1549e5b0de51342941b92",
        title: "تفنگ ها",
        subtitle: "خرید تفنگ اسباب بازی",
        color1: "#22c55e", // green-500
        color2: "#81f8ac", // green-300
        image: "/categories/gun.png",
    },
    {
        id: "68bad2d3d98cdd8b00185820",
        title: "جا سوییچی",
        subtitle: "خرید انواع جا سوییچی",
        color1: "#38bdf8", // sky-400
        color2: "#a1daf8", // sky-200
        image: "/categories/keyChain.png",
    },
];

export const WHY_US = [
    {
        icon: FaTruck,
        title: "ارسال سریع",
        desc: "تحویل فوری به سراسر کشور",
    },
    {
        icon: FaUndo,
        title: "ضمانت بازگشت",
        desc: "۷ روز ضمانت بازگشت کالا",
    },
    {
        icon: FaLock,
        title: "پرداخت امن",
        desc: "با تمامی کارت‌های عضو شتاب",
    },
    {
        icon: FaGift,
        title: "تنوع محصولات",
        desc: "صدها اسباب‌بازی برای همه سنین",
    },
];

export const SORT_BY = [
    {name: "همه محصولات", slug: "newest"},
    {name: "ارزان‌ترین", slug: "price_asc"},
    {name: "گران‌ترین", slug: "price_desc"},
    {name: "بیشترین تخفیف", slug: "discount_desc"},
    {name: "پرفروش ترین", slug: "bestseller"},
];
