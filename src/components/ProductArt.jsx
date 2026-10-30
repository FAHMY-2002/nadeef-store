// Drawn product packshots. Each product picks a `shape` and a colour set,
// so the store looks finished before you have real product photos.
// To use photos instead, render <img src={product.image} alt={product.name} /> where <ProductArt> is used.

const INK = '#184F46';
const DISPLAY_FONT = "'Bricolage Grotesque', Figtree, sans-serif";
const BODY_FONT = 'Figtree, system-ui, sans-serif';

function Label({ x, y, w, h, fill, text, size }) {
  const cx = x + w / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} />
      <text x={cx} y={y + 18} textAnchor="middle" fontFamily={DISPLAY_FONT} fontWeight="700" fontSize="12" fill={INK}>
        nadeef
      </text>
      <rect x={cx - 9} y={y + 24} width={18} height={2} rx={1} fill={INK} opacity=".3" />
      <text
        x={cx}
        y={y + h / 2 + 12}
        textAnchor="middle"
        fontFamily={BODY_FONT}
        fontWeight="800"
        fontSize={text.length > 5 ? 10 : 12}
        letterSpacing={text.length > 5 ? 0.6 : 1.2}
        fill={INK}
      >
        {text}
      </text>
      <text x={cx} y={y + h - 9} textAnchor="middle" fontFamily={BODY_FONT} fontWeight="600" fontSize="8.5" fill={INK} opacity=".65">
        {size}
      </text>
    </g>
  );
}

const Shine = ({ x, y, h }) => <rect x={x} y={y} width="8" height={h} rx="4" fill="#fff" opacity=".3" />;
const Shadow = ({ rx = 58 }) => <ellipse cx="100" cy="233" rx={rx} ry="5" fill="#0F3A33" opacity=".12" />;

function Spray({ c, label, size }) {
  return (
    <>
      <Shadow rx={46} />
      <path d="M78 46h46a12 12 0 0 1 12 12v22H66V58a12 12 0 0 1 12-12z" fill={c.cap} />
      <rect x="40" y="52" width="30" height="14" rx="4" fill={c.cap} />
      <rect x="34" y="54" width="9" height="10" rx="3" fill={c.capDark} />
      <path d="M74 80c-10 3-15 13-16 30l10 2c2-12 5-20 12-25z" fill={c.capDark} />
      <rect x="82" y="78" width="38" height="20" rx="4" fill={c.capDark} />
      <rect x="58" y="96" width="86" height="134" rx="22" fill={c.body} />
      <Shine x={67} y={106} h={110} />
      <Label x={70} y={136} w={62} h={66} fill={c.label} text={label} size={size} />
    </>
  );
}

function Bottle({ c, label, size }) {
  return (
    <>
      <Shadow rx={46} />
      <rect x="92" y="22" width="16" height="14" rx="4" fill={c.capDark} />
      <rect x="82" y="34" width="36" height="30" rx="7" fill={c.cap} />
      <path d="M80 62h40l20 34v120a14 14 0 0 1-14 14H74a14 14 0 0 1-14-14V96z" fill={c.body} />
      <Shine x={68} y={104} h={108} />
      <Label x={70} y={128} w={60} h={70} fill={c.label} text={label} size={size} />
    </>
  );
}

function Jug({ c, label, size }) {
  return (
    <>
      <Shadow rx={64} />
      <rect x="54" y="62" width="40" height="28" rx="6" fill={c.cap} />
      <path d="M60 70h28M60 78h28" stroke={c.capDark} strokeWidth="2" opacity=".5" />
      <path
        fillRule="evenodd"
        fill={c.body}
        d="M56 86h88a18 18 0 0 1 18 18v108a18 18 0 0 1-18 18H56a18 18 0 0 1-18-18V104a18 18 0 0 1 18-18zM122 100h20a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6h-20a6 6 0 0 1-6-6v-18a6 6 0 0 1 6-6z"
      />
      <Shine x={47} y={104} h={106} />
      <Label x={60} y={144} w={80} h={68} fill={c.label} text={label} size={size} />
    </>
  );
}

