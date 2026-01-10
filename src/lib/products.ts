
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
        name: 'Whey Isolate',
        category: 'Performance Nutrition',
        price: 2499,
        oldPrice: 2999,
        weights: ['1kg', '2kg', '5kg'],
        flavors: [
            { name: 'Double Chocolate', color: '#5C3A21' },
            { name: 'Vanilla Cream', color: '#F3E5AB' },
            { name: 'Strawberry', color: '#FC5A8D' },
        ],
        image: {
            src: 'https://picsum.photos/seed/bs1/400/400',
            hint: 'protein powder'
        }
    },
    {
        name: 'Alpha Pre-Workout',
        category: 'Muscle Fuel Series',
        price: 1999,
        oldPrice: 2499,
        weights: ['30 Servings', '60 Servings'],
        flavors: [
            { name: 'Blue Raspberry', color: '#0096FF' },
            { name: 'Fruit Punch', color: '#E04156' },
            { name: 'Green Apple', color: '#84DE02' },
        ],
        image: {
            src: 'https://picsum.photos/seed/bs2/400/400',
            hint: 'fitness supplement'
        }
    },
    {
        name: 'Vegan Protein',
        category: 'Plant-Based Fuel',
        price: 2799,
        oldPrice: 3299,
        weights: ['1kg', '2kg'],
        flavors: [
            { name: 'Chocolate Fudge', color: '#3D2B1F' },
            { name: 'Peanut Butter', color: '#C68E17' },
            { name: 'Unflavored', color: '#EAEAEA' },
        ],
        image: {
            src: 'https://picsum.photos/seed/bs3/400/400',
            hint: 'vegan supplement'
        }
    }
];
