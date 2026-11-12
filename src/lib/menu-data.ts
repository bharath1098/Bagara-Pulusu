import type { MenuItem } from "./types";

let _id = 1;
const id = () => `mi-${_id++}`;

function item(
  partial: Omit<MenuItem, "id" | "available"> & { available?: boolean },
): MenuItem {
  return { available: true, ...partial, id: id() };
}

const vegChicken = (veg: number, chicken: number) => [
  { id: "veg", label: "Veg", price: veg },
  { id: "chicken", label: "Chicken", price: chicken },
];

export const SEED_MENU: MenuItem[] = [
  // Rices
  item({
    category: "Rices",
    name: "Bagara",
    description: "Fragrant bagara rice tempered with spices and ghee",
    price: 120,
    isVeg: true,
    isHighlighted: true,
  }),
  item({
    category: "Rices",
    name: "White Rice",
    description: "Steamed plain rice",
    price: 80,
    isVeg: true,
  }),
  item({
    category: "Rices",
    name: "Zeera Rice",
    description: "Cumin-tempered basmati",
    price: 100,
    isVeg: true,
  }),
  item({
    category: "Rices",
    name: "Pulao",
    description: "Mildly spiced pulao",
    price: 140,
    variants: vegChicken(140, 180),
    isVeg: true,
  }),
  item({
    category: "Rices",
    name: "Curd Rice",
    description: "Cool tempered curd rice",
    price: 110,
    isVeg: true,
  }),
  item({
    category: "Rices",
    name: "Sambar Rice",
    description: "Rice mixed with house sambar",
    price: 130,
    variants: vegChicken(130, 170),
    isVeg: true,
  }),
  item({
    category: "Rices",
    name: "Muddapappu Avakaya",
    description: "Mashed dal with spicy mango pickle and ghee",
    price: 150,
    isVeg: true,
    isHighlighted: true,
  }),
  item({
    category: "Rices",
    name: "Veg Biryani",
    description: "Layered vegetable biryani with raita",
    price: 220,
    isVeg: true,
  }),
  item({
    category: "Rices",
    name: "Chicken Biryani",
    description: "Classic dum chicken biryani",
    price: 280,
    isVeg: false,
    isHighlighted: true,
  }),
  item({
    category: "Rices",
    name: "Fish Biryani",
    description: "Coastal-style fish biryani",
    price: 300,
    isVeg: false,
  }),
  item({
    category: "Rices",
    name: "Prawns Biryani",
    description: "Aromatic prawns biryani",
    price: 320,
    isVeg: false,
  }),

  // Veg curries
  item({
    category: "Veg Curries",
    name: "Dal",
    description: "Comforting tempered dal",
    price: 90,
    isVeg: true,
  }),
  item({
    category: "Veg Curries",
    name: "Sambar",
    description: "Andhra-style lentil sambar",
    price: 100,
    isVeg: true,
  }),
  item({
    category: "Veg Curries",
    name: "Mixed Veg Curry",
    description: "Seasonal vegetables in a mild gravy",
    price: 140,
    isVeg: true,
  }),

  // Frys
  item({
    category: "Frys",
    name: "Egg Fry",
    description: "Spiced fried eggs",
    price: 120,
    isVeg: false,
  }),
  item({
    category: "Frys",
    name: "Chicken Fry",
    description: "Crispy Andhra chicken fry",
    price: 220,
    isVeg: false,
    isHighlighted: true,
  }),
  item({
    category: "Frys",
    name: "Liver Fry",
    description: "Peppery chicken liver fry",
    price: 200,
    isVeg: false,
  }),
  item({
    category: "Frys",
    name: "Boti Fry",
    description: "Spicy mutton boti fry",
    price: 260,
    isVeg: false,
  }),
  item({
    category: "Frys",
    name: "Fish Fry",
    description: "Crispy shallow-fried fish",
    price: 250,
    isVeg: false,
  }),
  item({
    category: "Frys",
    name: "Prawns Fry",
    description: "Spiced fried prawns",
    price: 280,
    isVeg: false,
  }),

  // Curries & pulusu
  item({
    category: "Curries & Pulusu",
    name: "Kaju Mushroom Curry",
    description: "Cashew and mushroom gravy",
    price: 220,
    isVeg: true,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Aloo Gobi Kurma",
    description: "Potato and cauliflower in kurma",
    price: 180,
    isVeg: true,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Paneer Curry",
    description: "Cottage cheese in rich gravy",
    price: 200,
    isVeg: true,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Egg Curry",
    description: "Boiled eggs in spicy masala",
    price: 160,
    isVeg: false,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Chicken Curry",
    description: "Home-style Andhra chicken curry",
    price: 240,
    isVeg: false,
    isHighlighted: true,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Boti Curry",
    description: "Mutton boti in thick gravy",
    price: 280,
    isVeg: false,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Chepala Pulusu",
    description: "Tangy tamarind fish pulusu — our namesake",
    price: 280,
    isVeg: false,
    isHighlighted: true,
    isNew: true,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Prawns Curry",
    description: "Prawns in coastal Andhra gravy",
    price: 300,
    isVeg: false,
  }),

  // Starters
  item({
    category: "Starters",
    name: "Chilli Paneer",
    description: "Indo-Chinese chilli paneer",
    price: 200,
    isVeg: true,
  }),
  item({
    category: "Starters",
    name: "Chilly Chicken",
    description: "Spicy chilli chicken dry",
    price: 240,
    isVeg: false,
  }),
  item({
    category: "Starters",
    name: "Chicken 65",
    description: "Classic red chicken 65",
    price: 240,
    isVeg: false,
    isHighlighted: true,
  }),
  item({
    category: "Starters",
    name: "Chicken Wings",
    description: "Crispy spiced wings",
    price: 260,
    isVeg: false,
  }),
  item({
    category: "Starters",
    name: "Pepper Chicken",
    description: "Black pepper chicken fry",
    price: 250,
    isVeg: false,
  }),
  item({
    category: "Starters",
    name: "Prawns Loose",
    description: "Crispy prawns loose",
    price: 320,
    isVeg: false,
  }),

  // Thalis
  item({
    category: "Thalis",
    name: "Veg Thali",
    description:
      "Rice, veg curry, dal, sambar, roti pachadi, pulka, curd, papad",
    price: 199,
    isVeg: true,
    isHighlighted: true,
  }),
  item({
    category: "Thalis",
    name: "Chicken Thali",
    description: "Bagara rice, chicken fry, chicken curry, egg fry, curd",
    price: 299,
    isVeg: false,
    isHighlighted: true,
  }),
  item({
    category: "Thalis",
    name: "Fish Thali",
    description: "White rice, fish fry, chepala pulusu, egg fry",
    price: 349,
    isVeg: false,
  }),
  item({
    category: "Thalis",
    name: "Mix Thali",
    description:
      "Rice, chicken fry, chicken curry, fish fry, chepala pulusu, boti fry, liver fry",
    price: 449,
    isVeg: false,
    isNew: true,
  }),

  // Breads
  item({
    category: "Breads",
    name: "Pulka",
    description: "Soft whole-wheat pulka",
    price: 20,
    isVeg: true,
  }),
  item({
    category: "Breads",
    name: "Chapathi",
    description: "Soft chapathi",
    price: 25,
    isVeg: true,
  }),
  item({
    category: "Breads",
    name: "Paratha",
    description: "Flaky layered paratha",
    price: 40,
    isVeg: true,
  }),

  // Juices
  item({
    category: "Juices",
    name: "Mango Juice",
    description: "Fresh mango juice",
    price: 100,
    isVeg: true,
  }),
  item({
    category: "Juices",
    name: "Watermelon Juice",
    description: "Chilled watermelon juice",
    price: 80,
    isVeg: true,
  }),
  item({
    category: "Juices",
    name: "Mosambi Juice",
    description: "Fresh sweet lime",
    price: 90,
    isVeg: true,
  }),

  // Shakes
  item({
    category: "Shakes",
    name: "Chocolate Shake",
    description: "Thick chocolate milkshake",
    price: 140,
    isVeg: true,
  }),
  item({
    category: "Shakes",
    name: "Oreo Shake",
    description: "Crushed Oreo shake",
    price: 160,
    isVeg: true,
  }),
  item({
    category: "Shakes",
    name: "Vanilla Shake",
    description: "Classic vanilla shake",
    price: 120,
    isVeg: true,
  }),
  item({
    category: "Shakes",
    name: "Mango Shake",
    description: "Seasonal mango shake",
    price: 150,
    isVeg: true,
  }),
  item({
    category: "Shakes",
    name: "Strawberry Shake",
    description: "Strawberry milkshake",
    price: 150,
    isVeg: true,
  }),
  item({
    category: "Shakes",
    name: "Badam Shake",
    description: "Almond badam shake",
    price: 160,
    isVeg: true,
  }),

  // Soft drinks
  item({
    category: "Soft Drinks",
    name: "Thums Up",
    description: "Chilled Thums Up",
    price: 40,
    isVeg: true,
  }),
  item({
    category: "Soft Drinks",
    name: "Red Bull",
    description: "Energy drink",
    price: 150,
    isVeg: true,
  }),
  item({
    category: "Soft Drinks",
    name: "Coke",
    description: "Chilled Coca-Cola",
    price: 40,
    isVeg: true,
  }),
  item({
    category: "Soft Drinks",
    name: "Diet Coke",
    description: "Chilled Diet Coke",
    price: 50,
    isVeg: true,
  }),
  item({
    category: "Soft Drinks",
    name: "Sprite",
    description: "Chilled Sprite",
    price: 40,
    isVeg: true,
  }),
  item({
    category: "Soft Drinks",
    name: "Mineral Water",
    description: "Bottled water",
    price: 20,
    isVeg: true,
  }),

  // Desserts
  item({
    category: "Desserts",
    name: "Brownie with Ice Cream",
    description: "Warm brownie served with ice cream",
    price: 160,
    isVeg: true,
    isHighlighted: true,
  }),
  item({
    category: "Desserts",
    name: "Bharath Hand Over",
    description: "Dessert display special — ask the desk for today's plate",
    price: 180,
    isVeg: true,
    isNew: true,
  }),
];
