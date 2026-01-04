export interface FAQItem {
  q: string;
  a: string;
}

export interface ProcessStep {
  title: string;
  desc: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface WhyUsItem {
  title: string;
  description: string;
}

export interface Dictionary {
  nav: {
    about: string;
    whatWeDo: string;
    models: string;
    blog: string;
    apply: string;
    applyMobile: string;
    selectLang: string;
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
    back: string;
    published: string;
    cta: {
      title: string;
      text: string;
    };
  };
  hero: {
    scroll: string;
  };
  home: {
    process: {
      title: string;
      subtitle: string;
      steps: ProcessStep[];
    };
    faq: {
      title: string;
      subtitle: string;
      items: FAQItem[];
    };
  };
  stats: {
    ranking: string;
    support: string;
    discretion: string;
  };
  about: {
    title: string;
    headline: string;
    text1: string;
    text2: string;
    signature: string;
    backToHome: string;
  };
  whatWeDoPage: {
    title: string;
    subtitle: string;
    introHeadline: string;
    introText: string;
    services: ServiceItem[];
    whyUsTitle: string;
    whyUs: WhyUsItem[];
    cta: string;
  };
  modelsPage: {
    title: string;
    subtitle: string;
    backToHome: string;
  };
  services: {
    title: string;
    card1: { title: string; desc: string };
    card2: { title: string; desc: string };
    card3: { title: string; desc: string };
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    instagram: string;
    age: string;
    status: string;
    selectStatus: string;
    statusOptions: {
      beginner: string;
      experienced: string;
      pro: string;
    };
    photo: string;
    photoHelp: string;
    photoPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    confirmAdult: string;
    submit: string;
    privacy: string;
    successTitle: string;
    successText: string;
    back: string;
  };
  footer: {
    rights: string;
    slogan: string;
    cols: {
      company: string;
      legal: string;
      socials: string;
    };
    links: {
      home: string;
      about: string;
      whatWeDo: string;
      models: string;
      apply: string;
      impressum: string;
      privacy: string;
    };
  };
  impressumPage: {
    title: string;
    subtitle: string;
    sections: Array<{ title: string; content: string }>;
  };
  privacyPage: {
    title: string;
    subtitle: string;
    updated: string;
    intro: string;
    sections: Array<{ title: string; content: string }>;
  };
  notFound: {
    title: string;
  };
}
