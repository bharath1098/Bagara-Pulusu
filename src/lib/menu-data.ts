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
    price: 89,
    isVeg: true,
    isHighlighted: true,
  }),
  item({
    category: "Rices",
    name: "White Rice",
    description: "Steamed plain rice",
    price: 59,
    isVeg: true,
  }),
  item({
    category: "Rices",
    name: "Zeera Rice",
    description: "Cumin-tempered basmati",
    price: 99,
    isVeg: true,
  }),
  item({
    category: "Rices",
    name: "Pulao",
    description: "Mildly spiced pulao",
    price: 149,
    variants: vegChicken(149, 199),
    isVeg: true,
  }),
  item({
    category: "Rices",
    name: "Curd Rice",
    description: "Cool tempered curd rice",
    price: 129,
    isVeg: true,
  }),
  item({
    category: "Rices",
    name: "Sambar Rice",
    description: "Rice mixed with house sambar",
    price: 139,
    variants: vegChicken(139, 199),
    isVeg: true,
  }),
  item({
    category: "Rices",
    name: "Muddapappu Avakaya",
    description: "Mashed dal with spicy mango pickle and ghee",
    price: 139,
    isVeg: true,
    isHighlighted: true,
  }),
  item({
    category: "Rices",
    name: "Veg Biryani",
    description: "Layered vegetable biryani with raita",
    price: 199,
    isVeg: true,
  }),
  item({
    category: "Rices",
    name: "Chicken Biryani",
    description: "Classic dum chicken biryani",
    price: 249,
    isVeg: false,
    isHighlighted: true,
  }),
  item({
    category: "Rices",
    name: "Fish Biryani",
    description: "Coastal-style fish biryani",
    price: 399,
    isVeg: false,
  }),
  item({
    category: "Rices",
    name: "Prawns Biryani",
    description: "Aromatic prawns biryani",
    price: 399,
    isVeg: false,
  }),

  // Veg curries
  item({
    category: "Veg Curries",
    name: "Dal",
    description: "Comforting tempered dal",
    price: 40,
    isVeg: true,
  }),
  item({
    category: "Veg Curries",
    name: "Sambar",
    description: "Andhra-style lentil sambar",
    price: 30,
    isVeg: true,
  }),
  item({
    category: "Veg Curries",
    name: "Veg Curry",
    description: "Seasonal vegetables in a mild gravy",
    price: 40,
    isVeg: true,
  }),

  // Frys
  item({
    category: "Frys",
    name: "Egg Fry",
    description: "Spiced fried eggs (3 eggs)",
    price: 129,
    isVeg: false,
  }),
  item({
    category: "Frys",
    name: "Chicken Fry",
    description: "Crispy Andhra chicken fry (6 pcs)",
    price: 199,
    isVeg: false,
    isHighlighted: true,
  }),
  item({
    category: "Frys",
    name: "Liver Fry",
    description: "Peppery chicken liver fry (8 pcs)",
    price: 149,
    isVeg: false,
  }),
  item({
    category: "Frys",
    name: "Boti Fry",
    description: "Spicy mutton boti fry",
    price: 249,
    isVeg: false,
  }),
  item({
    category: "Frys",
    name: "Fish Fry",
    description: "Crispy shallow-fried fish (1 pc)",
    price: 99,
    isVeg: false,
  }),
  item({
    category: "Frys",
    name: "Prawns Fry",
    description: "Spiced fried prawns (180 gms)",
    price: 389,
    isVeg: false,
  }),

  // Curries & pulusu
  item({
    category: "Curries & Pulusu",
    name: "Kaju Mushroom Curry",
    description: "Cashew and mushroom gravy",
    price: 199,
    isVeg: true,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Aloo Gobi Kurma",
    description: "Potato and cauliflower in kurma",
    price: 139,
    isVeg: true,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Paneer Curry",
    description: "Cottage cheese in rich gravy",
    price: 189,
    isVeg: true,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Egg Curry",
    description: "Boiled eggs in spicy masala",
    price: 129,
    isVeg: false,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Chicken Curry",
    description: "Home-style Andhra chicken curry",
    price: 199,
    isVeg: false,
    isHighlighted: true,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Boti Curry",
    description: "Mutton boti in thick gravy",
    price: 249,
    isVeg: false,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Chepala Pulusu",
    description: "Tangy tamarind fish pulusu — our namesake",
    price: 199,
    isVeg: false,
    isHighlighted: true,
    isNew: true,
  }),
  item({
    category: "Curries & Pulusu",
    name: "Prawns Curry",
    description: "Prawns in coastal Andhra gravy",
    price: 389,
    isVeg: false,
  }),

  // Starters
  item({
    category: "Starters",
    name: "Chilli Paneer",
    description: "Indo-Chinese chilli paneer",
    price: 199,
    isVeg: true,
  }),
  item({
    category: "Starters",
    name: "Chilly Chicken",
    description: "Spicy chilli chicken dry",
    price: 199,
    isVeg: false,
  }),
  item({
    category: "Starters",
    name: "Chicken 65",
    description: "Classic red chicken 65",
    price: 199,
    isVeg: false,
    isHighlighted: true,
  }),
  item({
    category: "Starters",
    name: "Chicken Wings",
    description: "Crispy spiced wings",
    price: 199,
    isVeg: false,
  }),
  item({
    category: "Starters",
    name: "Pepper Chicken",
    description: "Black pepper chicken fry",
    price: 199,
    isVeg: false,
  }),
  item({
    category: "Starters",
    name: "Prawns Loose",
    description: "Crispy prawns loose",
    price: 399,
    isVeg: false,
  }),

  // Thalis
  item({
    category: "Thalis",
    name: "Veg Thali",
    description:
      "Rice, veg curry, dal, sambar, roti pachadi, pulka, curd, papad",
    price: 139,
    isVeg: true,
    isHighlighted: true,
  }),
  item({
    category: "Thalis",
    name: "Chicken Thali",
    description: "Bagara rice, chicken fry, chicken curry, egg fry, curd",
    price: 199,
    isVeg: false,
    isHighlighted: true,
  }),
  item({
    category: "Thalis",
    name: "Fish Thali",
    description: "White rice, fish fry, chepala pulusu, egg fry",
    price: 299,
    isVeg: false,
  }),
  item({
    category: "Thalis",
    name: "Mix Thali",
    description:
      "Rice, chicken fry, chicken curry, fish fry, chepala pulusu, boti fry, liver fry",
    price: 399,
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
    price: 20,
    isVeg: true,
  }),
  item({
    category: "Breads",
    name: "Paratha",
    description: "Flaky layered paratha",
    price: 30,
    isVeg: true,
  }),

  // Juices — all ₹129
  item({
    category: "Juices",
    name: "Mango Juice",
    description: "Fresh mango juice",
    price: 129,
    isVeg: true,
  }),
  item({
    category: "Juices",
    name: "Watermelon Juice",
    description: "Chilled watermelon juice",
    price: 129,
    isVeg: true,
  }),
  item({
    category: "Juices",
    name: "Mosambi Juice",
    description: "Fresh sweet lime",
    price: 129,
    isVeg: true,
  }),

  // Shakes — all ₹149
  item({
    category: "Shakes",
    name: "Chocolate Shake",
    description: "Thick chocolate milkshake",
    price: 149,
    isVeg: true,
  }),
  item({
    category: "Shakes",
    name: "Oreo Shake",
    description: "Crushed Oreo shake",
    price: 149,
    isVeg: true,
  }),
  item({
    category: "Shakes",
    name: "Vanilla Shake",
    description: "Classic vanilla shake",
    price: 149,
    isVeg: true,
  }),
  item({
    category: "Shakes",
    name: "Mango Shake",
    description: "Seasonal mango shake",
    price: 149,
    isVeg: true,
  }),
  item({
    category: "Shakes",
    name: "Strawberry Shake",
    description: "Strawberry milkshake",
    price: 149,
    isVeg: true,
  }),
  item({
    category: "Shakes",
    name: "Badam Shake",
    description: "Almond badam shake",
    price: 149,
    isVeg: true,
  }),

  // Soft drinks — MRP
  item({
    category: "Soft Drinks",
    name: "Thums Up",
    description: "Chilled Thums Up (MRP)",
    price: 40,
    isVeg: true,
  }),
  item({
    category: "Soft Drinks",
    name: "Red Bull",
    description: "Energy drink (MRP)",
    price: 125,
    isVeg: true,
  }),
  item({
    category: "Soft Drinks",
    name: "Diet Coke",
    description: "Chilled Diet Coke (MRP)",
    price: 40,
    isVeg: true,
  }),

  // Desserts
  item({
    category: "Desserts",
    name: "Brownie with Ice Cream",
    description: "Warm brownie served with ice cream",
    price: 149,
    isVeg: true,
    isHighlighted: true,
  }),
  item({
    category: "Desserts",
    name: "Bharath Hand Over",
    description: "Dessert display special — ask the desk for today's plate",
    price: 0,
    isVeg: true,
    isNew: true,
  }),
];
