// Platform vertical definitions for VyaparPe Super-App

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;        // Primary gradient color
  colorEnd: string;     // Gradient end color
  categories: { id: string; name: string; icon: string; slug: string }[];
  heroOffers: { id: number; title: string; description: string; bgColor: string; link: string }[];
  subCategories?: { name: string; icon: string; slug: string }[];
}

export const platforms: Platform[] = [
  {
    id: 'vyaparpe',
    name: 'VyaparPe',
    icon: '🛒',
    color: '#2874f0',
    colorEnd: '#1e5fc9',
    categories: [
      { id: 'home', name: 'For You', icon: '🏠', slug: '' },
      { id: 'electronics', name: 'Electronics', icon: '💻', slug: 'Electronics' },
      { id: 'fashion', name: 'Fashion', icon: '👕', slug: 'Fashion' },
      { id: 'grocery', name: 'Groceries', icon: '🛒', slug: 'Groceries' },
      { id: 'appliances', name: 'Home & Kitchen', icon: '🧺', slug: 'Home & Kitchen' },
      { id: 'beauty', name: 'Beauty', icon: '💄', slug: 'Beauty' },
      { id: 'sports', name: 'Sports', icon: '⚽', slug: 'Sports' },
      { id: 'books', name: 'Books', icon: '📚', slug: 'Books' },
      { id: 'toys', name: 'Toys', icon: '🎲', slug: 'Toys' },
      { id: 'jewelry', name: 'Jewelry', icon: '💎', slug: 'Jewelry' },
      { id: 'health', name: 'Health', icon: '💊', slug: 'Health' },
      { id: 'baby', name: 'Baby & Kids', icon: '👶', slug: 'Baby & Kids' },
      { id: 'automotive', name: 'Automotive', icon: '🚗', slug: 'Automotive' },
      { id: 'furniture', name: 'Furniture', icon: '🛋️', slug: 'Furniture' },
    ],
    heroOffers: [
      { id: 1, title: "Big Diwali Sale - Flat 50% Off", description: "Upgrade your electronics with our biggest sale of the year.", bgColor: "linear-gradient(135deg, #2874f0 0%, #1e5fc9 100%)", link: "/deals" },
      { id: 2, title: "New Arrivals in Fashion", description: "Explore the latest trends and styles. Handpicked collections.", bgColor: "linear-gradient(135deg, #ff6161 0%, #e53935 100%)", link: "/products" },
      { id: 3, title: "Super Saver Grocery Deals", description: "Get up to 30% off on monthly groceries and daily essentials.", bgColor: "linear-gradient(135deg, #ff9f00 0%, #e89100 100%)", link: "/products" },
    ],
    subCategories: [
      { name: 'Mobiles', icon: '📱', slug: 'Electronics' },
      { name: 'Laptops', icon: '💻', slug: 'Electronics' },
      { name: 'Watches', icon: '⌚', slug: 'Fashion' },
      { name: 'Shoes', icon: '👟', slug: 'Fashion' },
      { name: 'T-Shirts', icon: '👕', slug: 'Fashion' },
      { name: 'Headphones', icon: '🎧', slug: 'Electronics' },
      { name: 'Cameras', icon: '📷', slug: 'Electronics' },
      { name: 'Skincare', icon: '🧴', slug: 'Beauty' },
    ],
  },
  {
    id: 'quick-commerce',
    name: 'Quick',
    icon: '⚡',
    color: '#00c853',
    colorEnd: '#009624',
    categories: [
      { id: 'qc-all', name: 'For You', icon: '⚡', slug: '' },
      { id: 'qc-fruits', name: 'Fruits', icon: '🍎', slug: 'Fruits' },
      { id: 'qc-veggies', name: 'Vegetables', icon: '🥬', slug: 'Vegetables' },
      { id: 'qc-dairy', name: 'Dairy', icon: '🥛', slug: 'Dairy' },
      { id: 'qc-snacks', name: 'Snacks', icon: '🍿', slug: 'Snacks' },
      { id: 'qc-beverages', name: 'Beverages', icon: '🥤', slug: 'Beverages' },
      { id: 'qc-personal', name: 'Personal Care', icon: '🧴', slug: 'Personal Care' },
      { id: 'qc-cleaning', name: 'Cleaning', icon: '🧹', slug: 'Cleaning' },
      { id: 'qc-baby', name: 'Baby Care', icon: '🍼', slug: 'Baby Care' },
      { id: 'qc-meat', name: 'Meat & Fish', icon: '🥩', slug: 'Meat & Fish' },
    ],
    heroOffers: [
      { id: 201, title: "10-Minute Delivery", description: "Fresh groceries at your door in under 10 minutes!", bgColor: "linear-gradient(135deg, #00c853 0%, #009624 100%)", link: "/products?platform=quick-commerce" },
      { id: 202, title: "Daily Essentials Pack", description: "Milk, bread, eggs & more - delivered fresh every morning.", bgColor: "linear-gradient(135deg, #43a047 0%, #1b5e20 100%)", link: "/products?platform=quick-commerce" },
    ],
    subCategories: [
      { name: 'Atta & Rice', icon: '🌾', slug: 'Staples' },
      { name: 'Oil & Ghee', icon: '🫒', slug: 'Cooking' },
      { name: 'Spices', icon: '🌶️', slug: 'Spices' },
      { name: 'Bread & Bakery', icon: '🍞', slug: 'Bakery' },
      { name: 'Chips', icon: '🍟', slug: 'Snacks' },
      { name: 'Ice Cream', icon: '🍦', slug: 'Frozen' },
      { name: 'Tea & Coffee', icon: '☕', slug: 'Beverages' },
      { name: 'Biscuits', icon: '🍪', slug: 'Snacks' },
    ],
  },
  {
    id: 'digital',
    name: 'Digital',
    icon: '💻',
    color: '#7c3aed',
    colorEnd: '#5b21b6',
    categories: [
      { id: 'dg-all', name: 'For You', icon: '💻', slug: '' },
      { id: 'dg-software', name: 'Software', icon: '🖥️', slug: 'Software' },
      { id: 'dg-courses', name: 'Courses', icon: '🎓', slug: 'Courses' },
      { id: 'dg-ebooks', name: 'E-Books', icon: '📖', slug: 'E-Books' },
      { id: 'dg-templates', name: 'Templates', icon: '📄', slug: 'Templates' },
      { id: 'dg-graphics', name: 'Graphics', icon: '🎨', slug: 'Graphics' },
      { id: 'dg-music', name: 'Music', icon: '🎵', slug: 'Music' },
      { id: 'dg-stock', name: 'Stock Photos', icon: '📸', slug: 'Stock Photos' },
      { id: 'dg-plugins', name: 'Plugins', icon: '🔌', slug: 'Plugins' },
    ],
    heroOffers: [
      { id: 301, title: "Learn & Grow Sale", description: "Premium courses at 70% off. Upskill today!", bgColor: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)", link: "/products?platform=digital" },
      { id: 302, title: "Software Mega Bundle", description: "Get 5 premium tools for the price of 1.", bgColor: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)", link: "/products?platform=digital" },
    ],
    subCategories: [
      { name: 'Web Dev', icon: '🌐', slug: 'Courses' },
      { name: 'AI & ML', icon: '🤖', slug: 'Courses' },
      { name: 'Design', icon: '✏️', slug: 'Courses' },
      { name: 'MS Office', icon: '📊', slug: 'Software' },
      { name: 'Antivirus', icon: '🛡️', slug: 'Software' },
      { name: 'Notion', icon: '📝', slug: 'Templates' },
      { name: 'Resume', icon: '📋', slug: 'Templates' },
      { name: 'Canva Packs', icon: '🎨', slug: 'Graphics' },
    ],
  },
  {
    id: 'vyaparplay',
    name: 'Play',
    icon: '🎬',
    color: '#e11d48',
    colorEnd: '#9f1239',
    categories: [
      { id: 'vp-all', name: 'For You', icon: '🎬', slug: '' },
      { id: 'vp-live', name: 'Live Classes', icon: '🔴', slug: 'Live' },
      { id: 'vp-recorded', name: 'Recorded', icon: '▶️', slug: 'Recorded' },
      { id: 'vp-exam', name: 'Exam Prep', icon: '📝', slug: 'Exam Prep' },
      { id: 'vp-skill', name: 'Skill Dev', icon: '🎯', slug: 'Skill Dev' },
      { id: 'vp-entertainment', name: 'Entertainment', icon: '🎭', slug: 'Entertainment' },
      { id: 'vp-kids', name: 'Kids', icon: '👦', slug: 'Kids' },
      { id: 'vp-fitness', name: 'Fitness', icon: '🏋️', slug: 'Fitness' },
    ],
    heroOffers: [
      { id: 401, title: "Live Classes Start Now", description: "Join 10,000+ students in live interactive sessions.", bgColor: "linear-gradient(135deg, #e11d48 0%, #9f1239 100%)", link: "/products?platform=vyaparplay" },
      { id: 402, title: "All-Access Pass ₹499/month", description: "Unlimited courses, live classes, and downloads.", bgColor: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)", link: "/products?platform=vyaparplay" },
    ],
    subCategories: [
      { name: 'JEE', icon: '🧪', slug: 'Exam Prep' },
      { name: 'NEET', icon: '⚕️', slug: 'Exam Prep' },
      { name: 'UPSC', icon: '🏛️', slug: 'Exam Prep' },
      { name: 'Coding', icon: '💻', slug: 'Skill Dev' },
      { name: 'English', icon: '🗣️', slug: 'Skill Dev' },
      { name: 'Movies', icon: '🎬', slug: 'Entertainment' },
      { name: 'Yoga', icon: '🧘', slug: 'Fitness' },
      { name: 'Drawing', icon: '🎨', slug: 'Kids' },
    ],
  },
  {
    id: 'vyaparfood',
    name: 'Food',
    icon: '🍕',
    color: '#ea580c',
    colorEnd: '#c2410c',
    categories: [
      { id: 'vf-all', name: 'For You', icon: '🍕', slug: '' },
      { id: 'vf-restaurant', name: 'Restaurants', icon: '🍽️', slug: 'Restaurants' },
      { id: 'vf-cloud', name: 'Cloud Kitchen', icon: '👨‍🍳', slug: 'Cloud Kitchen' },
      { id: 'vf-homemade', name: 'Homemade', icon: '🏠', slug: 'Homemade' },
      { id: 'vf-desserts', name: 'Desserts', icon: '🍰', slug: 'Desserts' },
      { id: 'vf-healthy', name: 'Healthy', icon: '🥗', slug: 'Healthy' },
      { id: 'vf-biryani', name: 'Biryani', icon: '🍚', slug: 'Biryani' },
      { id: 'vf-pizza', name: 'Pizza', icon: '🍕', slug: 'Pizza' },
    ],
    heroOffers: [
      { id: 501, title: "60% Off on First Order", description: "Order from top restaurants near you. Use code VYAPARFOOD60.", bgColor: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)", link: "/products?platform=vyaparfood" },
      { id: 502, title: "Free Delivery All Day", description: "No minimum order. Hot food delivered fresh.", bgColor: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", link: "/products?platform=vyaparfood" },
    ],
    subCategories: [
      { name: 'Burger', icon: '🍔', slug: 'Fast Food' },
      { name: 'Chinese', icon: '🥡', slug: 'Chinese' },
      { name: 'South Indian', icon: '🫓', slug: 'South Indian' },
      { name: 'North Indian', icon: '🍛', slug: 'North Indian' },
      { name: 'Ice Cream', icon: '🍦', slug: 'Desserts' },
      { name: 'Cakes', icon: '🎂', slug: 'Desserts' },
      { name: 'Rolls', icon: '🌯', slug: 'Street Food' },
      { name: 'Momos', icon: '🥟', slug: 'Street Food' },
    ],
  },
  {
    id: 'services',
    name: 'Services',
    icon: '🛠️',
    color: '#0891b2',
    colorEnd: '#0e7490',
    categories: [
      { id: 'sv-all', name: 'For You', icon: '🛠️', slug: '' },
      { id: 'sv-repair', name: 'Home Repair', icon: '🔧', slug: 'Home Repair' },
      { id: 'sv-salon', name: 'Salon', icon: '💇', slug: 'Salon' },
      { id: 'sv-cleaning', name: 'Cleaning', icon: '🧹', slug: 'Cleaning' },
      { id: 'sv-packers', name: 'Packers', icon: '📦', slug: 'Packers' },
      { id: 'sv-electrician', name: 'Electrician', icon: '⚡', slug: 'Electrician' },
      { id: 'sv-plumber', name: 'Plumber', icon: '🚿', slug: 'Plumber' },
      { id: 'sv-tutor', name: 'Tutor', icon: '📚', slug: 'Tutor' },
      { id: 'sv-pest', name: 'Pest Control', icon: '🐛', slug: 'Pest Control' },
    ],
    heroOffers: [
      { id: 601, title: "Home Services @ 40% Off", description: "Professional cleaning, repair, and salon at your doorstep.", bgColor: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)", link: "/products?platform=services" },
      { id: 602, title: "AC Service Starting ₹399", description: "Trusted technicians, 90-day warranty on all services.", bgColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", link: "/products?platform=services" },
    ],
    subCategories: [
      { name: 'AC Repair', icon: '❄️', slug: 'Home Repair' },
      { name: 'Painting', icon: '🎨', slug: 'Home Repair' },
      { name: 'Haircut', icon: '✂️', slug: 'Salon' },
      { name: 'Facial', icon: '💆', slug: 'Salon' },
      { name: 'Bathroom', icon: '🚽', slug: 'Cleaning' },
      { name: 'Carpenter', icon: '🪚', slug: 'Home Repair' },
      { name: 'CCTV', icon: '📹', slug: 'Electrician' },
      { name: 'Math Tutor', icon: '📐', slug: 'Tutor' },
    ],
  },
];

export function getPlatformById(id: string): Platform {
  return platforms.find(p => p.id === id) || platforms[0];
}

export function getPlatformCategories(platformId: string) {
  return getPlatformById(platformId).categories;
}

export function getPlatformHeroOffers(platformId: string) {
  return getPlatformById(platformId).heroOffers;
}

export function getPlatformSubCategories(platformId: string) {
  return getPlatformById(platformId).subCategories || [];
}
