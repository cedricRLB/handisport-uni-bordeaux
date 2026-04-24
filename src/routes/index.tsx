import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Calendar, MapPin, Clock, Trophy, Users, Heart, ArrowRight, Waves, Medal } from "lucide-react";
import heroImg from "@/assets/hero-surf.jpg";
import thomasImg from "@/assets/thomas-da-silva.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Conférence Handisport — Thomas Da Silva | ISG Bordeaux 12 juin" },
      { name: "description", content: "Conférence handisport gratuite à l'ISG Bordeaux le 12 juin à 13h avec Thomas Da Silva, champion du monde de para surf. Inscription gratuite." },
      { property: "og:title", content: "Conférence Handisport — Thomas Da Silva à Bordeaux" },
      { property: "og:description", content: "Rencontrez Thomas Da Silva, champion du monde de para surf. ISG Bordeaux, 12 juin 13h. Entrée libre sur inscription." },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Index,
});

const TYPEFORM = "https://form.typeform.com/to/kNyCLfgA";

function Countdown() {
  const target = new Date("2026-06-12T13:00:00+02:00").getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = now === null ? target - Date.parse("2026-04-23T00:00:00Z") : Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  const items = [
    { v: d, l: "Jours" }, { v: h, l: "Heures" }, { v: m, l: "Minutes" }, { v: s, l: "Secondes" },
  ];
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-5">
      {items.map((it, i) => (
        <motion.div
          key={it.l}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="glass rounded-xl px-3 py-4 sm:px-5 sm:py-6 text-center"
        >
          <div className="font-display text-3xl sm:text-5xl font-bold text-gradient-sunset tabular-nums">
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="mt-1 text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">{it.l}</div>
        </motion.div>
      ))}
    </div>
  );
}

