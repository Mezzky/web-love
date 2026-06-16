import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarHeart,
  ChevronLeft,
  ChevronRight,
  Heart,
  Pause,
  Play,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import heroImage from "./assets/images/romantic-hero.png";
import { memories, reasons, timeline } from "./data/memories.js";
import { quotes } from "./data/quotes.js";

const startDate = new Date("2024-01-14T20:00:00+08:00");
const musicUrl = "https://9qw845bekg.ufs.sh/f/8rOnxF43ANYqHtdFaZChrVl48acYXH1jLFJ05EfAPxnKhwiZ";

function useRelationshipCounter() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => {
    const diff = Math.max(0, now.getTime() - startDate.getTime());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [now]);
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 760px)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, index) => (
        <span
          key={index}
          style={{
            "--delay": `${index * 0.9}s`,
            "--left": `${(index * 23) % 94}%`,
            "--size": `${12 + (index % 4) * 4}px`,
          }}
        >
          &hearts;
        </span>
      ))}
    </div>
  );
}

function LetterGate({ onOpen }) {
  const [opening, setOpening] = useState(false);

  const openLetter = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 720);
  };

  return (
    <motion.section
      className="letter-gate"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
    >
      <div className="flower-field" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={index}
            style={{
              "--x": `${(index * 29) % 100}%`,
              "--y": `${(index * 41) % 100}%`,
              "--s": `${0.62 + (index % 4) * 0.14}`,
              "--r": `${(index % 7) * 16 - 42}deg`,
            }}
          />
        ))}
      </div>
      <motion.div
        className="gate-copy"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="eyebrow">Ucaa untuk Cacakk</span>
        <h1>Ada surat kecil buat kamu</h1>
        <p>Pelan-pelan aja. Klik surat ini kalau Cacakk sudah siap membukanya.</p>
      </motion.div>
      <motion.button
        className={`floating-letter ${opening ? "is-opening" : ""}`}
        onClick={openLetter}
        aria-label="Buka surat dari Ucaa"
        initial={{ opacity: 0, scale: 0.82, x: "-50%", y: 28 }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: [0, -14, 0] }}
        transition={{
          opacity: { duration: 0.45, delay: 0.2 },
          scale: { duration: 0.45, delay: 0.2 },
          y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.04, rotate: -1.5 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="letter-flap" />
        <span className="letter-body">
          <span className="letter-seal" />
        </span>
      </motion.button>
      <AnimatePresence>
        {opening && (
          <motion.div
            className="gate-transition"
            initial={{ clipPath: "circle(0% at 50% 54%)", opacity: 0.96 }}
            animate={{ clipPath: "circle(145% at 50% 54%)", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function Opening({ onStart }) {
  return (
    <section className="opening">
      <img src={heroImage} alt="" className="opening-image" />
      <div className="opening-overlay" />
      <FloatingHearts />
      <motion.div
        className="opening-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
      >
        <span className="eyebrow">Dari Ucaa</span>
        <h1>Hai Cacakk</h1>
        <p>Aku bikin ini khusus buat kamu. Bukan yang paling sempurna, tapi ini dari hati aku.</p>
        <button className="primary-button" onClick={onStart}>
          <Heart size={19} fill="currentColor" />
          Baca Pelan-Pelan
        </button>
      </motion.div>
    </section>
  );
}

function Section({ id, eyebrow, title, children, className = "" }) {
  const isMobile = useIsMobile();

  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      initial={isMobile ? false : { opacity: 0, y: 28 }}
      whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="section-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function Timeline() {
  return (
    <Section id="story" eyebrow="Cerita kecil kita" title="Kita">
      <div className="timeline">
        {timeline.map((item, index) => (
          <motion.article
            className="timeline-card"
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: index * 0.1 }}
          >
            <div className="timeline-date">{item.date}</div>
            <div className="memory-art">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Gallery() {
  const [active, setActive] = useState(null);
  const isMobile = useIsMobile();
  const showPrevious = () => setActive((active - 1 + memories.length) % memories.length);
  const showNext = () => setActive((active + 1) % memories.length);

  return (
    <Section id="memories" eyebrow="Yang Ucaa simpan" title="Kenangan">
      <div className="gallery-grid">
        {memories.map((memory, index) => (
          <motion.button
            className="memory-card"
            key={memory.title}
            onClick={() => setActive(index)}
            aria-label={`Lihat ${memory.title}`}
            initial={isMobile ? { opacity: 0, y: 24 } : false}
            whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.32 }}
            transition={{ duration: 0.58, delay: isMobile ? Math.min(index * 0.06, 0.24) : 0 }}
          >
            <div className="memory-visual" style={{ background: memory.background }}>
              <span>{memory.icon}</span>
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <button className="icon-button close" onClick={() => setActive(null)} aria-label="Tutup">
              <X size={22} />
            </button>
            <button className="icon-button lightbox-nav lightbox-nav-prev" onClick={showPrevious} aria-label="Foto sebelumnya">
              <ChevronLeft />
            </button>
            <motion.div
              className="lightbox-panel gallery-preview"
              key={active}
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.45 }}
            >
              <div className="memory-visual large" style={{ background: memories[active].background }}>
                <span>{memories[active].icon}</span>
              </div>
            </motion.div>
            <button className="icon-button lightbox-nav lightbox-nav-next" onClick={showNext} aria-label="Foto berikutnya">
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function Reasons() {
  const isMobile = useIsMobile();

  return (
    <Section id="reasons" eyebrow="Tentang Cacakk" title="Tentangmu">
      <div className="reason-grid">
        {reasons.map((reason, index) => (
          <motion.article
            className="reason-card"
            key={reason}
            initial={isMobile ? { opacity: 0, y: 24 } : false}
            whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.32 }}
            transition={{ duration: 0.58, delay: isMobile ? Math.min(index * 0.06, 0.24) : 0 }}
            whileHover={{ y: -4 }}
          >
            <Sparkles size={22} />
            <p>{reason}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Quotes() {
  const [index, setIndex] = useState(0);
  const quote = quotes[index];

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % quotes.length), 6200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <Section id="quotes" eyebrow="Catatan Ucaa" title="Isi Hati Uca">
      <div className="quote-panel">
        <button
          className="icon-button"
          onClick={() => setIndex((index - 1 + quotes.length) % quotes.length)}
          aria-label="Quote sebelumnya"
        >
          <ChevronLeft />
        </button>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={quote}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.55 }}
          >
            {quote}
          </motion.blockquote>
        </AnimatePresence>
        <button
          className="icon-button"
          onClick={() => setIndex((index + 1) % quotes.length)}
          aria-label="Quote berikutnya"
        >
          <ChevronRight />
        </button>
      </div>
    </Section>
  );
}

function Counter() {
  const time = useRelationshipCounter();
  const isMobile = useIsMobile();
  const items = [
    ["Hari", time.days],
    ["Jam", time.hours],
    ["Menit", time.minutes],
    ["Detik", time.seconds],
  ];

  return (
    <Section id="counter" eyebrow="Sejak kita mulai" title="Waktu">
      <div className="counter-grid">
        {items.map(([label, value], index) => (
          <motion.div
            className="counter-box"
            key={label}
            initial={isMobile ? { opacity: 0, y: 22 } : false}
            whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.36 }}
            transition={{ duration: 0.55, delay: isMobile ? Math.min(index * 0.05, 0.2) : 0 }}
          >
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{label}</span>
          </motion.div>
        ))}
      </div>
      <p className="counter-note">
        <CalendarHeart size={18} /> Sejak 14 Januari 2024, Ucaa masih belajar mencintai Cacakk dengan lebih baik.
      </p>
    </Section>
  );
}

function LoveLetter() {
  const isMobile = useIsMobile();
  const paragraphs = [
    "Aku mau bilang sesuatu,walaupun kita LDR, tapi rasanya ngga pernah hambar walaupunn kadang aku yang ngebuat dirimu merasa jengkel akan tingkah peduli cacakk tapii ituu semua cacak tulus dan sayang banget tauu ke melmel. Justru seru, karena kita sama-sama berjuang buat hubungan ini. Dan dari semua yang aku lihat, aku bisa bilang… kamu adalah perempuan terkuat dan terkeren yang pernah aku kenal.",
    "Kamu bisa berdiri di kaki kamu sendiri, kamu kuat, kamu sabar, kamu cantik, kamu pintar, dan kamu punya hati yang besar. Aku bangga banget sama kamu. Terima kasih ya sayang, sudah bertahan sejauh ini, pasti versi kecil kamu yang dulu sangat bangga sama kamu yang sekarang, sudah tetap kuat, dan aku juga sangat berterimakasih karena kamu sudah hadir di hidup aku. Kamu benar-benar keren, dan aku tahu ke depannya kamu akan jadi versi yang lebih hebat lagi, aku bersyukur banget punya kamu💗🥹🫂.Maaff jikaa cacakk adaa buat salahh ke dirimuu selama kamu kenal cacakk yaaa,kadangg cacak juga ga ngertii gimana perasaan melmell,apa yang melmell rasakan tapi.....akuu berharap dirimu bakal terus jadi melmel yang cacak kenal yaaa🥰",
    'Cacakk sampai in pesan ini karna cacak berterima kasih dan cacakk bersyukurr dulu kenal kamu untuk pertama kali.Dari main ml,curhatt tentang keadaan masingg"dan sampai duluu kita asing yaaa😖 karna cacak ngelakuin kesalahan sampe melmell nangiss hmmm:(,tapii kenapaa cacakk memilih dirimu menjadi sosok pendamping ku sampai akhir hayat cacakk adalah.....kamuu adalah wanita yang bener"kriteria cacakk dari value mu,tekad muu menghadapi rintangan di bumi ini🌎,dan caramuu menyambut ku untuk pertama kali🫂🥹,karna cacakk duluu korban bullyy hehee,cara dirimu menyambut diriku dan cacakkk merasa nyaman di smping dirimu,walaupun kita LDR saat kita saling berbicara satu nada handphone rasanya semua rasa capek cacak dan rintangan ituu ringan bangett.dan cacakk mauu kamuu jadii wanitaa terakhir cacakk sampaiii cacakk tua nantii dan yapppp menua bersama💕🫶🏻💗🫂. Hari ini ku sampaikan pesan ini tulus untuk mu dan rasa sayang ku ke kamuu... MAKASII YAAA SEKALII LAGII DARI DIRIKU UNTUK DIRIMU MELL....🫶🏻💝,SEMANGATT MENGEJAR MIMPII MUU YAAA,SEMANGATT NUGASNYAA DEMI APA YANG INGIN KAMUU CAPAI,KITA BERJALAN BERSAMA DISINI,KAMUU JANGAN TERLALU MEMBAWA BEBAN MU SENDIRI YAAA BAGI SEDIKIT DAN CERITA KAN KE CACAKK YAAA🫂🥹,CACAKK MENUNGGU MU WAHAII WANITA TERKUAT KU🫂🫶🏻.',
  ];

  return (
    <Section id="letter" eyebrow="Surat dari Ucaa" title="Untukmu">
      <article className="letter">
        {paragraphs.map((paragraph, index) => (
          <motion.p
            key={paragraph}
            initial={isMobile ? { opacity: 0, y: 22 } : false}
            whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.58, delay: isMobile ? Math.min(index * 0.05, 0.18) : 0 }}
          >
            {paragraph}
          </motion.p>
        ))}
      </article>
    </Section>
  );
}

function MusicPlayer({ started }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.32);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!started || !audioRef.current) return;
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [started]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} autoPlay loop preload="auto" src={musicUrl} />
      <button className="icon-button" onClick={toggle} aria-label={playing ? "Pause musik" : "Putar musik"}>
        {playing ? <Pause /> : <Play />}
      </button>
      <Volume2 size={18} />
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={(event) => setVolume(Number(event.target.value))}
        aria-label="Volume musik"
      />
    </div>
  );
}

function Ending() {
  return (
    <section className="ending">
      <FloatingHearts />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <span className="eyebrow">Ucaa dan Cacakk</span>
        <h2>Selamanya</h2>
        <p>Terima kasih sudah hadir, bertahan, dan tetap jadi kamu yang Ucaa sayangi.</p>
        <button className="primary-button" onClick={() => { window.location.href = "/flower.html"; }}>
          <Heart size={19} fill="currentColor" />
          Ucaa Sayang Cacakk
        </button>
      </motion.div>
    </section>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [started, setStarted] = useState(true);

  const enterMainPage = () => {
    setEntered(true);
    setStarted(true);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 40);
  };

  const start = () => {
    setStarted(true);
    window.setTimeout(() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" }), 320);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!entered ? (
          <LetterGate key="letter-gate" onOpen={enterMainPage} />
        ) : (
          <motion.div
            key="main-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: "easeOut" }}
          >
            <Opening onStart={start} />
            <main className="main-content">
              <Timeline />
              <Gallery />
              <Reasons />
              <Quotes />
              <Counter />
              <LoveLetter />
              <Ending />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
      <MusicPlayer started={started} />
    </>
  );
}
