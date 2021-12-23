/* eslint-disable max-len */
import { Dish } from '../Types/Types';

const fakeDataDishes: Dish[] = [
    {
        id: 'd0',
        name: 'Pierogi',
        cuisine: 'Polish',
        meal: 'lunch',
        category: 'flour-based',
        ingredients: ['flour', 'salt', 'eggs', 'potatoes', 'onion'],
        quantity: 15,
        priceEuro: 800,
        description: 'Traditional polish dish served with melted butter.',
        images: [
            'https://assets.poland.us/files_proxy/artykuly/file5cf6c43b09a5c.201906041519.jpg',
            'https://assets.epuzzle.info/puzzle/003/293/original.jpg',
        ],
    },
    {
        id: 'd1',
        name: 'Kotlet Schabowy',
        cuisine: 'Polish',
        meal: 'dinner',
        category: 'meat',
        ingredients: ['meat', 'flour', 'eggs', 'potatoes'],
        quantity: 20,
        priceEuro: 1000,
        description: 'Traditional polish dish served with potatoes.',
        images: [
            'https://przepisna.pl/file/2019/11/kotlet-schabowy-800x477.jpg',
        ],
    },
    {
        id: 'd2',
        name: 'Barszcz',
        cuisine: 'Polish',
        meal: 'lunch',
        category: 'soup',
        ingredients: ['beetroots', 'eggs'],
        quantity: 10,
        priceEuro: 500,
        description: 'Traditional polish soup popular on christmas.',
        images: [
            'https://spottedlublin.pl/wp-content/uploads/2020/12/barszcz-wigilijny-czerwony-z-uszkami.jpg',
        ],
    },
    {
        id: 'd3',
        name: 'Zupa pomidorowa',
        cuisine: 'Polish',
        meal: 'lunch',
        category: 'soup',
        ingredients: ['tomatoes', 'cream', 'salt'],
        quantity: 12,
        priceEuro: 400,
        description: 'Traditional polish soup.',
        images: [
            'https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/zupa-pomidorowa.jpg',
        ],
    },
    {
        id: 'd4',
        name: 'Rosół',
        cuisine: 'Polish',
        meal: 'lunch',
        category: 'soup',
        ingredients: ['meat', 'pasta', 'carrot'],
        quantity: 10,
        priceEuro: 600,
        description: 'Traditional polish soup.',
        images: [
            'https://cdn.aniagotuje.com/pictures/articles/2020/01/1968771-v-1500x1500.jpg',
            'https://www.zajadam.pl/wp-content/uploads/2010/10/rosol-przepis-tradycyjny-6504345.jpg',
        ],
    },
    {
        id: 'd5',
        name: 'Zupa ogórkowa',
        cuisine: 'Polish',
        meal: 'lunch',
        category: 'soup',
        ingredients: ['meat', 'rise', 'cucumber'],
        quantity: 15,
        priceEuro: 500,
        description: 'Traditional polish soup.',
        images: [
            'https://cdn.galleries.smcloud.net/t/galleries/gf-7AYZ-fK7B-DQvp_zupa-ogorkowa-664x442-nocrop.jpg',
        ],
    },
    {
        id: 'd6',
        name: 'Fish and chips',
        cuisine: 'English',
        meal: 'Breakfast',
        category: 'fish',
        ingredients: ['fish', 'chips', 'eggs'],
        quantity: 15,
        priceEuro: 800,
        description: 'Traditional english breakfast.',
        images: [
            'https://culinaryginger.com/wp-content/uploads/British-fish-and-chips-2--720x405.jpg',
        ],
    },
    {
        id: 'd7',
        name: 'Spaghetti Bolognese',
        cuisine: 'Italian',
        meal: 'lunch',
        category: 'pasta',
        ingredients: ['tomatoes', 'salt', 'meat', 'pasta'],
        quantity: 8,
        priceEuro: 1500,
        description: 'Famous italian pasta.',
        images: [
            'https://cdn.galleries.smcloud.net/t/photos/gf-n4vp-XMnG-9Bbs_spaghetti-w-pomidorowym-sosie-w-5-minut-z-piekarnika-bez-gotowania-makaronu.jpg',
            'https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0005/68/20083dc9ad4ef86a71e31e4813b27f05fcb6b421.jpeg',
        ],
    },
    {
        id: 'd8',
        name: 'Spaghetti Carbonara',
        cuisine: 'Italian',
        meal: 'lunch',
        category: 'pasta',
        ingredients: ['salt', 'eggs', 'pasta'],
        quantity: 9,
        priceEuro: 1200,
        description: 'Famous italian pasta.',
        images: [
            'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/carbonara_02.jpg',
        ],
    },
    {
        id: 'd9',
        name: 'Pizza peperoni',
        cuisine: 'Italian',
        meal: 'dinner',
        category: 'pizza',
        ingredients: ['salt', 'eggs', 'flour', 'cheese'],
        quantity: 20,
        priceEuro: 1800,
        description: 'Traditional italian dish.',
        images: [
            'https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/pizza-peperoni.jpg',
        ],
    },
    {
        id: 'd10',
        name: 'Pizza margherita',
        cuisine: 'Italian',
        meal: 'dinner',
        category: 'pizza',
        ingredients: ['salt', 'eggs', 'flour', 'cheese'],
        quantity: 25,
        priceEuro: 2000,
        description: 'Traditional italian dish.',
        images: [
            'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/5802fab5-fdce-468a-a830-43e8001f5a72/Derivates/c00dc34a-e73d-42f0-a86e-e2fd967d33fe.jpg',
        ],
    },
    {
        id: 'd11',
        name: 'Pizza salami',
        cuisine: 'Italian',
        meal: 'dinner',
        category: 'pizza',
        ingredients: ['salt', 'eggs', 'flour', 'cheese'],
        quantity: 26,
        priceEuro: 1700,
        description: 'Traditional italian dish.',
        images: [
            'https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/pizza-peperoni.jpg',
        ],
    },
];

export default fakeDataDishes;
