# Nadeef Store — React e-commerce starter

متجر بسيط لمنتجات التنظيف مبني بـ React + Vite. الهوم مستوحاة من قالبي ShineEase و Fomic، وباقي الصفحات (المنتجات، صفحة المنتج، السلة، الدفع) مكملة على نفس الستايل.

## التشغيل

```bash
npm install
npm run dev      # يفتح على http://localhost:5173
npm run build    # نسخة الإنتاج في فولدر dist
npm run preview  # تجربة نسخة الإنتاج محليًا
```

محتاج Node 20 أو أحدث.

## الصفحات

| المسار | الصفحة |
| --- | --- |
| `/` | الهوم |
| `/shop` | كل المنتجات + فلترة بالقسم والسعر والعروض + بحث وترتيب (`?cat=kitchen`، `?q=soap`، `?sort=price-asc`) |
| `/product/:id` | صفحة المنتج |
| `/cart` | السلة + كود الخصم |
| `/checkout` | بيانات التوصيل والدفع عند الاستلام |
| `/order-success` | تأكيد الطلب |

## هيكل المشروع

```
src/
  data/products.js        ← المنتجات والأقسام (عدّل هنا)
  context/CartContext.jsx ← حالة السلة (محفوظة في localStorage)
  utils/format.js         ← العملة، حد التوصيل المجاني، كود الخصم
  components/             ← Navbar، Footer، CartDrawer، ProductCard، ProductArt...
  sections/               ← سكشنز الهوم (Hero، Bento، Categories، FAQ...)
  pages/                  ← الصفحات
  styles/                 ← base.css (الألوان والخطوط) + components/home/pages
```

## تعديلات شائعة

- **الألوان والخطوط:** أول جزء في `src/styles/base.css` (متغيرات `--forest` و `--lime` ...).
- **المنتجات والخدمات:** `src/data/products.js`. كل عنصر نوعه `type: 'product'` (بيتوصّل) أو `type: 'service'` (زيارة بتتحجز بيوم وميعاد في صفحة الدفع، ومن غير مصاريف توصيل).
- **الصور:** خانة `image` فيها رقم صورة من Unsplash (رخصة مجانية للاستخدام التجاري) أو أي لينك صورة كامل. لو الصورة مفتحتش بيظهر الرسم البديل من `ProductArt.jsx`.
- **التقييمات:** `src/data/reviews.js`. التقييمات التجريبية بتظهر عليها علامة "Sample review". لما يبقى عندك تقييمات حقيقية خلّي `SHOW_SAMPLE_REVIEWS = false`. تقييم كل منتج بيتحسب أوتوماتيك من التعليقات. التعليقات اللي الزباين بيكتبوها بتتحفظ في متصفحهم بس لحد ما تربط الموقع بقاعدة بيانات (في `src/context/ReviewsContext.jsx`).
- **التوصيل المجاني وكود الخصم:** `src/utils/format.js` (الكود التجريبي `NADEEF15` = خصم 15%).
- **بيانات التواصل والتقييمات:** placeholders في `TopBar.jsx` و `Footer.jsx` و `Faq.jsx` و `Testimonials.jsx`. استبدلها ببياناتك الحقيقية.

## قبل النشر

- الطلبات حاليًا بتتعمل في المتصفح بس. اربط `handleSubmit` في `src/pages/Checkout.jsx` بالـ backend أو بخدمة زي Shopify / Supabase / Firebase.
- المشروع بيستخدم `BrowserRouter`، فالروابط زي `/shop` محتاجة السيرفر يرجّع `index.html`. ده متظبط جاهز لـ Netlify (`public/_redirects`) و Vercel (`vercel.json`).
