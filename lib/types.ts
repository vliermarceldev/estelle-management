export interface FAQItem {
  q: string;
  a: string;
}

export interface Dictionary {
  nav: Record<string, string>;
  home: {
    process: {
      title: string;
      subtitle: string;
      steps: Array<{ title: string; desc: string }>;
    };
    faq: {
      title: string;
      subtitle: string;
      items: FAQItem[];
    };
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
    // Fallback für optionale Felder
    [key: string]: any;
  };
  about: {
    text1: string;
    [key: string]: any;
  };
  // Erlaube Erweiterungen für andere Keys
  [key: string]: any;
}
