
export type Flavor = {
    name: string;
    color: string;
};

export const products = [
    { name: 'Whey Protein' },
    { name: 'Mass Gainer' },
    { name: 'Pre Workout' },
    { name: 'Creatine' },
    { name: 'BCAAs' },
    { name: 'Glutamine' },
    { name: 'Multivitamins' },
    { name: 'Fat Burners' }
];

export const bestSellers = [
    {
        name: 'Biozyme Performance Whey',
        category: 'Performance Nutrition',
        description: 'Clinically tested on Indian bodies for 50% higher protein absorption and 60% higher BCAA absorption.',
        price: 2499,
        oldPrice: 2999,
        weights: ['1kg', '2kg', '5kg'],
        flavors: [
            { name: 'Double Chocolate', color: '#D946EF' },
            { name: 'Vanilla Cream', color: '#F3E5AB' },
            { name: 'Strawberry', color: '#FC5A8D' },
        ],
        image: {
            src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/biozyme%20performance.png',
            hint: 'protein powder'
        },
        stat: {
            value: '25',
            label: 'Protein'
        }
    },
    {
        name: 'Whey Gold',
        category: '100% Whey Isolate',
        description: 'Pure whey protein isolate enriched with DigeZyme for enhanced digestibility and lean muscle building.',
        price: 3299,
        oldPrice: 3899,
        weights: ['1kg', '2kg'],
        flavors: [
            { name: 'Blue Raspberry', color: '#0096FF' },
            { name: 'Fruit Punch', color: '#E04156' },
            { name: 'Green Apple', color: '#84DE02' },
        ],
        image: {
            src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/gold%20whey.png',
            hint: 'fitness supplement'
        },
        stat: {
            value: '30',
            label: 'Protein'
        }
    },
    {
        name: 'Mass Gainer XXL',
        category: 'High-Calorie Formula',
        description: 'High-calorie formulation with a 1:5 protein-to-carb ratio to help build muscle mass and gain weight.',
        price: 1899,
        oldPrice: 2299,
        weights: ['1.5kg', '3kg'],
        flavors: [
            { name: 'Chocolate Fudge', color: '#3D2B1F' },
            { name: 'Peanut Butter', color: '#C68E17' },
            { name: 'Banana', color: '#FFE135' },
        ],
        image: {
            src: 'https://xizgjjkyqpzyuwxcgcuk.supabase.co/storage/v1/object/public/asset/product/mass%20gainer.png',
            hint: 'mass gainer'
        },
        stat: {
            value: '560',
            label: 'Calories'
        }
    }
];
