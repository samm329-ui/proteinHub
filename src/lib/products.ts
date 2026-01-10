
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
        description: 'Clinically tested for 50% higher protein absorption and 60% higher BCAA absorption, making it perfect for Indian bodies.',
        price: 2499,
        oldPrice: 2999,
        weights: ['1kg', '2kg', '5kg'],
        flavors: [
            { name: 'Rich Chocolate', color: '#5C3A21' },
            { name: 'Cafe Mocha', color: '#7B5E4A' },
            { name: 'Strawberry Shake', color: '#D94A64' },
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
        description: 'Pure whey protein isolate enriched with DigeZyme for enhanced digestibility and superior lean muscle building.',
        price: 3299,
        oldPrice: 3899,
        weights: ['1kg', '2kg'],
        flavors: [
            { name: 'Blue Raspberry', color: '#0073e6' },
            { name: 'Fruit Punch', color: '#e60026' },
            { name: 'Green Apple', color: '#8cd900' },
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
        description: 'Features a 1:5 protein-to-carb ratio, designed to help you build significant muscle mass and accelerate weight gain.',
        price: 1899,
        oldPrice: 2299,
        weights: ['1.5kg', '3kg'],
        flavors: [
            { name: 'Chocolate Fudge', color: '#663300' },
            { name: 'Peanut Butter', color: '#c68642' },
            { name: 'Banana', color: '#ffcc00' },
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
