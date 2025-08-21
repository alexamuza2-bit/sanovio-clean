'use client'

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Phone, Mail, MapPin, Facebook, Instagram, Image as ImageIcon, X } from "lucide-react";

function LogoSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true" {...props}>
      <defs>
        <clipPath id="round">
          <circle cx="256" cy="256" r="256" />
        </clipPath>
      </defs>
      <g clipPath="url(#round)">
        <rect width="512" height="512" fill="#163a5a"/>
        <g transform="translate(96,108)">
          <g id="house">
            <path d="M64 72 L160 0 L256 72 V272 C256 288 244 300 228 300 H92 C76 300 64 288 64 272 Z" fill="#f59a23" stroke="#5a3b12" strokeWidth="12" strokeLinejoin="round"/>
            <rect x="110" y="204" width="36" height="56" rx="6" fill="#5a3b12" opacity=".9"/>
            <rect x="120" y="104" width="24" height="24" rx="3" fill="#ef8a1f"/>
            <rect x="152" y="104" width="24" height="24" rx="3" fill="#ef8a1f"/>
            <rect x="120" y="136" width="24" height="24" rx="3" fill="#ef8a1f"/>
            <rect x="152" y="136" width="24" height="24" rx="3" fill="#ef8a1f"/>
          </g>
          <g id="spray" transform="translate(240,120)">
            <path d="M0 32 h40 l10 -16 h22 v20 h-12 l-10 16 v64 c0 18 -14 32 -32 32 s-32 -14 -32 -32 v-68 z" fill="#f29a3e" stroke="#5a3b12" strokeWidth="8" strokeLinejoin="round"/>
            <path d="M18 60 h28 v74 c0 11 -9 20 -20 20 s-20 -9 -20 -20 v-54 z" fill="#1f7fb3"/>
          </g>
          <g id="sparkles" transform="translate(288,24)" fill="#1f7fb3">
            <path d="M24 0c4 16 8 20 24 24-16 4-20 8-24 24-4-16-8-20-24-24 16-4 20-8 24-24z"/>
            <path d="M72 36c3 12 6 15 18 18-12 3-15 6-18 18-3-12-6-15-18-18 12-3 15-6 18-18z"/>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default function LandingPage() {
  const servicesRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const pricesRef = useRef<HTMLElement | null>(null);
  const [heroFlip, setHeroFlip] = useState<boolean>(false);
  const [heroPos, setHeroPos] = useState<'left' | 'center' | 'right'>('right');
  const [heroSwap, setHeroSwap] = useState<boolean>(false);
  const [heroGrad, setHeroGrad] = useState<'light' | 'medium' | 'strong'>('medium');

  const PHONE_LINK = "tel:+40700000000";

  // Logo
  const [logoSrc, setLogoSrc] = useState<string>("");
  const [canEditLogo, setCanEditLogo] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Imagini custom (fără galerie): fundal hero, bandă mijloc, imagine laterală
  const [imgs, setImgs] = useState<{ hero: string; mid: string; aside: string }>({ hero: "", mid: "", aside: "" });
  const [defaults, setDefaults] = useState<{ hero: string; mid: string; aside: string }>({ hero: "", mid: "", aside: "" });
  const heroRef = useRef<HTMLInputElement | null>(null);
  const midRef = useRef<HTMLInputElement | null>(null);
  const asideRef = useRef<HTMLInputElement | null>(null);

  // Fallback-uri globale (valabile pentru toți vizitatorii)
  const GLOBAL_DEFAULTS = {
    logo: "/logo.png",           // pune logo-ul original aici (public/logo.png)
    hero: "/hero.jpeg",          // imaginea HERO (public/hero.jpeg)
    mid: "/section-bg.jpg",      // fundal secțiune pachete (public/section-bg.jpg)
    aside: "" as string           // opțional: imagine laterală implicită
  };

  const setFavicon = (uri: string) => {
    const linkId = "fav-sanovio";
    let link = document.querySelector(`link#${linkId}`) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      (link as HTMLLinkElement).rel = "icon";
      document.head.appendChild(link);
    }
    (link as HTMLLinkElement).href = uri;
  };

  // Load persistente
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sanovio_logo");
      if (saved) { setLogoSrc(saved); setFavicon(saved); } else { setFavicon(GLOBAL_DEFAULTS.logo); }
      const hero = localStorage.getItem("sanovio_img_hero") || "";
      const mid = localStorage.getItem("sanovio_img_mid") || "";
      const aside = localStorage.getItem("sanovio_img_aside") || "";
      setImgs({ hero, mid, aside });
      const dHero = localStorage.getItem("sanovio_default_hero") || "";
      const dMid = localStorage.getItem("sanovio_default_mid") || "";
      const dAside = localStorage.getItem("sanovio_default_aside") || "";
      setDefaults({ hero: dHero, mid: dMid, aside: dAside });
      const flipSaved = localStorage.getItem("sanovio_hero_flip");
      if (flipSaved) setHeroFlip(flipSaved === "1");
      const posSaved = localStorage.getItem("sanovio_hero_pos");
      if (posSaved === 'left' || posSaved === 'center' || posSaved === 'right') setHeroPos(posSaved as any);
      const swapSaved = localStorage.getItem("sanovio_hero_swap");
      if (swapSaved) setHeroSwap(swapSaved === "1");
      const gradSaved = localStorage.getItem("sanovio_hero_grad");
      if (gradSaved === 'light' || gradSaved === 'medium' || gradSaved === 'strong') setHeroGrad(gradSaved as any);
    } catch {}
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      setCanEditLogo(sp.has("edit"));
    }
  }, []);

  const onPickLogo = () => fileRef.current && fileRef.current.click();
  const onLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const uri = String(reader.result);
      setLogoSrc(uri);
      try { localStorage.setItem("sanovio_logo", uri); } catch {}
      setFavicon(uri);
    };
    reader.readAsDataURL(file);
  };

  // Helpers upload imagini
  const pick = (which: 'hero' | 'mid' | 'aside') => () => {
    ({ hero: heroRef, mid: midRef, aside: asideRef }[which].current)?.click();
  };
  const onImgChange = (which: 'hero' | 'mid' | 'aside') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const uri = String(reader.result);
      setImgs(prev => ({ ...prev, [which]: uri }));
      try { localStorage.setItem(`sanovio_img_${which}`, uri); } catch {}
    };
    reader.readAsDataURL(file);
  };
  const clearImg = (which: 'hero' | 'mid' | 'aside') => () => {
    setImgs(prev => ({ ...prev, [which]: "" }));
    try { localStorage.removeItem(`sanovio_img_${which}`); } catch {}
  };
  const saveDefault = (which: 'hero' | 'mid' | 'aside') => () => {
    const src = imgs[which as keyof typeof imgs];
    if (!src) return;
    try { localStorage.setItem(`sanovio_default_${which}`, src); } catch {}
    setDefaults(prev => ({ ...prev, [which]: src }));
  };
  const clearDefault = (which: 'hero' | 'mid' | 'aside') => () => {
    try { localStorage.removeItem(`sanovio_default_${which}`); } catch {}
    setDefaults(prev => ({ ...prev, [which]: "" }));
  };

  // Export helpers (evităm dublarea numelui)
  const triggerDownload = async (src: string, filename: string) => {
    try {
      let url = src;
      if (!src.startsWith('data:')) {
        if (src.startsWith('/')) url = window.location.origin + src;
        const res = await fetch(url, { credentials: 'omit' });
        if (!res.ok) throw new Error('fetch-failed');
        const blob = await res.blob();
        url = URL.createObjectURL(blob);
      }
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      if (url.startsWith('blob:')) URL.revokeObjectURL(url);
    } catch (e) {
      alert('Nu am putut descărca fișierul din editor. Dacă folosești fallback-ul global (/logo.png, /hero.jpeg) și nu există în preview, încarcă imaginea din “Schimbă logo/hero” sau descarcă din site-ul live după deploy.');
    }
  };
  const exportLogo = async () => {
    const src = logoSrc || GLOBAL_DEFAULTS.logo;
    if (src) await triggerDownload(src, 'logo.png');
  };
  const exportHero = async () => {
    const src = imgs.hero || defaults.hero || GLOBAL_DEFAULTS.hero;
    if (src) await triggerDownload(src, 'hero.jpeg');
  };
  const resetLogo = () => {
    setLogoSrc("");
    try { localStorage.removeItem('sanovio_logo'); } catch {}
    setFavicon(GLOBAL_DEFAULTS.logo);
  };

  const toggleHeroFlip = () => {
    setHeroFlip(prev => {
      const next = !prev;
      try { localStorage.setItem("sanovio_hero_flip", next ? "1" : "0"); } catch {}
      return next;
    });
  };

  const updateHeroPos = (pos: 'left'|'center'|'right') => {
    setHeroPos(pos);
    try { localStorage.setItem('sanovio_hero_pos', pos); } catch {}
  };
  const toggleHeroSwap = () => {
    setHeroSwap(prev => {
      const next = !prev;
      try { localStorage.setItem('sanovio_hero_swap', next ? '1' : '0'); } catch {}
      return next;
    });
  };
  const updateHeroGrad = (g: 'light'|'medium'|'strong') => {
    setHeroGrad(g);
    try { localStorage.setItem('sanovio_hero_grad', g); } catch {}
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted. (Demo)");
  };

  const scrollTo = (ref?: React.RefObject<HTMLElement | null>) => () => {
    const el = ref?.current as HTMLElement | null | undefined;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const features = [
    { title: "Profesional", desc: "Echipă verificată, instruire periodică, proceduri standardizate." },
    { title: "Produse sigure", desc: "Detergenți profesionali, eco‑friendly unde este posibil." },
    { title: "Garanție 100%", desc: "Dacă nu ești mulțumit, refacem gratuit zona." },
  ];

  const services = [
    { name: "Curățenie generală", details: ["Locuințe & case", "Curățenie după petreceri", "Spălare geamuri și oglinzi"] },
    { name: "Curățenie de întreținere", details: ["Abonamente săptămânale", "Consumabile incluse opțional", "Program flexibil"] },
    { name: "Airbnb / apartamente închiriate", details: ["Check‑in / check‑out rapid", "Lenjerii & prosoape (opțional)", "Listă personalizată de verificare"] },
  ];

  const plans = [
    { name: "Basic", price: "de la 249 lei", perks: ["Garsonieră / birou mic", "2–3 ore, 1 agent", "Consumabile incluse"] },
    { name: "Standard", price: "de la 349 lei", perks: ["Ap. 2 camere / birou mediu", "3–4 ore, 2 agenți", "Fereastre interne"] },
    { name: "Premium", price: "ofertă personalizată", perks: ["Case / sedii mari", "Manager de cont dedicat", "Program recurent"] },
  ];

  const heroSrc = imgs.hero || defaults.hero || GLOBAL_DEFAULTS.hero;
  const midSrc = imgs.mid || defaults.mid || GLOBAL_DEFAULTS.mid;
  const asideSrc = imgs.aside || defaults.aside || GLOBAL_DEFAULTS.aside;

  const gradClass = heroGrad === 'strong' ? 'from-white/90 via-white/50' : heroGrad === 'light' ? 'from-white/60 via-white/20' : 'from-white/80 via-white/40';

  // Teste runtime (nu le schimb)
  useEffect(() => {
    console.assert(Array.isArray(features) && features.length === 3, "features length should be 3");
    console.assert(features.every(f => typeof f.title === 'string' && typeof f.desc === 'string'), "each feature must have title+desc strings");
    console.assert(Array.isArray(services) && services.length >= 3, "services length >= 3 expected");
    console.assert(services.every(s => typeof s.name === 'string' && Array.isArray(s.details)), "each service should have details[]");
    console.assert(Array.isArray(plans) && plans.length >= 3, "plans length >= 3 expected");
    console.assert(plans.every(p => p.name && p.price && Array.isArray(p.perks)), "each plan must have name/price/perks[]");
    console.assert(typeof logoSrc === 'string', 'logoSrc should be a string');
    requestAnimationFrame(() => {
      console.assert(!!document.querySelector('header'), '<header> should exist');
      console.assert(!!document.querySelector('footer'), '<footer> should exist');
      console.assert(!!document.getElementById('phone-fab'), 'phone button should exist');
    });
  }, [logoSrc]);

  return (
    <div className="min-h-screen bg-[#e7f3fb] text-slate-900">
      {canEditLogo && (
        <div className="sticky top-0 z-[60] bg-amber-50/95 border-b border-amber-200 backdrop-blur px-3 py-2 text-sm flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          <span className="font-medium">Imagini personalizate:</span>
          <button onClick={pick('hero')} className="rounded px-2 py-1 border hover:bg-white">Fundal hero</button>
          <button onClick={toggleHeroFlip} className="rounded px-2 py-1 border hover:bg-white">Oglindește HERO</button>
          <label className="ml-2">Poziție:</label>
          <select value={heroPos} onChange={(e)=>updateHeroPos(e.target.value as 'left'|'center'|'right')} className="border rounded px-2 py-1 text-sm">
            <option value="left">stânga</option>
            <option value="center">centru</option>
            <option value="right">dreapta</option>
          </select>
          <button onClick={toggleHeroSwap} className="rounded px-2 py-1 border hover:bg-white">Comută layout HERO</button>
          <label className="ml-2">Gradient:</label>
          <select value={heroGrad} onChange={(e)=>updateHeroGrad(e.target.value as 'light'|'medium'|'strong')} className="border rounded px-2 py-1 text-sm">
            <option value="light">light</option>
            <option value="medium">medium</option>
            <option value="strong">strong</option>
          </select>
          <button onClick={pick('aside')} className="rounded px-2 py-1 border hover:bg-white">Imagine laterală</button>
          <button onClick={pick('mid')} className="rounded px-2 py-1 border hover:bg-white">Fundal secțiune</button>
          {(imgs.hero || imgs.aside || imgs.mid || defaults.hero || defaults.aside || defaults.mid) && <span className="mx-2 text-slate-500">—</span>}
          {imgs.hero && <button onClick={clearImg('hero')} className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"><X className="w-3 h-3"/>Șterge hero</button>}
          {imgs.hero && <button onClick={saveDefault('hero')} className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"><Check className="w-3 h-3"/>Setează HERO implicit</button>}
          {defaults.hero && <button onClick={clearDefault('hero')} className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"><X className="w-3 h-3"/>Șterge HERO implicit</button>}
          {imgs.aside && <button onClick={clearImg('aside')} className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"><X className="w-3 h-3"/>Șterge laterală</button>}
          {imgs.aside && <button onClick={saveDefault('aside')} className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"><Check className="w-3 h-3"/>Setează Lateral implicit</button>}
          {defaults.aside && <button onClick={clearDefault('aside')} className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"><X className="w-3 h-3"/>Șterge Lateral implicit</button>}
          {imgs.mid && <button onClick={clearImg('mid')} className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"><X className="w-3 h-3"/>Șterge secțiune</button>}
          {imgs.mid && <button onClick={saveDefault('mid')} className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"><Check className="w-3 h-3"/>Setează Secțiune implicit</button>}
          {defaults.mid && <button onClick={clearDefault('mid')} className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"><X className="w-3 h-3"/>Șterge Secțiune implicit</button>}
          <span className="mx-2 text-slate-500">—</span>
          <button onClick={exportLogo} className="rounded px-2 py-1 border hover:bg-white">Descarcă LOGO (deploy)</button>
          {(imgs.hero || defaults.hero || GLOBAL_DEFAULTS.hero) && (
            <button onClick={exportHero} className="rounded px-2 py-1 border hover:bg-white">Descarcă HERO (deploy)</button>
          )}
          {logoSrc && (
            <button onClick={resetLogo} className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"><X className="w-3 h-3"/>Reset logo</button>
          )}
        </div>
      )}

      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2" onDoubleClick={() => { setCanEditLogo(true); onPickLogo(); }} title="Dublu‑click pe logo pentru a-l schimba (ascuns)">
            {logoSrc ? (
              <img src={logoSrc} alt="Sanovio Clean" className="w-9 h-9 rounded-2xl object-contain bg-white" />
            ) : (
              <img src={GLOBAL_DEFAULTS.logo} alt="Sanovio Clean" className="w-9 h-9 rounded-2xl object-contain bg-white" />
            )}
            <span className="font-semibold tracking-tight">Sanovio Clean</span>
            <input ref={fileRef} type="file" accept="image/*" onChange={onLogoChange} className="hidden" />
            {canEditLogo && (
              <Button type="button" variant="outline" onClick={onPickLogo} className="h-7 px-2 rounded-2xl">Schimbă logo</Button>
            )}
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button onClick={scrollTo(servicesRef)} className="hover:opacity-80">Servicii</button>
            <button onClick={scrollTo(pricesRef)} className="hover:opacity-80">Prețuri</button>
            <button onClick={scrollTo(undefined)} className="hover:opacity-80">Despre</button>
            <button onClick={scrollTo(contactRef)} className="hover:opacity-80">Contact</button>
          </nav>
          <div className="flex items-center gap-4 md:mr-2">
            <a href={PHONE_LINK} className="hover:opacity-80" aria-label="Sună-ne"><Phone className="w-5 h-5 text-[#25D366]"/></a>
            <a href="#" className="hover:opacity-80" aria-label="Facebook"><Facebook className="w-5 h-5 text-[#163a5a]"/></a>
            <a href="#" className="hover:opacity-80" aria-label="Instagram"><Instagram className="w-5 h-5 text-[#163a5a]"/></a>
          </div>
          <Button onClick={scrollTo(contactRef)} className="ml-3 shrink-0 rounded-2xl bg-[#1f7fb3] hover:bg-[#163a5a]">Cere ofertă</Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {canEditLogo && !imgs.hero && !defaults.hero && (
          <button onClick={pick('hero')} className="absolute z-10 right-4 top-4 bg-white/80 backdrop-blur rounded-2xl px-3 py-1 border text-sm hover:bg-white">Adaugă fundal HERO</button>
        )}
        {heroSrc ? (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className={heroFlip ? "absolute inset-0 -scale-x-100" : "absolute inset-0"}>
              <img src={heroSrc} alt="Fundal" className="w-full h-full object-cover" style={{ objectPosition: heroPos === 'left' ? 'left center' : heroPos === 'right' ? 'right center' : 'center center' }} />
            </div>
            <div className={`absolute inset-0 pointer-events-none ${heroFlip ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} ${gradClass} to-transparent`} />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 opacity-70 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#cfe3f1] rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-[30rem] h-[30rem] bg-[#e7f3fb] rounded-full blur-3xl" />
          </div>
        )}
        {/* fade top spre header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 md:h-24 z-[1] bg-gradient-to-b from-[#e7f3fb] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-24 z-[1] bg-gradient-to-t from-[#e7f3fb] to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <motion.div className={heroSwap ? 'md:order-2' : 'md:order-1'} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">Ștergem grija, nu doar praful.</h1>
            <p className="mt-5 text-slate-700 text-lg max-w-prose">Suntem Sanovio și facem curățenie ca pentru noi acasă - cu grijă și respect. Ne găsești in București și Ilfov, gata să intervenim ori de câte ori ai nevoie de un spațiu curat, luminos și ordonat.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={scrollTo(contactRef)} className="rounded-2xl bg-[#1f7fb3] hover:bg-[#163a5a]">Solicită ofertă</Button>
              <Button onClick={scrollTo(servicesRef)} variant="outline" className="rounded-2xl border-[#1f7fb3] text-[#163a5a] hover:bg-[#e7f3fb]">Vezi servicii</Button>
            </div>
            <p className="mt-3 text-xs text-slate-500">Asigurați, facturați, cu echipamente profesionale.</p>
          </motion.div>

          <motion.div className={heroSwap ? 'md:order-1' : 'md:order-2'} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            {asideSrc && (
              <img src={asideSrc} alt="Ilustrație" className="mb-4 w-full rounded-2xl shadow-md object-cover max-h-64"/>
            )}
            <Card className="rounded-2xl shadow-lg border-[#cfe3f1]">
              <CardHeader>
                <CardTitle>Primește o ofertă</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="grid gap-3">
                  <Input placeholder="Nume" required />
                  <Input type="email" placeholder="Email" required />
                  <Input placeholder="Telefon" />
                  <Textarea placeholder="Adresă / tip spațiu / orar preferat…" rows={4} />
                  <Button type="submit" className="rounded-2xl bg-[#f29a3e] hover:bg-[#c76b12] text-slate-900">Trimite</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* SERVICII */}
      <section ref={servicesRef} id="servicii" className="py-14 md:py-20">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Serviciile Sanovio Clean</h2>
          <p className="mt-2 text-slate-600">Calitate, responsabilitate, transparență.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <Card className="rounded-2xl h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-2xl bg-[#163a5a] text-white flex items-center justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
                    <p className="mt-2 text-slate-600">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREȚURI */}
      <section ref={pricesRef} id="preturi" className="py-16 md:py-24 bg-white relative">
        {canEditLogo && !imgs.mid && (
          <button onClick={pick('mid')} className="absolute z-10 right-4 top-4 bg-white/80 backdrop-blur rounded-2xl px-3 py-1 border text-sm hover:bg-white">Adaugă fundal secțiune</button>
        )}
        {midSrc && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img src={midSrc} alt="Fundal secțiune" className="w-full h-full object-cover opacity-35 scale-[1.12] filter saturate-0"/>
            <div className="absolute inset-0 bg-[#e7f3fb]/60 pointer-events-none"/>
          </div>
        )}
        {/* Fade sus & jos pentru tranziție fină între secțiuni */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 md:h-24 z-[1] bg-gradient-to-b from-[#e7f3fb] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-20 z-[1] bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Pachete</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {plans.map((p, i) => {
              const isCustom = /ofertă/i.test(p.price);
              return (
                <Card key={i} className="rounded-2xl h-full flex flex-col">
                  <CardHeader className="pb-2">
                    {isCustom ? (
                      <div>
                        <CardTitle className="leading-tight">{p.name}</CardTitle>
                        <div className="text-base font-semibold text-slate-900 -mt-0.5 leading-tight">{p.price}</div>
                      </div>
                    ) : (
                      <div className="flex items-baseline justify-between gap-2">
                        <CardTitle className="m-0 leading-tight">{p.name}</CardTitle>
                        <div className="text-2xl font-bold ml-2 leading-tight">{p.price}</div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-2 text-slate-700 flex-1">
                      {p.perks.map((perk, j) => (
                        <li key={j} className="flex gap-2 items-start"><Check className="w-5 h-5 mt-1 text-[#1f7fb3]"/> {perk}</li>
                      ))}
                    </ul>
                    <Button onClick={scrollTo(contactRef)} className="w-full mt-4 rounded-2xl bg-[#1f7fb3] hover:bg-[#163a5a] mt-auto">Solicită ofertă</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-2xl p-6 md:p-8 border bg-gradient-to-r from-[#1f7fb3] to-[#e7f3fb]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-white md:text-slate-900 md:drop-shadow-sm">Vrei ofertă în aceeași zi?</h3>
                <p className="text-slate-800">Spune-ne tipul spațiului și programul preferat, revenim rapid.</p>
              </div>
              <Button onClick={scrollTo(contactRef)} className="rounded-2xl bg-[#f29a3e] hover:bg-[#c76b12] text-slate-900">Completează formularul</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={contactRef} className="py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Contact</h2>
            <p className="mt-2 text-slate-700">Completează formularul sau folosește datele de mai jos.</p>
            <div className="mt-6 space-y-3 text-slate-800">
              <p className="flex items-center gap-2"><Phone className="w-5 h-5 text-[#163a5a]"/> +40 7XX XXX XXX</p>
              <p className="flex items-center gap-2"><Mail className="w-5 h-5 text-[#163a5a]"/> contact@sanovio.ro</p>
              <p className="flex items-center gap-2"><MapPin className="w-5 h-5 text-[#163a5a]"/> București, RO</p>
            </div>
          </div>
          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle>Solicită ofertă</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="grid gap-3">
                <Input placeholder="Nume" required />
                <Input type="email" placeholder="Email" required />
                <Input placeholder="Telefon" />
                <Textarea placeholder="Suprafață, adresă, tip spațiu, frecvență…" rows={4} />
                <Button type="submit" className="rounded-2xl bg-[#1f7fb3] hover:bg-[#163a5a]">Trimite</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAB Phone */}
      <a id="phone-fab" href={PHONE_LINK} className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#25D366] bg-white/95 backdrop-blur hover:bg-white shadow-lg" aria-label="Sună-ne">
        <Phone className="w-7 h-7 md:w-8 md:h-8 text-[#25D366]"/>
      </a>

      <footer className="border-t bg-[#e7f3fb]">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">© {new Date().getFullYear()} Sanovio Clean. Toate drepturile rezervate.</p>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:opacity-80 text-sm text-slate-700">Termeni</a>
            <a href="#" className="hover:opacity-80 text-sm text-slate-700">Confidențialitate</a>
            <a href="#" className="hover:opacity-80 text-sm text-slate-700">Cookies</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-80"><Facebook className="w-5 h-5 text-[#163a5a]"/></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-80"><Instagram className="w-5 h-5 text-[#163a5a]"/></a>
          </div>
        </div>
      </footer>

      {/* input-uri ascunse pentru imagini */}
      <input ref={heroRef} type="file" accept="image/*" onChange={onImgChange('hero')} className="hidden" />
      <input ref={midRef} type="file" accept="image/*" onChange={onImgChange('mid')} className="hidden" />
      <input ref={asideRef} type="file" accept="image/*" onChange={onImgChange('aside')} className="hidden" />
    </div>
  );
}
