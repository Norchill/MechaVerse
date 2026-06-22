/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const HERO_PRODUCT: Product = {
  id: 'arctic-01',
  name: 'FRZN™ JOCKS',
  subName: 'THERMOACTIVE SEAMLESS ATHLETIC JOCK SHORTS',
  price: 189.99,
  img: '/src/assets/images/jocks_white_1781843812677.jpg',
  colors: ['WHITE', 'SILVER', 'ICE BLUE', 'BLACK'],
  colorImages: {
    'WHITE': '/src/assets/images/jocks_white_1781843812677.jpg',
    'SILVER': '/src/assets/images/jocks_silver_1781843845995.jpg',
    'ICE BLUE': '/src/assets/images/jocks_ice_blue_1781843865736.jpg',
    'BLACK': '/src/assets/images/jocks_black_1781843825606.jpg'
  },
  sizes: ['S', 'M', 'L', 'XL'],
  category: 'INSULATED',
  description: 'Designed for high-intensity athletic training in extreme environments. Engineered with seamless compression fabric, advanced thermoregulatory weave, and anatomical support paths to optimize energy performance and maintain optimal core temperative equilibrium.',
  isNew: true,
  specs: {
    insulation: 'Dual-Layer Knit Heat-Retention Tech',
    membrane: 'FRZN-DRY™ High-Wicking Performance Fabric',
    temperatureRating: '-15°C to 15°C / 5°F to 59°F',
    weight: '145g (Size Medium)',
    waterproofRate: 'Zero-Chafe Hydrophobic Seamless Active Construct'
  }
};

export const NEW_COLLECTION_PRODUCTS: Product[] = [
  {
    id: 'aurora-silver',
    name: 'AURORA SILVER™',
    subName: 'REFLECTIVE LIQUID PUFFER JACKET',
    price: 249.99,
    img: '/src/assets/images/product_silver_puffer_1781668748984.jpg',
    colors: ['SILVER', 'WHITE', 'BLACK'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'INSULATED',
    description: 'Crafted from highly reflective microscopic glass microspheres locked into a weather-resistant metallic knit base. Highly windproof and fully vapor-permeable for extreme technical expeditions.',
    isNew: true,
    specs: {
      insulation: '800-Fill RDS Certified White Goose Down',
      membrane: 'Glass-Microbe Refraction Thermal Layer',
      temperatureRating: '-30°C to -5°C / -22°F to 23°F',
      weight: '870g (Size Medium)',
      waterproofRate: '20,000mm Resistance Rating'
    }
  },
  {
    id: 'stealth-black',
    name: 'STEALTH BLACK™',
    subName: 'HEAVY RESILIENT ARMOR PUFFER',
    price: 229.99,
    img: '/src/assets/images/stealth_black_natural_1781842841897.jpg',
    colors: ['BLACK', 'NAVY BLUE'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'SPEC-OPS',
    description: 'Tactical defense puffer integrated with Dyneema® composite fibers for unmatched abrasion resistance. Multi-pocket utility array, detachable internal harness system, and helmet-compatible dynamic storm hood.',
    isNew: false,
    specs: {
      insulation: 'PrimaLoft® Gold Active Bio Synthetic',
      membrane: 'Dyneema® Ultra-Reinforced Composite Shield',
      temperatureRating: '-25°C to -5°C / -13°F to 23°F',
      weight: '1150g (Size Medium)',
      waterproofRate: '35,000mm Extreme Wet-Weather Waterproofing'
    }
  },
  {
    id: 'icefield-blue',
    name: 'ICEFIELD BLUE™',
    subName: 'THERMO-REGULATING GLACIER PUFFER',
    price: 179.99,
    img: '/src/assets/images/product_ice_puffer_1781668784127.jpg',
    colors: ['ICE BLUE', 'SILVER', 'WHITE'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'SHELL',
    description: 'Engineered specifically for active glacial ascents and high-humidity alpine moisture. Highly compressible hydrophobic down insulation paired with an ultra-lightweight water-repellent ripstop nylon frame.',
    isNew: true,
    specs: {
      insulation: '800-Fill Hydrophobic Dry-Down Blend',
      membrane: 'Ripstop 15D Pertex Quantum Eco Shield',
      temperatureRating: '-20°C to 0°C / -4°F to 32°F',
      weight: '680g (Size Medium)',
      waterproofRate: '15,000mm Moisture Barrier Protection'
    }
  },
  {
    id: 'glacier-white',
    name: 'GLACIER WHITE™',
    subName: 'INSULATED WEATHER-SHIELD PUFFER',
    price: 239.99,
    img: '/src/assets/images/glacier_white_model_1781843175171.jpg',
    colors: ['WHITE', 'SILVER', 'BLACK'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'INSULATED',
    description: 'Minimalist alpine design tailored with internal climate chambers that trap body warmth efficiently while venting excessive vapor through side laser-cut gills. Fully optimized for Arctic storm winds.',
    isNew: false,
    specs: {
      insulation: '850-Fill Duck Down (90/10 Ratio)',
      membrane: 'GORE-TEX Pro 3-Layer Alpine Armor',
      temperatureRating: '-32°C to -8°C / -26°F to 18°F',
      weight: '900g (Size Medium)',
      waterproofRate: '30,000mm Deep Snow Waterproof Rating'
    }
  },
  {
    id: 'polar-gloss',
    name: 'POLAR GLOSS™',
    subName: 'HIGH-GLOSS MONOCHROME DOWN',
    price: 189.93,
    img: '/src/assets/images/polar_gloss_model_1781842042306.jpg', // custom generated stunning ultra high-gloss model image
    colors: ['BLUE GLOSS', 'BLACK GLOSS', 'WHITE GLOSS'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'SHELL',
    description: 'A striking mirror-like high-gloss lacquer finish shell that repels frost and elements instantly. Double hood construct and chunky oversized functional zippers that make a futuristic editorial statement.',
    isNew: true,
    specs: {
      insulation: '750-Fill Premium Clean Goose Down',
      membrane: 'Waterproof High-Gloss Lacquer Poly-Coating',
      temperatureRating: '-15°C to +5°C / 5°F to 41°F',
      weight: '790g (Size Medium)',
      waterproofRate: '12,000mm Light-Storm Shielding'
    }
  },
  {
    id: 'polar-white-shell',
    name: 'POLAR WHITE™ XL',
    subName: 'HEAVY SHIELD UTILITY DOWN',
    price: 299.99,
    img: '/src/assets/images/polar_white_dress_1781843377143.jpg', // custom generated Polar White high-fashion winter dress
    colors: ['WHITE', 'ICE BLUE'],
    sizes: ['M', 'L', 'XL'],
    category: 'SPEC-OPS',
    description: 'The crowning achievement of our Arctic research apparel. Double-insulated chambers with custom aerospace-grade aero-gel liners in critical shoulder and chest paths to minimize temperature degradation.',
    isNew: true,
    specs: {
      insulation: '900-Fill Ultra-Premium Polish鹅绒 (Goose Down)',
      membrane: 'Aerogel Thermal-Core + FRZN-TEX™ Active Outer',
      temperatureRating: '-45°C to -15°C / -49°F to 5°F',
      weight: '1280g (Size Medium)',
      waterproofRate: '40,000mm Absolute Glacier Defense'
    }
  }
];
