// src/i18n/translations.ts
// Single source of truth for all bilingual text on kat.on
// Default: Bahasa Indonesia | Secondary: English

export type Lang = 'id' | 'en';

export const t = {
  // --- NAVIGATION ---
  'nav.aria':      { id: 'ARIA',      en: 'ARIA' },
  'nav.ecosystem': { id: 'Ekosistem', en: 'Ecosystem' },
  'nav.story':     { id: 'Tentang',   en: 'Story' },
  'nav.contact':   { id: 'Kontak',    en: 'Contact' },
  'nav.launch':    { id: 'Coba ARIA', en: 'Launch ARIA' },

  // --- HERO ---
  'hero.eyebrow':  { id: 'AI-Native Product Studio', en: 'AI-Native Product Studio' },
  'hero.headline': { id: 'Asisten AI untuk Sektor Publik Indonesia.', en: 'The AI Executive Assistant for Indonesia\'s Public Sector.' },
  'hero.sub':      { id: 'ARIA membantu pemerintah, organisasi, dan eksekutif bekerja lebih cepat — dari rapat hingga pengetahuan institusional.', en: 'ARIA helps governments, organizations, and executives work faster — from meetings to institutional knowledge.' },
  'hero.cta1':     { id: 'Jelajahi ARIA', en: 'Explore ARIA' },
  'hero.cta2':     { id: 'Lihat Ekosistem', en: 'See Ecosystem' },

  // --- PROBLEM ---
  'problem.label':    { id: 'Mengapa Kami Membangun ARIA', en: 'Why We Built ARIA' },
  'problem.title':    { id: 'Tantangan Nyata di Sektor Pemerintahan', en: 'Real Challenges in the Government Sector' },
  'problem.1.label':  { id: 'Masalah', en: 'Problem' },
  'problem.1.title':  { id: 'Informasi Tersebar di Mana-mana', en: 'Information Scattered Everywhere' },
  'problem.1.desc':   { id: 'Email, dokumen, dan hasil rapat tersimpan terpisah. Tidak ada satu sumber kebenaran yang dapat diandalkan oleh seluruh tim.', en: 'Emails, documents, and meeting outcomes are stored separately. There is no single source of truth the whole team can rely on.' },
  'problem.2.label':  { id: 'Dampak', en: 'Impact' },
  'problem.2.title':  { id: 'Layanan Publik yang Lebih Lambat', en: 'Slower Public Service Delivery' },
  'problem.2.desc':   { id: 'Keputusan membutuhkan waktu lebih lama karena konteks hilang. Staf menghabiskan jam kerja pada tugas administratif yang berulang.', en: 'Decisions take longer because context is lost. Staff spend working hours on repetitive administrative tasks.' },
  'problem.3.label':  { id: 'Solusi', en: 'Solution' },
  'problem.3.title':  { id: 'ARIA: Inteligensi Eksekutif yang Terpusat', en: 'ARIA: Centralized Executive Intelligence' },
  'problem.3.desc':   { id: 'ARIA menangkap, menyusun, dan mengamankan informasi secara otomatis — tanpa menambah beban kerja tim Anda.', en: 'ARIA automatically captures, structures, and secures information — without adding to your team\'s workload.' },

  // --- FEATURES ---
  'features.label':   { id: 'Kapabilitas Utama', en: 'Core Capabilities' },
  'features.title':   { id: 'Apa yang ARIA Lakukan', en: 'What ARIA Does' },
  'feat.meeting.title': { id: 'Meeting Intelligence',    en: 'Meeting Intelligence' },
  'feat.meeting.desc':  { id: 'Mengubah percakapan rapat menjadi notulen resmi, keputusan, dan tindak lanjut secara otomatis.', en: 'Converts meeting conversations into structured minutes, decisions, and follow-up actions automatically.' },
  'feat.knowledge.title': { id: 'Knowledge Management', en: 'Knowledge Management' },
  'feat.knowledge.desc':  { id: 'Membangun basis pengetahuan institusional yang dapat dicari dan terus berkembang.', en: 'Builds a searchable, continuously growing institutional knowledge base.' },
  'feat.document.title': { id: 'Document Automation',   en: 'Document Automation' },
  'feat.document.desc':  { id: 'Mempercepat pembuatan dokumen administrasi menggunakan konteks organisasi secara langsung.', en: 'Accelerates administrative document creation using your organization\'s context directly.' },
  'feat.workspace.title': { id: 'AI Workspace',         en: 'AI Workspace' },
  'feat.workspace.desc':  { id: 'Antarmuka terpusat dan aman untuk semua tugas berbantuan AI di seluruh organisasi.', en: 'A centralized, secure interface for all AI-assisted tasks across your organization.' },

  // --- BENEFITS ---
  'benefits.label':   { id: 'Dampak Nyata', en: 'Real Impact' },
  'benefits.title':   { id: 'Mengapa Tim Memilih ARIA', en: 'Why Teams Choose ARIA' },
  'benefit.1.stat':   { id: '80%', en: '80%' },
  'benefit.1.title':  { id: 'Pengurangan Dokumentasi Manual', en: 'Less Manual Documentation' },
  'benefit.1.desc':   { id: 'Notulen, ringkasan, dan tindak lanjut rapat dibuat otomatis — tidak perlu pekerjaan manual.', en: 'Meeting minutes, summaries, and follow-ups are created automatically — no manual work needed.' },
  'benefit.2.stat':   { id: '100%', en: '100%' },
  'benefit.2.title':  { id: 'Keputusan Terlacak', en: 'Decisions Tracked' },
  'benefit.2.desc':   { id: 'Setiap keputusan penting tercatat dan dapat dicari kembali kapan saja oleh siapa saja di tim.', en: 'Every key decision is recorded and searchable at any time by anyone on the team.' },
  'benefit.3.stat':   { id: '∞', en: '∞' },
  'benefit.3.title':  { id: 'Pengetahuan yang Bertahan', en: 'Outliving Knowledge' },
  'benefit.3.desc':   { id: 'Pengetahuan institusional tidak hilang ketika anggota tim berganti — tersimpan permanen di ARIA.', en: 'Institutional knowledge does not disappear when team members change — permanently stored in ARIA.' },

  // --- ECOSYSTEM ---
  'ecosystem.label':       { id: 'Ekosistem', en: 'Ecosystem' },
  'ecosystem.title':       { id: 'Produk kat.on', en: 'kat.on Products' },
  'ecosystem.aria.badge':  { id: 'Produk Unggulan', en: 'Flagship Product' },
  'ecosystem.aria.desc':   { id: 'Asisten Eksekutif AI untuk Sektor Publik.', en: 'AI Executive Assistant for the Public Sector.' },
  'ecosystem.aria.cta':    { id: 'Jelajahi ARIA', en: 'Explore ARIA' },
  'ecosystem.kcc.badge':   { id: 'Platform Internal', en: 'Internal Platform' },
  'ecosystem.kcc.desc':    { id: 'Pusat komando pengetahuan dan standar rekayasa kat.on.', en: 'kat.on knowledge and engineering standards command center.' },
  'ecosystem.kcc.cta':     { id: 'Akses Internal', en: 'Internal Access' },
  'ecosystem.future.badge':{ id: 'Segera Hadir', en: 'Coming Soon' },
  'ecosystem.future.title':{ id: 'Produk Masa Depan', en: 'Future Products' },
  'ecosystem.future.desc': { id: 'Ekosistem AI yang terus berkembang untuk layanan publik.', en: 'A continuously expanding AI ecosystem for public service.' },
  'ecosystem.future.cta':  { id: 'Lihat Roadmap', en: 'View Roadmap' },

  // --- JOURNEY ---
  'journey.label': { id: 'Perjalanan', en: 'Journey' },
  'journey.title': { id: 'Dari Ide ke Produk', en: 'From Idea to Product' },

  // --- CTA ---
  'cta.title':    { id: 'Mari membangun masa depan bersama.', en: 'Let\'s build the future together.' },
  'cta.sub':      { id: 'Kami terbuka untuk kolaborasi, kemitraan pemerintah, dan program percontohan.', en: 'We are open to collaboration, government partnerships, and pilot programs.' },
  'cta.github':   { id: 'GitHub', en: 'GitHub' },
  'cta.linkedin': { id: 'LinkedIn', en: 'LinkedIn' },
  'cta.email':    { id: 'Mulai Percakapan', en: 'Initiate Conversation' },

  // --- FOOTER ---
  'footer.tagline':   { id: 'AI-Native Product Studio untuk Sektor Publik.', en: 'AI-Native Product Studio for the Public Sector.' },
  'footer.products':  { id: 'Produk', en: 'Products' },
  'footer.company':   { id: 'Perusahaan', en: 'Company' },
  'footer.resources': { id: 'Sumber Daya', en: 'Resources' },
  'footer.social':    { id: 'Sosial', en: 'Social' },
  'footer.about':     { id: 'Tentang', en: 'About' },
  'footer.contact':   { id: 'Kemitraan', en: 'Partnerships' },
  'footer.docs':      { id: 'Dokumentasi', en: 'Documentation' },
  'footer.roadmap':   { id: 'Roadmap', en: 'Roadmap' },
  'footer.copyright': { id: 'Hak cipta dilindungi.', en: 'All rights reserved.' },
} satisfies Record<string, { id: string; en: string }>;

export type TKey = keyof typeof t;

/** Helper: get translation for a specific key and lang */
export function translate(key: TKey, lang: Lang): string {
  return t[key][lang] ?? t[key]['id'];
}
