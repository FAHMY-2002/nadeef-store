// Sample reviews so the store doesn't look empty while you're setting it up.
// They are shown with a "Sample review" label so visitors aren't misled.
// When you have real customer reviews, add them below with `sample: false`
// (or load them from your database) and set SHOW_SAMPLE_REVIEWS to false.
export const SHOW_SAMPLE_REVIEWS = true;

// [name, area, rating 1-5, date (YYYY-MM-DD), review text]
const SAMPLE = {
  'all-purpose-lemon': [
    ['Mariam Hassan', 'New Cairo', 5, '2026-10-12', 'Works on everything in my kitchen and the lemon smell is fresh, not chemical. I bought a second bottle for the bathroom.'],
    ['أحمد سمير', 'مدينة نصر', 5, '2026-09-28', 'ممتاز جدًا على الرخام والسيراميك ومبيسيبش أثر. الريحة حلوة ومش خانقة.'],
    ['Nour El-Din', 'Maadi', 4, '2026-09-03', 'Cleans well and dries without streaks. I wish the bottle were a bit bigger.'],
  ],
  'glass-ocean-mist': [
    ['Salma Adel', 'Heliopolis', 5, '2026-10-05', 'My balcony glass is finally clear without streaks. One spray and a microfiber cloth is enough.'],
    ['Karim Mostafa', '6th of October', 4, '2026-09-17', 'Good on mirrors and the TV screen. The smell is light, which I like.'],
    ['هبة فاروق', 'الدقي', 5, '2026-08-30', 'أحسن من أي منظف زجاج جربته قبل كده، ومن غير ريحة النشادر.'],
  ],
  'degreaser-lime-mint': [
    ['Mariam H.', 'New Cairo', 5, '2026-10-18', 'Took the grease off my range hood in one wipe. No headache from the smell either.'],
    ['Omar Khaled', 'Sheikh Zayed', 5, '2026-10-02', 'I left it on the oven door for two minutes and the baked-on stains came off easily.'],
    ['منى إبراهيم', 'المهندسين', 4, '2026-09-11', 'شغال كويس جدًا على البوتاجاز، بس محتاج تسيبه شوية قبل ما تمسح.'],
    ['Youssef Nabil', 'Alexandria', 4, '2026-08-25', 'Strong on grease but gentle on my hands. Would buy again at the sale price.'],
  ],
  'dish-soap-green-tea': [
    ['Rana Tarek', 'Zamalek', 5, '2026-10-20', 'A little goes a long way and my hands don’t get dry anymore. The green tea scent is lovely.'],
    ['محمد عادل', 'شبرا', 5, '2026-10-01', 'رغوته كتير وبيشيل الدهون كويس. بقيت أشتري الريفيل على طول.'],
    ['Dina Samir', 'Nasr City', 4, '2026-09-14', 'Cleans well. I’d like a bigger bottle, but the refill pouch solves that.'],
  ],
  'bathroom-eucalyptus': [
    ['Hany Fouad', 'Maadi', 5, '2026-10-09', 'The foam sticks to the tiles and the limescale on the shower glass is gone. The eucalyptus smell is great.'],
    ['ياسمين علي', 'التجمع الخامس', 4, '2026-09-22', 'كويس جدًا على الحنفيات والبانيو، بس الجير القديم محتاج مرتين.'],
    ['Laila Hamdy', 'Giza', 4, '2026-09-02', 'Does the job without bleach. I use the bamboo brush for tough spots.'],
  ],
  'laundry-fresh-linen': [
    ['Sara Mahmoud', 'Heliopolis', 5, '2026-10-15', 'My kids’ clothes come out clean even on the cold cycle. One bottle lasts us almost two months.'],
    ['أحمد حسني', '6 أكتوبر', 5, '2026-09-30', 'الريحة نضيفة ومش تقيلة، والهدوم البيضا فضلت بيضا.'],
    ['Mai Ashraf', 'Smouha, Alexandria', 4, '2026-09-08', 'Good value at the sale price. Gentle on my baby’s clothes, no rashes.'],
  ],
  'softener-lavender': [
    ['Nada Wael', 'Dokki', 5, '2026-10-11', 'Towels are soft and the lavender smell stays in the wardrobe for days.'],
    ['Tamer Saeed', 'Nasr City', 4, '2026-09-19', 'Nice scent, not too strong. I use a bit less than the label says.'],
    ['ريهام مجدي', 'المعادي', 5, '2026-08-28', 'الفوط بقت ناعمة جدًا والريحة بتفضل أيام.'],
  ],
  'floor-pine-cedar': [
    ['Ahmed K.', 'Sheikh Zayed', 5, '2026-10-14', 'We switched after our son started crawling. Floors are clean and I don’t worry when he plays on them.'],
    ['Ingy Sherif', 'New Cairo', 5, '2026-09-26', 'No sticky film on the porcelain and the pine smell is fresh. One bottle lasts ages.'],
    ['خالد رمضان', 'حلوان', 4, '2026-09-05', 'كويس جدًا والأرض مبتلزقش، بس كنت أحب ريحة أقوى شوية.'],
  ],
  'scrub-pink-clay': [
    ['Farida Osama', 'Zamalek', 5, '2026-10-07', 'Polished my old steel sink back to shiny without scratches. Smells like grapefruit.'],
    ['Mostafa Gamal', 'Heliopolis', 4, '2026-09-16', 'Great on burnt pots. It takes some elbow grease, but it works.'],
    ['نهى عصام', 'مدينة نصر', 4, '2026-08-31', 'حلو على البوتاجاز والحلل، والعلبة بتقعد كتير.'],
  ],
  'dish-refill-green-tea': [
    ['Salma N.', 'Alexandria', 5, '2026-10-19', 'I keep the same bottles and order refills every month. Cheaper than the supermarket brands.'],
    ['Amr Fathy', 'Maadi', 5, '2026-10-03', 'Fills three bottles and it’s easy to pour with the spout. Less plastic in the bin.'],
    ['شيماء حسن', 'الهرم', 4, '2026-09-12', 'فكرة الريفيل ممتازة وبتوفر، بس الكيس محتاج يتمسك كويس وانت بتصب.'],
  ],
  'bamboo-brush': [
    ['Hossam Adly', 'Giza', 4, '2026-10-06', 'Solid brush with a nice grip. The bristles are stiff enough for pots but don’t scratch.'],
    ['Aya Lotfy', 'New Cairo', 5, '2026-09-21', 'Dries quickly and still looks new after a month of daily use.'],
  ],
  'microfiber-cloths': [
    ['Rania Fawzy', 'Heliopolis', 5, '2026-10-16', 'Thick and soft. I use the colours for different rooms like they suggest.'],
    ['مصطفى يحيى', 'المهندسين', 5, '2026-09-27', 'بيلمّع الزجاج والشاشات من غير وبر. غسلتهم كذا مرة وفضلوا زي ما هم.'],
    ['Lina Magdy', 'Nasr City', 4, '2026-09-04', 'Great quality. I’d love a pack of ten.'],
  ],
  'home-cleaning-regular': [
    ['Noha Ragab', 'Zamalek', 5, '2026-10-22', 'Our cleaner comes every week now. The apartment is spotless and she brings all the products.'],
    ['هالة مرسي', 'مصر الجديدة', 5, '2026-10-09', 'البنت كانت محترمة وشاطرة جدًا، ونضّفت المطبخ والحمامات بشكل ممتاز.'],
    ['Adham Sorour', '6th of October', 4, '2026-09-25', 'Good job overall. Four hours was just enough for our three-bedroom flat.'],
    ['Mai El-Sayed', 'Nasr City', 5, '2026-09-11', 'Same cleaner every time, which makes a big difference.'],
  ],
  'deep-cleaning': [
    ['Engy Farouk', 'New Cairo', 5, '2026-10-14', 'Three people for seven hours. Cabinets, tiles, windows, everything shines.'],
    ['Ashraf Helmy', 'Maadi', 5, '2026-09-28', 'We booked before the holidays and the flat looked brand new.'],
    ['ريم سعيد', 'الشيخ زايد', 4, '2026-09-06', 'الشغل ممتاز، بس اتأخروا ساعة عن الميعاد.'],
  ],
  'sofa-carpet-cleaning': [
    ['Osama Bakr', 'Heliopolis', 5, '2026-10-03', 'Old coffee stains on the sofa are gone and it was dry by the evening.'],
    ['Nadine Akram', 'Sheikh Zayed', 4, '2026-09-17', 'The carpet looks much brighter. One old stain faded but didn’t disappear, as they warned.'],
    ['محمود حسن', 'الدقي', 5, '2026-08-31', 'الكنب رجع زي الجديد والريحة حلوة.'],
  ],
  'move-in-cleaning': [
    ['Dalia Shawky', 'New Cairo', 5, '2026-10-07', 'We moved into a dusty new apartment and they made it ready to live in the same day.'],
    ['Ehab Naguib', 'Alexandria', 4, '2026-09-19', 'Thorough work inside all the cupboards. Booking a day ahead is a must.'],
  ],
  'plumber-visit': [
    ['Walid Ezzat', 'Maadi', 5, '2026-10-21', 'The plumber called before arriving, found the leak under the sink in ten minutes and fixed it. Fair price for the parts.'],
    ['منة الله سامي', 'مدينة نصر', 5, '2026-10-08', 'جه في الميعاد بالظبط وصلّح الحنفية والسيفون. محترم ونضيف في الشغل.'],
    ['Tarek Bassem', '6th of October', 4, '2026-09-24', 'Good work and clear pricing. He was 20 minutes late but called to let me know.'],
    ['Heba Nasser', 'Heliopolis', 5, '2026-09-09', 'Fixed low water pressure in the bathroom that two other plumbers couldn’t.'],
  ],
  'drain-unclogging': [
    ['Sherif Anwar', 'Nasr City', 5, '2026-10-13', 'The kitchen sink was completely blocked. He cleared it with a machine in 30 minutes, no chemicals.'],
    ['أميرة جلال', 'الشيخ زايد', 4, '2026-09-25', 'الصرف بقى ينزل كويس جدًا، بس اتأخر شوية عن الميعاد.'],
    ['Hazem Ali', 'Giza', 5, '2026-09-06', 'The bathroom floor drain works properly for the first time in years.'],
  ],
  'toilet-repair': [
    ['Ali Hegazy', 'Maadi', 5, '2026-10-17', 'The toilet had been running for weeks. He replaced the flush valve in 20 minutes.'],
    ['Nermeen Kamal', 'Dokki', 4, '2026-09-29', 'Fixed the leak and the price of the part was reasonable.'],
    ['إسلام فتحي', 'عين شمس', 5, '2026-09-07', 'السيفون كان بيهرّب مية، واتصلح من أول زيارة.'],
  ],
  'water-heater-installation': [
    ['Ramy Saad', 'New Cairo', 5, '2026-10-10', 'Installed our new electric heater neatly, tested for leaks and explained the settings.'],
    ['سارة عبد الله', 'فيصل', 4, '2026-09-18', 'التركيب كان نضيف وسريع، بس اضطريت أشتري محبس زيادة.'],
  ],
  'kitchen-mixer-tap': [
    ['Ghada Ramzy', 'Sheikh Zayed', 5, '2026-10-04', 'Feels solid and the pull-down spray is so useful. I booked the plumber visit to install it too.'],
    ['Mahmoud Reda', 'Alexandria', 4, '2026-09-15', 'Good quality for the price. The hoses were a bit short for my sink.'],
  ],
  'drain-cleaner-gel': [
    ['Yara Hesham', 'Heliopolis', 4, '2026-10-12', 'Cleared a slow shower drain overnight. I now use it once a month.'],
    ['عمرو الشريف', 'المعادي', 5, '2026-09-20', 'فك الانسداد البسيط في الحوض من غير ما أجيب سباك.'],
    ['Passant Medhat', 'New Cairo', 3, '2026-08-29', 'Helped with a slow drain, but a full blockage still needed the unclogging service.'],
  ],
  'ac-maintenance': [
    ['Mohamed Zaki', 'Nasr City', 5, '2026-10-01', 'Cleaned both units properly and covered the furniture. The AC cools much faster now.'],
    ['دعاء صلاح', '6 أكتوبر', 5, '2026-09-13', 'الفني كان شاطر جدًا ونضّف الوحدة الداخلية والخارجية، والتكييف بقى ساقع زي الأول.'],
    ['Khaled Fekry', 'Maadi', 4, '2026-08-26', 'Good service. They also checked the gas pressure and told me it was fine.'],
    ['Reem Soliman', 'Smouha, Alexandria', 5, '2026-08-19', 'Booked for three units. The team was quick and clean.'],
  ],
  'ac-gas-refill': [
    ['Ayman Fahmy', 'Heliopolis', 5, '2026-09-23', 'They found a small leak first, fixed it, then refilled. Cooling is perfect again.'],
    ['نورهان طارق', 'التجمع', 4, '2026-09-01', 'السعر معقول والتكييف رجع يسقّع، بس الزيارة خدت وقت أطول من المتوقع.'],
  ],
  'ac-repair-visit': [
    ['Shady Ibrahim', 'Dokki', 5, '2026-09-10', 'The AC was leaking water inside. The technician cleared the drain line and it stopped.'],
    ['Marwa Hosny', 'New Cairo', 4, '2026-08-27', 'Clear diagnosis and quote. Replacing the capacitor fixed the cooling.'],
  ],
  'ac-installation': [
    ['Bassem Lotfy', 'Sheikh Zayed', 5, '2026-08-22', 'Two units installed in one afternoon. Neat piping and they cleaned up the dust.'],
    ['Hadeer Mamdouh', 'Nasr City', 4, '2026-08-14', 'Professional installation. Extra copper pipe added to the cost, but they told me before starting.'],
    ['وليد منصور', 'الهرم', 5, '2026-07-30', 'تركيب ممتاز وجربوه قدامي قبل ما يمشوا.'],
  ],
  'ac-coil-cleaner': [
    ['Sameh Wagdy', 'Giza', 4, '2026-09-30', 'Easy to use between services. The AC smells fresher.'],
    ['فاطمة الزهراء', 'المعادي', 4, '2026-09-02', 'كويس للتنضيف الخفيف بين الصيانات.'],
  ],
};

export const sampleReviews = Object.fromEntries(
  Object.entries(SAMPLE).map(([productId, rows]) => [
    productId,
    rows.map(([name, area, rating, date, text], index) => ({
      id: `${productId}-sample-${index}`,
      name,
      area,
      rating,
      date,
      text,
      sample: true,
    })),
  ])
);
