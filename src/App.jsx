import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarHeart,
  ChevronLeft,
  ChevronRight,
  Heart,
  Mail,
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
    window.setTimeout(onOpen, 1500);
  };

  return (
    <motion.section
      className="letter-gate"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.8 }}
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
          opacity: { duration: 0.55, delay: 0.45 },
          scale: { duration: 0.55, delay: 0.45 },
          y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.04, rotate: -1.5 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="letter-flap" />
        <span className="letter-body">
          <Mail size={48} strokeWidth={1.55} />
          <strong>Untuk Cacakk</strong>
        </span>
      </motion.button>
      <AnimatePresence>
        {opening && (
          <motion.div
            className="gate-transition"
            initial={{ clipPath: "circle(0% at 50% 54%)", opacity: 0.96 }}
            animate={{ clipPath: "circle(145% at 50% 54%)", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
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
  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
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

  return (
    <Section id="memories" eyebrow="Yang Ucaa simpan" title="Kenangan">
      <div className="gallery-grid">
        {memories.map((memory, index) => (
          <button
            className="memory-card"
            key={memory.title}
            onClick={() => setActive(index)}
            aria-label={`Lihat ${memory.title}`}
          >
            <div className="memory-visual" style={{ background: memory.background }}>
              <span>{memory.icon}</span>
            </div>
            <strong>{memory.title}</strong>
            <small>{memory.caption}</small>
          </button>
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
            <motion.div
              className="lightbox-panel"
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.45 }}
            >
              <div className="memory-visual large" style={{ background: memories[active].background }}>
                <span>{memories[active].icon}</span>
              </div>
              <h3>{memories[active].title}</h3>
              <p>{memories[active].caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function Reasons() {
  return (
    <Section id="reasons" eyebrow="Tentang Cacakk" title="Tentangmu">
      <div className="reason-grid">
        {reasons.map((reason) => (
          <motion.article className="reason-card" key={reason} whileHover={{ y: -4 }}>
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
    <Section id="quotes" eyebrow="Catatan Ucaa" title="Bisik">
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
  const items = [
    ["Hari", time.days],
    ["Jam", time.hours],
    ["Menit", time.minutes],
    ["Detik", time.seconds],
  ];

  return (
    <Section id="counter" eyebrow="Sejak kita mulai" title="Waktu">
      <div className="counter-grid">
        {items.map(([label, value]) => (
          <div className="counter-box" key={label}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="counter-note">
        <CalendarHeart size={18} /> Sejak 14 Januari 2024, Ucaa masih belajar mencintai Cacakk dengan lebih baik.
      </p>
    </Section>
  );
}

function LoveLetter() {
  return (
    <Section id="letter" eyebrow="Surat dari Ucaa" title="Untukmu">
      <article className="letter">
        <p>Cacakk,</p>
        <p>
          Aku mau bilang sesuatu yang mungkin sederhana, tapi aku pengin kamu membacanya pelan-pelan.
          Walaupun kita LDR, rasanya tidak pernah benar-benar hambar buat aku. Ada rindu, ada kangen,
          ada hari-hari yang berat, tapi tetap ada kamu yang bikin aku ingin terus bertahan.
        </p>
        <p>
          Aku tahu kadang cara peduli aku bisa bikin kamu jengkel. Kadang aku belum paham perasaan
          kamu seutuhnya, kadang aku juga salah baca keadaan. Tapi Cacakk, rasa sayang aku ke kamu
          tulus. Aku mau belajar lebih lembut, lebih peka, dan lebih bisa jadi tempat kamu pulang
          ketika kamu capek.
        </p>
        <p>
          Aku bangga banget sama kamu. Kamu kuat, sabar, cantik, pintar, dan punya hati yang besar.
          Versi kecil kamu pasti bangga melihat kamu yang sekarang. Dan Ucaa juga bangga, karena
          bisa kenal Cacakk yang terus berjuang, terus berdiri, dan tetap punya hati yang hangat.
        </p>
        <p>
          Terima kasih karena dulu kamu menyambut aku dengan baik. Dari main bareng, cerita tentang
          keadaan masing-masing, sampai semua hal kecil yang bikin aku nyaman di samping kamu. Aku
          tidak lupa. Bahkan saat kita pernah asing karena kesalahan aku, aku tetap belajar bahwa
          kamu adalah seseorang yang sangat berarti buat aku.
        </p>
        <p>
          Cacakk, semangat ya mengejar mimpi kamu. Semangat nugasnya, semangat menjalani hari-hari
          yang tidak selalu mudah. Kamu tidak harus membawa semuanya sendirian. Kalau berat, bagi
          sedikit ke Ucaa. Aku mungkin tidak selalu punya jawaban paling benar, tapi aku mau dengar.
        </p>
        <p>
          Aku menunggu kamu, wanita terkuatku. Aku ingin kita terus berjalan bareng, pelan-pelan,
          sampai nanti kita bisa melihat semua perjuangan ini dan bilang: ternyata kita sampai juga.
        </p>
        <p>Dari Ucaa, untuk Cacakk yang selalu aku sayangi.</p>
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
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73467.mp3" />
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
        <button className="primary-button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Heart size={19} fill="currentColor" />
          Ucaa Sayang Cacakk
        </button>
      </motion.div>
    </section>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [started, setStarted] = useState(false);

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
