
import { BestSellerProduct } from './bestseller-products';

export type ProductCategory = {
  category: string;
  products: BestSellerProduct[];
};

export const productsByCategory: ProductCategory[] = [
  {
    category: 'Whey Protein',
    products: [
      {
        name: 'Biozyme Performance Whey',
        price: 3200,
        accentGlowColor: '#0073e6',
        features: ['25g protein/scoop', '50% enhanced absorption', 'Multiple flavours'],
        rating: 4.8,
        image: {
          src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/biozyme%20performance.png',
          hint: 'biozyme performance whey',
        },
      },
      {
        name: 'Whey Gold 100% Isolate',
        price: 3950,
        accentGlowColor: '#FFD700',
        features: ['High-protein isolate', 'Lower carbs & fats', 'Ideal for lean muscle'],
        rating: 4.7,
        image: {
          src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/gold%20whey.png',
          hint: 'whey gold protein',
        },
      },
      {
        name: 'Raw Whey Protein 80%',
        price: 2500,
        accentGlowColor: '#cccccc',
        features: ['80% concentrate', 'Easy-digest whey source', 'Unflavoured'],
        rating: 4.5,
        image: {
          src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/raw%20whey%2080.png',
          hint: 'raw whey protein',
        },
      },
    ],
  },
  {
    category: 'Mass Gainer',
    products: [
      {
        name: 'Mass Gainer XXL',
        price: 3750,
        accentGlowColor: '#9B00E8',
        features: ['High-calorie formula', 'Complex carbs + proteins', 'With digestive enzymes'],
        rating: 4.6,
        image: {
          src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/mass%20gainer.png',
          hint: 'mass gainer xxl',
        },
      },
      {
        name: 'Bulk Gainer with Creatine',
        price: 2500,
        accentGlowColor: '#E84C00',
        features: ['Mass gainer variant', 'Creatine added for strength', 'For serious bulking'],
        rating: 4.4,
        image: {
          src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/bulk%20gainer%20creatin.png',
          hint: 'bulk gainer creatine',
        },
      },
    ],
  },
  {
    category: 'Pre-Workout',
    products: [
      {
        name: 'Pre Workout WrathX',
        price: 1699,
        accentGlowColor: '#E50000',
        features: ['Caffeine, creatine blend', 'For energy & focus', 'Intense performance'],
        rating: 4.8,
        image: {
          src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/preworkout%20wrathx.png',
          hint: 'pre workout wrathx',
        },
      },
      {
        name: 'Pre Workout 200 Xtreme',
        price: 675,
        accentGlowColor: '#FF4500',
        features: ['Smaller formula', 'For quick energy burst', '200mg caffeine'],
        rating: 4.7,
        image: {
          src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/preworkout%20xtreem%20200.png',
          hint: 'pre workout 200 xtreme',
        },
      },
    ],
  },
  {
    category: 'Creatine',
    products: [
      {
        name: 'Creatine Monohydrate CreAMP',
        price: 950,
        accentGlowColor: '#2ECC71',
        features: ['Boosts strength/energy', 'Standard creatine', 'CreAMP technology'],
        rating: 4.9,
        image: {
          src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/creatin%20monohydrate%20creAMP.png',
          hint: 'creatine creamp',
        },
      },
      {
        name: 'Micronised Creatine',
        price: 950,
        accentGlowColor: '#B2B2B2',
        features: ['Finer micronised form', 'Better mixability', 'Unflavoured'],
        rating: 4.7,
        image: {
          src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/micronized%20creatin.png',
          hint: 'micronised creatine',
        },
      },
      {
        name: 'CreaPRO with Creapure',
        price: 1500,
        accentGlowColor: '#D4AF37',
        features: ['Premium creatine variant', 'Featuring Creapure®', 'Purity guaranteed'],
        rating: 4.9,
        image: {
          src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/creapro%20creatin.png',
          hint: 'creapro creapure',
        },
      },
    ],
  },
  {
    category: 'BCAAs',
    products: [
        {
            name: 'BCAA Pro Essential',
            price: 1599,
            accentGlowColor: '#2ECC71',
            features: ['8:1:1 BCAA ratio', 'Glutamine for recovery', 'Essential Amino Acids'],
            rating: 4.6,
            image: {
              src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/bcaa%20pro.png',
              hint: 'bcaa pro essential',
            },
          },
          {
            name: 'BCAA Gold 8:1:1',
            price: 2099,
            accentGlowColor: '#F1C40F',
            features: ['Larger serving pack', 'Watermelon flavour', '8:1:1 Amino Acids'],
            rating: 4.7,
            image: {
              src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/bcaa%20gold.png',
              hint: 'bcaa gold',
            },
          },
    ],
  },
  {
      category: 'Multivitamins',
      products: []
  },
  {
      category: 'Fat Burners',
      products: []
  }
];
