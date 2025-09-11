import {FaPhoneAlt, FaEnvelope,} from "react-icons/fa";
import {WHY_US} from "@/constant"

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 pt-6 md:pt-10">
            <div className="container">
                <div className="grid grid-cols-4 gap-3 md:gap-6 pb-10 border-b border-gray-600">
                    {WHY_US.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center px-1"
                        >
                            <item.icon className="text-primary text-2xl md:text-5xl mb-1 md:mb-2"/>
                            <h3 className="font-semibold text-xs md:text-base">{item.title}</h3>
                            <p className="text-[10px] md:text-sm text-gray-400">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
                <div
                    className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-600"
                >
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">فروشگاه کریمی</h3>
                        <p className="text-sm text-gray-400 leading-6">
                            فروشگاه کریمی بهترین و متنوع‌ترین اسباب‌بازی‌ها را با کیفیت بالا و قیمت مناسب برای شما فراهم
                            کرده است.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">پشتیبانی</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <FaPhoneAlt className="text-primary"/> <span>۰۹۱۲۳۴۵۶۷۸۹</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaEnvelope className="text-primary"/> <span>support@karimitoys.ir</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">دسترسی سریع</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/about" className="hover:text-primary">درباره ما</a></li>
                            <li><a href="/contact" className="hover:text-primary">تماس با ما</a></li>
                            <li><a href="/categories" className="hover:text-primary">دسته‌بندی‌ها</a></li>
                            <li><a href="/faq" className="hover:text-primary">سوالات متداول</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-gray-900 py-4">
                <p className="text-center text-primary text-sm">
                    تهیه شده با ❤️ توسط
                    <a href="https://amir-htm.ir"> امیررضا حاتمی</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
