
export type BestSellerProduct = {
  name: string;
  price: number;
  features: string[];
  rating: number;
  accentGlowColor: string;
  image: {
    src: string;
    hint: string;
  };
};

export const bestSellerProducts: BestSellerProduct[] = [
  {
    name: 'MuscleBlaze Biozyme Performance Whey',
    price: 4399,
    accentGlowColor: '#0073e6', // Electric Blue
    features: [
      'Enhanced Absorption Formula (EAF®)',
      '50% Higher Protein Absorption',
      '25g Protein Per Scoop',
    ],
    rating: 4.8,
    image: {
      src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/biozyme%20performance.png',
      hint: 'biozyme performance whey protein',
    },
  },
  {
    name: 'Whey Gold 100% Whey Protein Isolate',
    price: 5899,
    accentGlowColor: '#FFD700', // Gold
    features: [
      'Ultra-clean protein isolate',
      'High protein, low carbs & fats',
      'Ideal for lean muscle building',
    ],
    rating: 4.7,
    image: {
      src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/gold%20whey.png',
      hint: 'whey gold protein isolate',
    },
  },
  {
    name: 'MuscleBlaze Super Gainer XXL',
    price: 3499,
    accentGlowColor: '#9B00E8', // Deep Purple
    features: [
      'High-calorie mass gainer',
      '1:5 Protein-to-Carb Ratio',
      'Designed for serious bulking',
    ],
    rating: 4.6,
    image: {
      src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/mass%20gainer.png',
      hint: 'super gainer xxl',
    },
  },
  {
    name: 'MuscleBlaze Pre Workout 200 Xtreme',
    price: 1349,
    accentGlowColor: '#FF4500', // Fiery Orange
    features: [
      'High-stimulant pre-workout',
      'Caffeine for explosive energy',
      'Built for intense training sessions',
    ],
    rating: 4.9,
    image: {
      src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/preworkout%20xtreem%20200.png',
      hint: 'pre workout 200 xtreme',
    },
  },
];
