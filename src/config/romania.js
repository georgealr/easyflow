// Configurare pentru România
const ROMANIA_CONFIG = {
  // Moneda
  currency: 'LEI',
  currencySymbol: 'LEI',
  
  // Limba
  language: 'ro',
  locale: 'ro-RO',
  
  // Prețuri (în lei)
  pricing: {
    free: { price: 0, label: 'Gratuit' },
    pro: { price: 69, label: 'Pro' },
    business: { price: 189, label: 'Business' },
    enterprise: { price: 499, label: 'Enterprise' }
  },
  
  // Contacte România
  contact: {
    phone: '+40 21 123 4567',
    email: 'contact@easyflow.ro',
    support: 'suport@easyflow.ro',
    address: 'București, România'
  },
  
  // Texte specifice României
  texts: {
    hero: {
      title: 'Creează Site-ul Perfect în Câteva Minute',
      subtitle: 'Alătură-te milioanelor de români care folosesc EasyFlow pentru a crea site-uri profesionale și moderne.',
      cta: 'Începe Gratuit'
    },
    features: {
      title: 'Tot ce ai nevoie pentru succes',
      subtitle: 'Funcționalități puternice create să te ajute să creezi site-uri profesionale care transformă vizitatorii în clienți.'
    },
    pricing: {
      title: 'Alege planul potrivit',
      subtitle: 'Începe gratuit, upgrade când ai nevoie de mai multe funcții',
      popular: 'Cel Mai Popular'
    },
    cta: {
      title: 'Pregătit să-ți construiești site-ul?',
      subtitle: 'Alătură-te milioanelor de români care au ales EasyFlow pentru prezența lor online',
      button: 'Începe Construirea Acum'
    }
  },
  
  // Template-uri românești
  templateCategories: [
    { id: 'business', name: 'Business', description: 'Pentru companii și afaceri românești' },
    { id: 'restaurant', name: 'Restaurant', description: 'Pentru restaurante și localuri' },
    { id: 'medical', name: 'Medical', description: 'Pentru cabinete și clinici medicale' },
    { id: 'beauty', name: 'Frumusețe', description: 'Pentru saloane și centre de înfrumusețare' },
    { id: 'education', name: 'Educație', description: 'Pentru școli și centre de învățământ' },
    { id: 'legal', name: 'Juridic', description: 'Pentru cabinete de avocatură' },
    { id: 'real-estate', name: 'Imobiliare', description: 'Pentru agenții imobiliare' },
    { id: 'automotive', name: 'Auto', description: 'Pentru service-uri și dealerships auto' }
  ],
  
  // Industrii românești populare
  industries: [
    'Agricultura',
    'Turism',
    'IT & Software',
    'Construcții',
    'Manufactura',
    'Servicii Financiare',
    'Retail',
    'Sănătate',
    'Educație',
    'Transport & Logistică'
  ],
  
  // Județe României pentru targeting local
  counties: [
    'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrița-Năsăud',
    'Botoșani', 'Brașov', 'Brăila', 'București', 'Buzău', 'Caraș-Severin',
    'Călărași', 'Cluj', 'Constanța', 'Covasna', 'Dâmbovița', 'Dolj',
    'Galați', 'Giurgiu', 'Gorj', 'Harghita', 'Hunedoara', 'Ialomița',
    'Iași', 'Ilfov', 'Maramureș', 'Mehedinți', 'Mureș', 'Neamț',
    'Olt', 'Prahova', 'Satu Mare', 'Sălaj', 'Sibiu', 'Suceava',
    'Teleorman', 'Timiș', 'Tulcea', 'Vaslui', 'Vâlcea', 'Vrancea'
  ],
  
  // Funcționalități specifice României
  features: {
    gdpr: 'Conform GDPR',
    localSupport: 'Suport în română 24/7',
    localPayments: 'Plăți în lei românești',
    seoRomania: 'SEO optimizat pentru România',
    mobilFirst: 'Design mobile-first',
    fastLoading: 'Încărcare rapidă'
  }
};

export default ROMANIA_CONFIG;
