// Platform vertical definitions for VyaparPe Super-App
// 3-Level Hierarchy: Platform → Category → SubCategory

export interface SubCategory {
  name: string;
  icon: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  subCategories?: SubCategory[];
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  colorEnd: string;
  categories: Category[];
  heroOffers: { id: number; title: string; description: string; bgColor: string; link: string }[];
}

export const platforms: Platform[] = [
  // ═══════════════════════════════════════════════════
  // 🛒 VYAPARPE — Main Marketplace
  // ═══════════════════════════════════════════════════
  {
    id: 'vyaparpe',
    name: 'VyaparPe',
    icon: '🛒',
    color: '#2874f0',
    colorEnd: '#1e5fc9',
    categories: [
      { id: 'home', name: 'For You', icon: '🏠', slug: '' },
      {
        id: 'electronics', name: 'Electronics', icon: '💻', slug: 'Electronics',
        subCategories: [
          { name: 'Mobiles', icon: '📱', slug: 'Mobiles' },
          { name: 'Laptops', icon: '💻', slug: 'Laptops' },
          { name: 'Tablets', icon: '📲', slug: 'Tablets' },
          { name: 'TVs', icon: '📺', slug: 'TVs' },
          { name: 'Audio', icon: '🎧', slug: 'Audio' },
          { name: 'Cameras', icon: '📷', slug: 'Cameras' },
          { name: 'Wearables', icon: '⌚', slug: 'Wearables' },
          { name: 'Gaming', icon: '🎮', slug: 'Gaming' },
          { name: 'Printers', icon: '🖨️', slug: 'Printers' },
          { name: 'Storage', icon: '💾', slug: 'Storage' },
          { name: 'Networking', icon: '📡', slug: 'Networking' },
          { name: 'Accessories', icon: '🔌', slug: 'Accessories' },
        ],
      },
      {
        id: 'fashion', name: 'Fashion', icon: '👕', slug: 'Fashion',
        subCategories: [
          { name: 'Men T-Shirts', icon: '👕', slug: 'Men T-Shirts' },
          { name: 'Women Tops', icon: '👚', slug: 'Women Tops' },
          { name: 'Jeans', icon: '👖', slug: 'Jeans' },
          { name: 'Dresses', icon: '👗', slug: 'Dresses' },
          { name: 'Sarees', icon: '🥻', slug: 'Sarees' },
          { name: 'Kurtas', icon: '👘', slug: 'Kurtas' },
          { name: 'Shoes', icon: '👟', slug: 'Shoes' },
          { name: 'Watches', icon: '⌚', slug: 'Watches' },
          { name: 'Sunglasses', icon: '🕶️', slug: 'Sunglasses' },
          { name: 'Bags', icon: '👜', slug: 'Bags' },
          { name: 'Jewellery', icon: '💍', slug: 'Jewellery' },
          { name: 'Innerwear', icon: '🩳', slug: 'Innerwear' },
          { name: 'Kids Wear', icon: '👶', slug: 'Kids Wear' },
          { name: 'Ethnic Wear', icon: '🎎', slug: 'Ethnic Wear' },
        ],
      },
      {
        id: 'grocery', name: 'Groceries', icon: '🛒', slug: 'Groceries',
        subCategories: [
          { name: 'Atta & Rice', icon: '🌾', slug: 'Atta & Rice' },
          { name: 'Dal & Pulses', icon: '🫘', slug: 'Dal & Pulses' },
          { name: 'Oil & Ghee', icon: '🫒', slug: 'Oil & Ghee' },
          { name: 'Spices', icon: '🌶️', slug: 'Spices' },
          { name: 'Snacks', icon: '🍿', slug: 'Snacks' },
          { name: 'Beverages', icon: '🥤', slug: 'Beverages' },
          { name: 'Dairy', icon: '🥛', slug: 'Dairy' },
          { name: 'Fruits', icon: '🍎', slug: 'Fruits' },
          { name: 'Vegetables', icon: '🥬', slug: 'Vegetables' },
          { name: 'Bakery', icon: '🍞', slug: 'Bakery' },
          { name: 'Frozen Food', icon: '🧊', slug: 'Frozen Food' },
          { name: 'Dry Fruits', icon: '🥜', slug: 'Dry Fruits' },
        ],
      },
      {
        id: 'appliances', name: 'Home & Kitchen', icon: '🧺', slug: 'Home & Kitchen',
        subCategories: [
          { name: 'Washing Machine', icon: '🧺', slug: 'Washing Machine' },
          { name: 'Refrigerator', icon: '❄️', slug: 'Refrigerator' },
          { name: 'AC', icon: '🌡️', slug: 'AC' },
          { name: 'Microwave', icon: '♨️', slug: 'Microwave' },
          { name: 'Mixer Grinder', icon: '🫙', slug: 'Mixer Grinder' },
          { name: 'Iron', icon: '🧹', slug: 'Iron' },
          { name: 'Vacuum Cleaner', icon: '🧹', slug: 'Vacuum Cleaner' },
          { name: 'Water Purifier', icon: '💧', slug: 'Water Purifier' },
          { name: 'Cookware', icon: '🍳', slug: 'Cookware' },
          { name: 'Bedsheets', icon: '🛏️', slug: 'Bedsheets' },
          { name: 'Curtains', icon: '🪟', slug: 'Curtains' },
          { name: 'Decor', icon: '🏺', slug: 'Decor' },
        ],
      },
      {
        id: 'beauty', name: 'Beauty', icon: '💄', slug: 'Beauty',
        subCategories: [
          { name: 'Skincare', icon: '🧴', slug: 'Skincare' },
          { name: 'Makeup', icon: '💄', slug: 'Makeup' },
          { name: 'Haircare', icon: '💇', slug: 'Haircare' },
          { name: 'Fragrances', icon: '🌸', slug: 'Fragrances' },
          { name: 'Men Grooming', icon: '🧔', slug: 'Men Grooming' },
          { name: 'Bath & Body', icon: '🛁', slug: 'Bath & Body' },
          { name: 'Nail Art', icon: '💅', slug: 'Nail Art' },
          { name: 'Beauty Tools', icon: '✂️', slug: 'Beauty Tools' },
        ],
      },
      {
        id: 'sports', name: 'Sports', icon: '⚽', slug: 'Sports',
        subCategories: [
          { name: 'Cricket', icon: '🏏', slug: 'Cricket' },
          { name: 'Football', icon: '⚽', slug: 'Football' },
          { name: 'Badminton', icon: '🏸', slug: 'Badminton' },
          { name: 'Running', icon: '🏃', slug: 'Running' },
          { name: 'Gym Equipment', icon: '🏋️', slug: 'Gym Equipment' },
          { name: 'Yoga', icon: '🧘', slug: 'Yoga' },
          { name: 'Cycling', icon: '🚴', slug: 'Cycling' },
          { name: 'Swimming', icon: '🏊', slug: 'Swimming' },
          { name: 'Sports Wear', icon: '👟', slug: 'Sports Wear' },
          { name: 'Supplements', icon: '💪', slug: 'Supplements' },
        ],
      },
      {
        id: 'books', name: 'Books', icon: '📚', slug: 'Books',
        subCategories: [
          { name: 'Fiction', icon: '📖', slug: 'Fiction' },
          { name: 'Non-Fiction', icon: '📕', slug: 'Non-Fiction' },
          { name: 'Academic', icon: '🎓', slug: 'Academic' },
          { name: 'Children', icon: '📚', slug: 'Children' },
          { name: 'Comics', icon: '💬', slug: 'Comics' },
          { name: 'Self Help', icon: '🧠', slug: 'Self Help' },
          { name: 'Competitive', icon: '📝', slug: 'Competitive' },
          { name: 'Religious', icon: '📿', slug: 'Religious' },
        ],
      },
      {
        id: 'toys', name: 'Toys', icon: '🎲', slug: 'Toys',
        subCategories: [
          { name: 'Action Figures', icon: '🦸', slug: 'Action Figures' },
          { name: 'Board Games', icon: '🎲', slug: 'Board Games' },
          { name: 'Dolls', icon: '🎎', slug: 'Dolls' },
          { name: 'Building Blocks', icon: '🧱', slug: 'Building Blocks' },
          { name: 'Remote Control', icon: '🎮', slug: 'Remote Control' },
          { name: 'Educational', icon: '🔬', slug: 'Educational' },
          { name: 'Outdoor', icon: '🛝', slug: 'Outdoor' },
          { name: 'Puzzles', icon: '🧩', slug: 'Puzzles' },
        ],
      },
      {
        id: 'jewelry', name: 'Jewelry', icon: '💎', slug: 'Jewelry',
        subCategories: [
          { name: 'Gold', icon: '🥇', slug: 'Gold' },
          { name: 'Silver', icon: '🥈', slug: 'Silver' },
          { name: 'Diamond', icon: '💎', slug: 'Diamond' },
          { name: 'Earrings', icon: '✨', slug: 'Earrings' },
          { name: 'Necklaces', icon: '📿', slug: 'Necklaces' },
          { name: 'Rings', icon: '💍', slug: 'Rings' },
          { name: 'Bangles', icon: '⭕', slug: 'Bangles' },
          { name: 'Artificial', icon: '🌟', slug: 'Artificial' },
        ],
      },
      {
        id: 'health', name: 'Health', icon: '💊', slug: 'Health',
        subCategories: [
          { name: 'Vitamins', icon: '💊', slug: 'Vitamins' },
          { name: 'Protein', icon: '💪', slug: 'Protein' },
          { name: 'Ayurvedic', icon: '🌿', slug: 'Ayurvedic' },
          { name: 'Medical Devices', icon: '🩺', slug: 'Medical Devices' },
          { name: 'First Aid', icon: '🏥', slug: 'First Aid' },
          { name: 'Eye Care', icon: '👓', slug: 'Eye Care' },
          { name: 'Sexual Wellness', icon: '❤️', slug: 'Sexual Wellness' },
          { name: 'Baby Health', icon: '👶', slug: 'Baby Health' },
        ],
      },
      {
        id: 'baby', name: 'Baby & Kids', icon: '👶', slug: 'Baby & Kids',
        subCategories: [
          { name: 'Diapers', icon: '🧷', slug: 'Diapers' },
          { name: 'Baby Food', icon: '🍼', slug: 'Baby Food' },
          { name: 'Strollers', icon: '🚼', slug: 'Strollers' },
          { name: 'Toys 0-3', icon: '🧸', slug: 'Toys 0-3' },
          { name: 'Baby Care', icon: '🛁', slug: 'Baby Care' },
          { name: 'Clothing', icon: '👕', slug: 'Baby Clothing' },
          { name: 'School Bags', icon: '🎒', slug: 'School Bags' },
          { name: 'Feeding', icon: '🍶', slug: 'Feeding' },
        ],
      },
      {
        id: 'automotive', name: 'Automotive', icon: '🚗', slug: 'Automotive',
        subCategories: [
          { name: 'Car Care', icon: '🧽', slug: 'Car Care' },
          { name: 'Bike Accessories', icon: '🏍️', slug: 'Bike Accessories' },
          { name: 'Helmets', icon: '⛑️', slug: 'Helmets' },
          { name: 'Car Electronics', icon: '📻', slug: 'Car Electronics' },
          { name: 'Oils & Fluids', icon: '🛢️', slug: 'Oils & Fluids' },
          { name: 'Tyres', icon: '🛞', slug: 'Tyres' },
          { name: 'EV Accessories', icon: '🔋', slug: 'EV Accessories' },
          { name: 'GPS & Dash Cam', icon: '🗺️', slug: 'GPS & Dash Cam' },
        ],
      },
      {
        id: 'furniture', name: 'Furniture', icon: '🛋️', slug: 'Furniture',
        subCategories: [
          { name: 'Sofa', icon: '🛋️', slug: 'Sofa' },
          { name: 'Beds', icon: '🛏️', slug: 'Beds' },
          { name: 'Dining Table', icon: '🪑', slug: 'Dining Table' },
          { name: 'Study Table', icon: '🗄️', slug: 'Study Table' },
          { name: 'Wardrobe', icon: '🚪', slug: 'Wardrobe' },
          { name: 'Office Chair', icon: '💺', slug: 'Office Chair' },
          { name: 'Shoe Rack', icon: '👟', slug: 'Shoe Rack' },
          { name: 'Mattress', icon: '🛌', slug: 'Mattress' },
          { name: 'TV Unit', icon: '📺', slug: 'TV Unit' },
          { name: 'Bookshelf', icon: '📚', slug: 'Bookshelf' },
        ],
      },
    ],
    heroOffers: [
      { id: 1, title: "Big Diwali Sale - Flat 50% Off", description: "Upgrade your electronics with our biggest sale of the year.", bgColor: "linear-gradient(135deg, #2874f0 0%, #1e5fc9 100%)", link: "/deals" },
      { id: 2, title: "New Arrivals in Fashion", description: "Explore the latest trends and styles. Handpicked collections.", bgColor: "linear-gradient(135deg, #ff6161 0%, #e53935 100%)", link: "/products" },
      { id: 3, title: "Super Saver Grocery Deals", description: "Get up to 30% off on monthly groceries and daily essentials.", bgColor: "linear-gradient(135deg, #ff9f00 0%, #e89100 100%)", link: "/products" },
    ],
  },

  // ═══════════════════════════════════════════════════
  // ⚡ QUICK COMMERCE — 10-Min Delivery
  // ═══════════════════════════════════════════════════
  {
    id: 'quick-commerce',
    name: 'Quick',
    icon: '⚡',
    color: '#00c853',
    colorEnd: '#009624',
    categories: [
      { id: 'qc-all', name: 'For You', icon: '⚡', slug: '' },
      {
        id: 'qc-fruits', name: 'Fruits', icon: '🍎', slug: 'Fruits',
        subCategories: [
          { name: 'Apples', icon: '🍎', slug: 'Apples' },
          { name: 'Bananas', icon: '🍌', slug: 'Bananas' },
          { name: 'Mangoes', icon: '🥭', slug: 'Mangoes' },
          { name: 'Grapes', icon: '🍇', slug: 'Grapes' },
          { name: 'Oranges', icon: '🍊', slug: 'Oranges' },
          { name: 'Seasonal', icon: '🍈', slug: 'Seasonal' },
          { name: 'Exotic', icon: '🥝', slug: 'Exotic' },
          { name: 'Berries', icon: '🫐', slug: 'Berries' },
        ],
      },
      {
        id: 'qc-veggies', name: 'Vegetables', icon: '🥬', slug: 'Vegetables',
        subCategories: [
          { name: 'Leafy', icon: '🥬', slug: 'Leafy' },
          { name: 'Root Veggies', icon: '🥕', slug: 'Root Veggies' },
          { name: 'Onion & Tomato', icon: '🧅', slug: 'Onion & Tomato' },
          { name: 'Potatoes', icon: '🥔', slug: 'Potatoes' },
          { name: 'Exotic Veggies', icon: '🥦', slug: 'Exotic Veggies' },
          { name: 'Herbs', icon: '🌿', slug: 'Herbs' },
          { name: 'Frozen', icon: '🧊', slug: 'Frozen Veggies' },
        ],
      },
      {
        id: 'qc-dairy', name: 'Dairy', icon: '🥛', slug: 'Dairy',
        subCategories: [
          { name: 'Milk', icon: '🥛', slug: 'Milk' },
          { name: 'Curd', icon: '🥣', slug: 'Curd' },
          { name: 'Paneer', icon: '🧀', slug: 'Paneer' },
          { name: 'Butter', icon: '🧈', slug: 'Butter' },
          { name: 'Cheese', icon: '🧀', slug: 'Cheese' },
          { name: 'Ghee', icon: '🫙', slug: 'Ghee' },
          { name: 'Cream', icon: '🍦', slug: 'Cream' },
          { name: 'Eggs', icon: '🥚', slug: 'Eggs' },
        ],
      },
      {
        id: 'qc-snacks', name: 'Snacks', icon: '🍿', slug: 'Snacks',
        subCategories: [
          { name: 'Chips', icon: '🍟', slug: 'Chips' },
          { name: 'Biscuits', icon: '🍪', slug: 'Biscuits' },
          { name: 'Namkeen', icon: '🥨', slug: 'Namkeen' },
          { name: 'Chocolates', icon: '🍫', slug: 'Chocolates' },
          { name: 'Candy', icon: '🍬', slug: 'Candy' },
          { name: 'Instant Noodles', icon: '🍜', slug: 'Instant Noodles' },
          { name: 'Nuts & Seeds', icon: '🥜', slug: 'Nuts & Seeds' },
          { name: 'Popcorn', icon: '🍿', slug: 'Popcorn' },
        ],
      },
      {
        id: 'qc-beverages', name: 'Beverages', icon: '🥤', slug: 'Beverages',
        subCategories: [
          { name: 'Tea', icon: '☕', slug: 'Tea' },
          { name: 'Coffee', icon: '☕', slug: 'Coffee' },
          { name: 'Juices', icon: '🧃', slug: 'Juices' },
          { name: 'Soft Drinks', icon: '🥤', slug: 'Soft Drinks' },
          { name: 'Water', icon: '💧', slug: 'Water' },
          { name: 'Energy Drinks', icon: '⚡', slug: 'Energy Drinks' },
          { name: 'Milk Drinks', icon: '🥛', slug: 'Milk Drinks' },
          { name: 'Health Drinks', icon: '🍵', slug: 'Health Drinks' },
        ],
      },
      {
        id: 'qc-personal', name: 'Personal Care', icon: '🧴', slug: 'Personal Care',
        subCategories: [
          { name: 'Shampoo', icon: '🧴', slug: 'Shampoo' },
          { name: 'Soap', icon: '🧼', slug: 'Soap' },
          { name: 'Toothpaste', icon: '🪥', slug: 'Toothpaste' },
          { name: 'Face Wash', icon: '💆', slug: 'Face Wash' },
          { name: 'Deodorant', icon: '🌸', slug: 'Deodorant' },
          { name: 'Sanitary', icon: '🩹', slug: 'Sanitary' },
          { name: 'Hair Oil', icon: '💇', slug: 'Hair Oil' },
          { name: 'Razor & Blades', icon: '🪒', slug: 'Razor & Blades' },
        ],
      },
      {
        id: 'qc-cleaning', name: 'Cleaning', icon: '🧹', slug: 'Cleaning',
        subCategories: [
          { name: 'Detergent', icon: '🧺', slug: 'Detergent' },
          { name: 'Dish Wash', icon: '🍽️', slug: 'Dish Wash' },
          { name: 'Floor Cleaner', icon: '🧹', slug: 'Floor Cleaner' },
          { name: 'Toilet Cleaner', icon: '🚽', slug: 'Toilet Cleaner' },
          { name: 'Freshener', icon: '🌼', slug: 'Freshener' },
          { name: 'Mops & Brushes', icon: '🪣', slug: 'Mops & Brushes' },
        ],
      },
      {
        id: 'qc-meat', name: 'Meat & Fish', icon: '🥩', slug: 'Meat & Fish',
        subCategories: [
          { name: 'Chicken', icon: '🍗', slug: 'Chicken' },
          { name: 'Mutton', icon: '🥩', slug: 'Mutton' },
          { name: 'Fish', icon: '🐟', slug: 'Fish' },
          { name: 'Prawns', icon: '🦐', slug: 'Prawns' },
          { name: 'Eggs', icon: '🥚', slug: 'Eggs' },
          { name: 'Ready to Cook', icon: '🍖', slug: 'Ready to Cook' },
        ],
      },
      {
        id: 'qc-baby', name: 'Baby Care', icon: '🍼', slug: 'Baby Care',
        subCategories: [
          { name: 'Diapers', icon: '🧷', slug: 'Diapers' },
          { name: 'Baby Food', icon: '🍼', slug: 'Baby Food' },
          { name: 'Wipes', icon: '🧻', slug: 'Wipes' },
          { name: 'Baby Soap', icon: '🧼', slug: 'Baby Soap' },
          { name: 'Rash Cream', icon: '🧴', slug: 'Rash Cream' },
          { name: 'Feeding', icon: '🍶', slug: 'Feeding' },
        ],
      },
    ],
    heroOffers: [
      { id: 201, title: "10-Minute Delivery", description: "Fresh groceries at your door in under 10 minutes!", bgColor: "linear-gradient(135deg, #00c853 0%, #009624 100%)", link: "/products?platform=quick-commerce" },
      { id: 202, title: "Daily Essentials Pack", description: "Milk, bread, eggs & more - delivered fresh every morning.", bgColor: "linear-gradient(135deg, #43a047 0%, #1b5e20 100%)", link: "/products?platform=quick-commerce" },
    ],
  },

  // ═══════════════════════════════════════════════════
  // 💻 DIGITAL — Software, Courses, E-Books
  // ═══════════════════════════════════════════════════
  {
    id: 'digital',
    name: 'Digital',
    icon: '💻',
    color: '#7c3aed',
    colorEnd: '#5b21b6',
    categories: [
      { id: 'dg-all', name: 'For You', icon: '💻', slug: '' },
      {
        id: 'dg-software', name: 'Software', icon: '🖥️', slug: 'Software',
        subCategories: [
          { name: 'Antivirus', icon: '🛡️', slug: 'Antivirus' },
          { name: 'MS Office', icon: '📊', slug: 'MS Office' },
          { name: 'Adobe Suite', icon: '🎨', slug: 'Adobe Suite' },
          { name: 'VPN', icon: '🔒', slug: 'VPN' },
          { name: 'OS Licenses', icon: '🪟', slug: 'OS Licenses' },
          { name: 'Dev Tools', icon: '🛠️', slug: 'Dev Tools' },
          { name: 'Cloud Storage', icon: '☁️', slug: 'Cloud Storage' },
          { name: 'Editing Tools', icon: '✂️', slug: 'Editing Tools' },
        ],
      },
      {
        id: 'dg-courses', name: 'Courses', icon: '🎓', slug: 'Courses',
        subCategories: [
          { name: 'Web Dev', icon: '🌐', slug: 'Web Dev' },
          { name: 'App Dev', icon: '📱', slug: 'App Dev' },
          { name: 'AI & ML', icon: '🤖', slug: 'AI & ML' },
          { name: 'Data Science', icon: '📈', slug: 'Data Science' },
          { name: 'Design', icon: '✏️', slug: 'Design' },
          { name: 'Marketing', icon: '📢', slug: 'Marketing' },
          { name: 'Finance', icon: '💹', slug: 'Finance' },
          { name: 'Language', icon: '🗣️', slug: 'Language' },
          { name: 'Cloud', icon: '☁️', slug: 'Cloud' },
          { name: 'Cyber Security', icon: '🔐', slug: 'Cyber Security' },
        ],
      },
      {
        id: 'dg-ebooks', name: 'E-Books', icon: '📖', slug: 'E-Books',
        subCategories: [
          { name: 'Fiction', icon: '📕', slug: 'Fiction' },
          { name: 'Non-Fiction', icon: '📗', slug: 'Non-Fiction' },
          { name: 'Technical', icon: '📘', slug: 'Technical' },
          { name: 'Business', icon: '📙', slug: 'Business' },
          { name: 'Self Help', icon: '🧠', slug: 'Self Help' },
          { name: 'Kids', icon: '📚', slug: 'Kids' },
        ],
      },
      {
        id: 'dg-templates', name: 'Templates', icon: '📄', slug: 'Templates',
        subCategories: [
          { name: 'Resume', icon: '📋', slug: 'Resume' },
          { name: 'Notion', icon: '📝', slug: 'Notion' },
          { name: 'PPT', icon: '📊', slug: 'PPT' },
          { name: 'Excel', icon: '📈', slug: 'Excel' },
          { name: 'Website', icon: '🌐', slug: 'Website Templates' },
          { name: 'Social Media', icon: '📱', slug: 'Social Media' },
        ],
      },
      {
        id: 'dg-graphics', name: 'Graphics', icon: '🎨', slug: 'Graphics',
        subCategories: [
          { name: 'Logos', icon: '✳️', slug: 'Logos' },
          { name: 'Icons', icon: '🔷', slug: 'Icons' },
          { name: 'Illustrations', icon: '🖼️', slug: 'Illustrations' },
          { name: 'UI Kits', icon: '📐', slug: 'UI Kits' },
          { name: 'Fonts', icon: '🔤', slug: 'Fonts' },
          { name: 'Mockups', icon: '📱', slug: 'Mockups' },
        ],
      },
      {
        id: 'dg-music', name: 'Music', icon: '🎵', slug: 'Music',
        subCategories: [
          { name: 'Beats', icon: '🥁', slug: 'Beats' },
          { name: 'Loops', icon: '🔁', slug: 'Loops' },
          { name: 'SFX', icon: '🔊', slug: 'SFX' },
          { name: 'Vocal Packs', icon: '🎤', slug: 'Vocal Packs' },
          { name: 'Plugins (VST)', icon: '🎛️', slug: 'Plugins VST' },
        ],
      },
      {
        id: 'dg-stock', name: 'Stock Media', icon: '📸', slug: 'Stock Media',
        subCategories: [
          { name: 'Stock Photos', icon: '📷', slug: 'Stock Photos' },
          { name: 'Stock Videos', icon: '🎥', slug: 'Stock Videos' },
          { name: 'Vectors', icon: '🔶', slug: 'Vectors' },
          { name: '3D Assets', icon: '🧊', slug: '3D Assets' },
        ],
      },
    ],
    heroOffers: [
      { id: 301, title: "Learn & Grow Sale", description: "Premium courses at 70% off. Upskill today!", bgColor: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)", link: "/products?platform=digital" },
      { id: 302, title: "Software Mega Bundle", description: "Get 5 premium tools for the price of 1.", bgColor: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)", link: "/products?platform=digital" },
    ],
  },

  // ═══════════════════════════════════════════════════
  // 🎬 VYAPARPLAY — Video Streaming & Education
  // ═══════════════════════════════════════════════════
  {
    id: 'vyaparplay',
    name: 'Play',
    icon: '🎬',
    color: '#e11d48',
    colorEnd: '#9f1239',
    categories: [
      { id: 'vp-all', name: 'For You', icon: '🎬', slug: '' },
      {
        id: 'vp-live', name: 'Live Classes', icon: '🔴', slug: 'Live',
        subCategories: [
          { name: 'JEE Live', icon: '🧪', slug: 'JEE Live' },
          { name: 'NEET Live', icon: '⚕️', slug: 'NEET Live' },
          { name: 'UPSC Live', icon: '🏛️', slug: 'UPSC Live' },
          { name: 'SSC Live', icon: '📝', slug: 'SSC Live' },
          { name: 'Bank Exam', icon: '🏦', slug: 'Bank Exam' },
          { name: 'Gate', icon: '⚙️', slug: 'Gate' },
          { name: 'CAT / MBA', icon: '📊', slug: 'CAT' },
          { name: 'Doubt Session', icon: '❓', slug: 'Doubt Session' },
        ],
      },
      {
        id: 'vp-recorded', name: 'Recorded', icon: '▶️', slug: 'Recorded',
        subCategories: [
          { name: 'Class 9-10', icon: '📖', slug: 'Class 9-10' },
          { name: 'Class 11-12', icon: '📕', slug: 'Class 11-12' },
          { name: 'IIT Foundation', icon: '🏗️', slug: 'IIT Foundation' },
          { name: 'NEET Prep', icon: '🔬', slug: 'NEET Prep' },
          { name: 'Crash Course', icon: '⚡', slug: 'Crash Course' },
        ],
      },
      {
        id: 'vp-skill', name: 'Skill Dev', icon: '🎯', slug: 'Skill Dev',
        subCategories: [
          { name: 'Coding', icon: '💻', slug: 'Coding' },
          { name: 'English Speaking', icon: '🗣️', slug: 'English Speaking' },
          { name: 'MS Excel', icon: '📊', slug: 'MS Excel' },
          { name: 'Graphic Design', icon: '🎨', slug: 'Graphic Design' },
          { name: 'Video Editing', icon: '🎬', slug: 'Video Editing' },
          { name: 'Photography', icon: '📷', slug: 'Photography' },
          { name: 'Stock Market', icon: '📈', slug: 'Stock Market' },
          { name: 'Freelancing', icon: '💼', slug: 'Freelancing' },
        ],
      },
      {
        id: 'vp-entertainment', name: 'Entertainment', icon: '🎭', slug: 'Entertainment',
        subCategories: [
          { name: 'Movies', icon: '🎬', slug: 'Movies' },
          { name: 'Web Series', icon: '📺', slug: 'Web Series' },
          { name: 'Documentaries', icon: '🎞️', slug: 'Documentaries' },
          { name: 'Anime', icon: '🎌', slug: 'Anime' },
          { name: 'Comedy', icon: '😂', slug: 'Comedy' },
          { name: 'Music Videos', icon: '🎵', slug: 'Music Videos' },
        ],
      },
      {
        id: 'vp-kids', name: 'Kids', icon: '👦', slug: 'Kids',
        subCategories: [
          { name: 'Cartoons', icon: '🧸', slug: 'Cartoons' },
          { name: 'Rhymes', icon: '🎶', slug: 'Rhymes' },
          { name: 'Drawing', icon: '🎨', slug: 'Drawing' },
          { name: 'Stories', icon: '📚', slug: 'Stories' },
          { name: 'Science Fun', icon: '🔬', slug: 'Science Fun' },
          { name: 'Math Games', icon: '🔢', slug: 'Math Games' },
        ],
      },
      {
        id: 'vp-fitness', name: 'Fitness', icon: '🏋️', slug: 'Fitness',
        subCategories: [
          { name: 'Yoga', icon: '🧘', slug: 'Yoga' },
          { name: 'HIIT', icon: '🏃', slug: 'HIIT' },
          { name: 'Weight Training', icon: '🏋️', slug: 'Weight Training' },
          { name: 'Dance Fitness', icon: '💃', slug: 'Dance Fitness' },
          { name: 'Meditation', icon: '🧘‍♂️', slug: 'Meditation' },
          { name: 'Nutrition', icon: '🥗', slug: 'Nutrition' },
        ],
      },
    ],
    heroOffers: [
      { id: 401, title: "Live Classes Start Now", description: "Join 10,000+ students in live interactive sessions.", bgColor: "linear-gradient(135deg, #e11d48 0%, #9f1239 100%)", link: "/products?platform=vyaparplay" },
      { id: 402, title: "All-Access Pass ₹499/month", description: "Unlimited courses, live classes, and downloads.", bgColor: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)", link: "/products?platform=vyaparplay" },
    ],
  },

  // ═══════════════════════════════════════════════════
  // 🍕 VYAPARFOOD — Food Delivery
  // ═══════════════════════════════════════════════════
  {
    id: 'vyaparfood',
    name: 'Food',
    icon: '🍕',
    color: '#ea580c',
    colorEnd: '#c2410c',
    categories: [
      { id: 'vf-all', name: 'For You', icon: '🍕', slug: '' },
      {
        id: 'vf-restaurant', name: 'Restaurants', icon: '🍽️', slug: 'Restaurants',
        subCategories: [
          { name: 'Fine Dining', icon: '🥂', slug: 'Fine Dining' },
          { name: 'Casual Dining', icon: '🍽️', slug: 'Casual Dining' },
          { name: 'Café', icon: '☕', slug: 'Café' },
          { name: 'Fast Food', icon: '🍔', slug: 'Fast Food' },
          { name: 'Dhaba', icon: '🛖', slug: 'Dhaba' },
          { name: 'Buffet', icon: '🫕', slug: 'Buffet' },
        ],
      },
      {
        id: 'vf-cuisine', name: 'Cuisine', icon: '🧑‍🍳', slug: 'Cuisine',
        subCategories: [
          { name: 'North Indian', icon: '🍛', slug: 'North Indian' },
          { name: 'South Indian', icon: '🫓', slug: 'South Indian' },
          { name: 'Chinese', icon: '🥡', slug: 'Chinese' },
          { name: 'Italian', icon: '🍝', slug: 'Italian' },
          { name: 'Mughlai', icon: '🍖', slug: 'Mughlai' },
          { name: 'Continental', icon: '🥗', slug: 'Continental' },
          { name: 'Thai', icon: '🍜', slug: 'Thai' },
          { name: 'Japanese', icon: '🍣', slug: 'Japanese' },
          { name: 'Street Food', icon: '🌮', slug: 'Street Food' },
          { name: 'Hyderabadi', icon: '🍚', slug: 'Hyderabadi' },
        ],
      },
      {
        id: 'vf-desserts', name: 'Desserts', icon: '🍰', slug: 'Desserts',
        subCategories: [
          { name: 'Ice Cream', icon: '🍦', slug: 'Ice Cream' },
          { name: 'Cakes', icon: '🎂', slug: 'Cakes' },
          { name: 'Mithai', icon: '🍬', slug: 'Mithai' },
          { name: 'Pastries', icon: '🥐', slug: 'Pastries' },
          { name: 'Waffles', icon: '🧇', slug: 'Waffles' },
          { name: 'Brownies', icon: '🟫', slug: 'Brownies' },
        ],
      },
      {
        id: 'vf-beverages', name: 'Drinks', icon: '🥤', slug: 'Drinks',
        subCategories: [
          { name: 'Shakes', icon: '🥤', slug: 'Shakes' },
          { name: 'Smoothies', icon: '🫐', slug: 'Smoothies' },
          { name: 'Fresh Juice', icon: '🧃', slug: 'Fresh Juice' },
          { name: 'Lassi', icon: '🥛', slug: 'Lassi' },
          { name: 'Cold Coffee', icon: '☕', slug: 'Cold Coffee' },
          { name: 'Mocktails', icon: '🍹', slug: 'Mocktails' },
        ],
      },
      {
        id: 'vf-healthy', name: 'Healthy', icon: '🥗', slug: 'Healthy',
        subCategories: [
          { name: 'Salads', icon: '🥗', slug: 'Salads' },
          { name: 'Protein Bowl', icon: '🥘', slug: 'Protein Bowl' },
          { name: 'Keto Meals', icon: '🥑', slug: 'Keto Meals' },
          { name: 'Vegan', icon: '🌱', slug: 'Vegan' },
          { name: 'Sugar Free', icon: '🍏', slug: 'Sugar Free' },
        ],
      },
      {
        id: 'vf-biryani', name: 'Biryani', icon: '🍚', slug: 'Biryani',
        subCategories: [
          { name: 'Chicken Biryani', icon: '🍗', slug: 'Chicken Biryani' },
          { name: 'Mutton Biryani', icon: '🥩', slug: 'Mutton Biryani' },
          { name: 'Veg Biryani', icon: '🥕', slug: 'Veg Biryani' },
          { name: 'Egg Biryani', icon: '🥚', slug: 'Egg Biryani' },
          { name: 'Hyderabadi', icon: '🍚', slug: 'Hyderabadi Biryani' },
          { name: 'Lucknowi', icon: '🌟', slug: 'Lucknowi Biryani' },
        ],
      },
      {
        id: 'vf-pizza', name: 'Pizza', icon: '🍕', slug: 'Pizza',
        subCategories: [
          { name: 'Margherita', icon: '🍕', slug: 'Margherita' },
          { name: 'Pepperoni', icon: '🥓', slug: 'Pepperoni' },
          { name: 'Paneer', icon: '🧀', slug: 'Paneer Pizza' },
          { name: 'BBQ Chicken', icon: '🍗', slug: 'BBQ Chicken' },
          { name: 'Garlic Bread', icon: '🍞', slug: 'Garlic Bread' },
          { name: 'Pasta', icon: '🍝', slug: 'Pasta' },
        ],
      },
    ],
    heroOffers: [
      { id: 501, title: "60% Off on First Order", description: "Order from top restaurants near you. Use code VYAPARFOOD60.", bgColor: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)", link: "/products?platform=vyaparfood" },
      { id: 502, title: "Free Delivery All Day", description: "No minimum order. Hot food delivered fresh.", bgColor: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", link: "/products?platform=vyaparfood" },
    ],
  },

  // ═══════════════════════════════════════════════════
  // 🛠️ SERVICES — Home & Professional Services
  // ═══════════════════════════════════════════════════
  {
    id: 'services',
    name: 'Services',
    icon: '🛠️',
    color: '#0891b2',
    colorEnd: '#0e7490',
    categories: [
      { id: 'sv-all', name: 'For You', icon: '🛠️', slug: '' },
      {
        id: 'sv-repair', name: 'Home Repair', icon: '🔧', slug: 'Home Repair',
        subCategories: [
          { name: 'AC Repair', icon: '❄️', slug: 'AC Repair' },
          { name: 'Electrician', icon: '⚡', slug: 'Electrician' },
          { name: 'Plumber', icon: '🚿', slug: 'Plumber' },
          { name: 'Carpenter', icon: '🪚', slug: 'Carpenter' },
          { name: 'Painter', icon: '🎨', slug: 'Painter' },
          { name: 'Appliance Repair', icon: '🔧', slug: 'Appliance Repair' },
          { name: 'RO Service', icon: '💧', slug: 'RO Service' },
          { name: 'CCTV Install', icon: '📹', slug: 'CCTV Install' },
        ],
      },
      {
        id: 'sv-salon', name: 'Salon & Spa', icon: '💇', slug: 'Salon',
        subCategories: [
          { name: 'Haircut (Men)', icon: '💇‍♂️', slug: 'Haircut Men' },
          { name: 'Haircut (Women)', icon: '💇‍♀️', slug: 'Haircut Women' },
          { name: 'Facial', icon: '💆', slug: 'Facial' },
          { name: 'Massage', icon: '💆‍♂️', slug: 'Massage' },
          { name: 'Waxing', icon: '✨', slug: 'Waxing' },
          { name: 'Bridal Makeup', icon: '👰', slug: 'Bridal Makeup' },
          { name: 'Mehndi', icon: '🤲', slug: 'Mehndi' },
          { name: 'Pedicure', icon: '🦶', slug: 'Pedicure' },
        ],
      },
      {
        id: 'sv-cleaning', name: 'Cleaning', icon: '🧹', slug: 'Cleaning',
        subCategories: [
          { name: 'Full Home', icon: '🏠', slug: 'Full Home' },
          { name: 'Kitchen Deep', icon: '🍳', slug: 'Kitchen Deep' },
          { name: 'Bathroom', icon: '🚿', slug: 'Bathroom Cleaning' },
          { name: 'Sofa Cleaning', icon: '🛋️', slug: 'Sofa Cleaning' },
          { name: 'Carpet Cleaning', icon: '🧶', slug: 'Carpet Cleaning' },
          { name: 'Car Wash', icon: '🚗', slug: 'Car Wash' },
          { name: 'Tank Cleaning', icon: '🪣', slug: 'Tank Cleaning' },
        ],
      },
      {
        id: 'sv-packers', name: 'Packers & Movers', icon: '📦', slug: 'Packers',
        subCategories: [
          { name: 'Local Shifting', icon: '🏠', slug: 'Local Shifting' },
          { name: 'Interstate', icon: '🚛', slug: 'Interstate' },
          { name: 'Office Shifting', icon: '🏢', slug: 'Office Shifting' },
          { name: 'Vehicle Transport', icon: '🚗', slug: 'Vehicle Transport' },
          { name: 'Storage', icon: '📦', slug: 'Storage' },
        ],
      },
      {
        id: 'sv-pest', name: 'Pest Control', icon: '🐛', slug: 'Pest Control',
        subCategories: [
          { name: 'Cockroach', icon: '🪳', slug: 'Cockroach' },
          { name: 'Termite', icon: '🐜', slug: 'Termite' },
          { name: 'Mosquito', icon: '🦟', slug: 'Mosquito' },
          { name: 'Bed Bugs', icon: '🛏️', slug: 'Bed Bugs' },
          { name: 'Rat Control', icon: '🐀', slug: 'Rat Control' },
        ],
      },
      {
        id: 'sv-tutor', name: 'Tutoring', icon: '📚', slug: 'Tutor',
        subCategories: [
          { name: 'Math Tutor', icon: '📐', slug: 'Math Tutor' },
          { name: 'Science Tutor', icon: '🔬', slug: 'Science Tutor' },
          { name: 'English Tutor', icon: '📖', slug: 'English Tutor' },
          { name: 'Computer Tutor', icon: '💻', slug: 'Computer Tutor' },
          { name: 'Music Teacher', icon: '🎵', slug: 'Music Teacher' },
          { name: 'Yoga Trainer', icon: '🧘', slug: 'Yoga Trainer' },
          { name: 'Dance Teacher', icon: '💃', slug: 'Dance Teacher' },
        ],
      },
      {
        id: 'sv-legal', name: 'Legal & Finance', icon: '⚖️', slug: 'Legal',
        subCategories: [
          { name: 'GST Filing', icon: '📋', slug: 'GST Filing' },
          { name: 'ITR Filing', icon: '💰', slug: 'ITR Filing' },
          { name: 'Company Reg.', icon: '🏢', slug: 'Company Registration' },
          { name: 'Trademark', icon: '™️', slug: 'Trademark' },
          { name: 'Legal Advice', icon: '⚖️', slug: 'Legal Advice' },
          { name: 'Insurance', icon: '🛡️', slug: 'Insurance' },
        ],
      },
    ],
    heroOffers: [
      { id: 601, title: "Home Services @ 40% Off", description: "Professional cleaning, repair, and salon at your doorstep.", bgColor: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)", link: "/products?platform=services" },
      { id: 602, title: "AC Service Starting ₹399", description: "Trusted technicians, 90-day warranty on all services.", bgColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", link: "/products?platform=services" },
    ],
  },
];

// ═══════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════

export function getPlatformById(id: string): Platform {
  return platforms.find(p => p.id === id) || platforms[0];
}

export function getPlatformCategories(platformId: string): Category[] {
  return getPlatformById(platformId).categories;
}

export function getPlatformHeroOffers(platformId: string) {
  return getPlatformById(platformId).heroOffers;
}

export function getCategorySubCategories(platformId: string, categorySlug: string): SubCategory[] {
  const platform = getPlatformById(platformId);
  const category = platform.categories.find(c => c.slug.toLowerCase() === categorySlug.toLowerCase());
  return category?.subCategories || [];
}