function Jar({ c, label, size }) {
  return (
    <>
      <Shadow rx={56} />
      <rect x="44" y="102" width="112" height="30" rx="10" fill={c.cap} />
      <path d="M58 108v18M72 108v18M86 108v18M100 108v18M114 108v18M128 108v18M142 108v18" stroke={c.capDark} strokeWidth="2" opacity=".6" />
      <rect x="50" y="128" width="100" height="102" rx="20" fill={c.body} />
      <Shine x={58} y={136} h={86} />
      <Label x={70} y={148} w={60} h={64} fill={c.label} text={label} size={size} />
    </>
  );
}

function Pouch({ c, label, size }) {
  return (
    <>
      <Shadow rx={50} />
      <rect x="112" y="40" width="22" height="26" rx="5" fill={c.cap} />
      <rect x="109" y="60" width="28" height="8" rx="3" fill={c.capDark} />
      <path d="M60 64h80a4 4 0 0 1 4 4l6 148a14 14 0 0 1-14 14H64a14 14 0 0 1-14-14l6-148a4 4 0 0 1 4-4z" fill={c.body} />
      <rect x="57" y="66" width="86" height="9" rx="2" fill="#0F3A33" opacity=".08" />
      <Shine x={62} y={88} h={120} />
      <Label x={68} y={118} w={64} h={76} fill={c.label} text={label} size={size} />
    </>
  );
}

function Brush({ c }) {
  const bristles = Array.from({ length: 14 }, (_, i) => 50 + i * 7.6);
  return (
    <>
      <Shadow rx={66} />
      <path d="M68 118c0-40 14-62 32-62s32 22 32 62h-14c0-30-8-46-18-46s-18 16-18 46z" fill={c.cap} />
      <rect x="36" y="112" width="128" height="40" rx="20" fill={c.body} />
      <path d="M52 124c20-4 60-4 96 0M56 138c22 3 62 3 90 0" stroke={c.capDark} strokeWidth="1.6" fill="none" opacity=".35" />
      <text x="100" y="135" textAnchor="middle" fontFamily={DISPLAY_FONT} fontWeight="700" fontSize="13" fill={c.capDark}>
        nadeef
      </text>
      <rect x="44" y="150" width="112" height="44" rx="8" fill={c.label} />
      {bristles.map((x) => (
        <path key={x} d={`M${x} 156v34`} stroke={c.capDark} strokeWidth="1.4" opacity=".28" />
      ))}
    </>
  );
}

function Cloth({ c }) {
  const layers = [
    { y: 186, x: 32, fill: c.cap },
    { y: 156, x: 26, fill: c.body },
    { y: 126, x: 34, fill: c.label },
    { y: 96, x: 30, fill: '#F2B5AA' },
  ];
  return (
    <>
      <Shadow rx={74} />
      {layers.map((layer) => (
        <g key={layer.y}>
          <rect x={layer.x} y={layer.y} width="140" height="36" rx="12" fill={layer.fill} />
          <path d={`M${layer.x + 10} ${layer.y + 26}h120`} stroke="#0F3A33" strokeWidth="1.5" opacity=".12" />
        </g>
      ))}
      <rect x="84" y="90" width="34" height="138" rx="4" fill="#fff" />
      <text x="101" y="164" textAnchor="middle" fontFamily={DISPLAY_FONT} fontWeight="800" fontSize="15" fill={INK}>
        ×5
      </text>
    </>
  );
}

const SHAPES = { spray: Spray, bottle: Bottle, jug: Jug, jar: Jar, pouch: Pouch, brush: Brush, cloth: Cloth };

export default function ProductArt({ product, className, decorative = false }) {
  const Shape = SHAPES[product.shape] ?? Bottle;
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : `${product.name}, ${product.scent}`}
      aria-hidden={decorative ? 'true' : undefined}
    >
      <Shape c={product.colors} label={product.label} size={product.size} />
    </svg>
  );
}