function CTAButton({ children, large = false }: { children: React.ReactNode; large?: boolean }) {
  return (
    <motion.a
      href={TYPEFORM}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow animate-pulse-ring ${
        large ? "px-9 py-5 text-lg" : "px-7 py-3.5 text-base"
      }`}
    >
      <span>{children}</span>
      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    </motion.a>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-hero">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img src={heroImg} alt="Para surfer sur une vague" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      </motion.div>

      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-display font-bold text-lg">
          <Waves className="h-6 w-6 text-primary animate-wave" />
          <span>Handisport · Bordeaux</span>
        </div>
        <a href="#inscription" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition">
          S'inscrire →
        </a>
      </nav>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-24 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest text-accent">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Conférence exceptionnelle · Entrée libre
          </span>

          <h1 className="mt-6 font-display text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95]">
            Repousser
            <br />
            <span className="text-gradient-sunset">les limites</span>
            <br />
            de l'impossible.
          </h1>

          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Une rencontre unique avec <strong className="text-foreground">Thomas Da Silva</strong>, champion du monde de para surf, et des experts du handisport. Une soirée d'inspiration, de partage et de dépassement de soi.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <CTAButton large>Je m'inscris gratuitement</CTAButton>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Calendar className="h-5 w-5 text-accent" />
              <span><strong className="text-foreground">12 juin</strong> · 13h00 · ISG Bordeaux</span>
            </div>
          </div>

          <div className="mt-14 max-w-xl">
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">L'événement commence dans</p>
            <Countdown />
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-xs uppercase tracking-widest"
      >
        Découvrir ↓
      </motion.div>
    </section>
  );
}

function Speaker() {
  const stats = [
    { v: "x4", l: "Champion du monde" },
    { v: "x4", l: "Champion de France" },
    { v: "x3", l: "Vice-champion du monde" },
  ];
  return (
    <section className="relative py-28 px-6 bg-ocean-grad">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-sunset opacity-30 blur-3xl rounded-full" />
          <div className="relative overflow-hidden rounded-3xl shadow-deep aspect-[4/5]">
            <img src={thomasImg} alt="Thomas Da Silva" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background to-transparent">
              <div className="text-xs uppercase tracking-widest text-accent">Invité d'honneur</div>
              <div className="font-display text-2xl font-bold mt-1">Thomas Da Silva</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">L'intervenant</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-bold leading-tight">
            Champion du monde<br />de <span className="text-gradient-sunset">para surf</span>.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Thomas Da Silva est l'une des figures les plus marquantes du handisport français. Multiple champion du monde de para surf, il partagera son parcours, ses combats et sa vision d'un sport sans frontières.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-4 text-center"
              >
                <div className="font-display text-3xl font-bold text-gradient-sunset">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OtherSpeakers() {
  const speakers = [
    {
      name: "Pierre Laroque",
      role: "Président & joueur (Top 5 FR) — Club de Boccia de Bordeaux",
      extra: "Élu au comité Handisport Gironde",
      initials: "PL",
    },
    {
      name: "Adrien Vigouroux",
      role: "Président & joueur (D2) — Bordeaux Foot-Fauteuil électrique",
      extra: "Élu au comité Handisport Gironde",
      initials: "AV",
    },
  ];
  return (
    <section className="py-28 px-6 border-t border-border/40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Aux côtés de Thomas</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-bold">
            Les autres <span className="text-gradient-sunset">intervenants</span>.
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground">
            Des acteurs engagés du handisport en Gironde partageront leur expérience du terrain et leur vision d'un sport inclusif.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {speakers.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-8 flex gap-5 items-start"
            >
              <div className="shrink-0 h-16 w-16 rounded-2xl bg-gradient-sunset flex items-center justify-center font-display font-bold text-xl text-primary-foreground shadow-glow">
                {s.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-primary">
                  <Medal className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-widest font-semibold">Intervenant</span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold">{s.name}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{s.role}</p>
                <p className="mt-1 text-sm text-accent">{s.extra}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Program() {
  const items = [
    { t: "13h00", title: "Accueil & ouverture", desc: "Mot de bienvenue de l'ISG Bordeaux" },
    { t: "13h20", title: "Conférence de Thomas Da Silva", desc: "Parcours, défis et état d'esprit d'un champion du monde" },
    { t: "14h15", title: "Table ronde experts handisport", desc: "Échanges avec des spécialistes du sport adapté" },
    { t: "15h00", title: "Questions / réponses", desc: "Dialogue ouvert avec le public" },
    { t: "15h30", title: "Cocktail networking", desc: "Rencontres autour d'un verre offert" },
  ];
  return (
    <section className="py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Programme</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-bold">Au programme</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative pl-16 sm:pl-0 mb-10 sm:grid sm:grid-cols-2 sm:gap-12 ${i % 2 === 0 ? "" : "sm:[&>*:first-child]:order-2"}`}
            >
              <div className={`sm:text-right ${i % 2 === 0 ? "" : "sm:text-left"}`}>
                <div className="font-display text-3xl font-bold text-gradient-sunset">{it.t}</div>
              </div>
              <div>
                <div className="absolute left-4 sm:left-1/2 top-2 -translate-x-1/2 h-4 w-4 rounded-full bg-primary shadow-glow" />
                <div className="glass rounded-xl p-5">
                  <h3 className="font-display text-xl font-bold">{it.title}</h3>
                  <p className="mt-2 text-muted-foreground">{it.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const items = [
    { icon: Trophy, title: "Inspiration", desc: "Découvrez le mental d'un champion du monde et apprenez à dépasser vos propres limites." },
    { icon: Users, title: "Rencontres", desc: "Échangez avec des experts du handisport, des athlètes et une communauté engagée." },
    { icon: Heart, title: "Engagement", desc: "Soutenez une cause forte : un sport accessible à toutes et à tous." },
  ];
  return (
    <section className="py-28 px-6 bg-ocean-grad">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Pourquoi venir</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-bold">Une expérience<br />qui <span className="text-gradient-sunset">change tout</span>.</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-8 group"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <it.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">{it.title}</h3>
              <p className="mt-3 text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Details() {
  const infos = [
    { icon: Calendar, label: "Date", value: "Vendredi 12 juin" },
    { icon: Clock, label: "Heure", value: "13h00" },
    { icon: MapPin, label: "Lieu", value: "ISG Campus Bordeaux\n178 Cr du Médoc, 33300 Bordeaux" },
  ];
  return (
    <section id="inscription" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 sm:p-14 text-center shadow-deep"
        >
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Inscription gratuite</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-bold">
            Réservez votre place<br /><span className="text-gradient-sunset">dès maintenant</span>.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Les places sont limitées. L'inscription se fait en moins d'une minute via Typeform.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 text-left">
            {infos.map((i) => (
              <div key={i.label} className="rounded-xl bg-card/40 p-5 border border-border">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <i.icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{i.label}</div>
                <div className="mt-1 font-semibold whitespace-pre-line">{i.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <CTAButton large>Je réserve ma place</CTAButton>
            <p className="mt-4 text-xs text-muted-foreground">100% gratuit · Confirmation immédiate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6 text-center text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2 font-display font-bold text-foreground">
        <Waves className="h-5 w-5 text-primary" />
        Conférence Handisport · ISG Bordeaux
      </div>
      <p className="mt-3">12 juin · 13h00 · 178 Cr du Médoc, 33300 Bordeaux</p>
      <p className="mt-2">© {new Date().getFullYear()} — Avec Thomas Da Silva, champion du monde de para surf.</p>
    </footer>
  );
}

function Index() {
  return (
    <main>
      <Hero />
      <Speaker />
      <OtherSpeakers />
      <Program />
      <Why />
      <Details />
      <Footer />
    </main>
  );
}
