export interface ChapterData {
  id: string;
  index: number;
  time: string;
  label: string;
  titleLines: string[];
  subtitle?: string;
  narrative?: string;
  meta: string;
  theme: 'light' | 'dark';
  menuItems?: Array<{
    name: string;
    description: string;
    price: string;
  }>;
}

export const CHAPTERS: ChapterData[] = [
  {
    id: 'dawn',
    index: 0,
    time: '06:42 AM',
    label: 'BEFORE THE FIRST CUP',
    titleLines: ['BEFORE THE', 'FIRST CUP.'],
    subtitle: 'Quiet architecture before the doors open.',
    narrative: 'The espresso machine rests cold. Travertine and light oak hold the first pale blue light. Nothing has begun yet.',
    meta: 'DAWN · 06:42 AM',
    theme: 'light',
  },
  {
    id: 'first-table',
    index: 1,
    time: '07:03 AM',
    label: 'FIRST TABLE',
    titleLines: ['FIRST TABLE.'],
    subtitle: 'The lock turns. The day enters.',
    narrative: 'A solitary reader takes the table by the steel-framed window. Steam rises from the first extraction of the morning.',
    meta: 'OPENING · 07:03 AM',
    theme: 'light',
  },
  {
    id: 'breakfast',
    index: 2,
    time: '08:15 AM',
    label: 'BREAKFAST',
    titleLines: ['BREAKFAST.'],
    subtitle: 'Fresh bread. Pour-over coffee. Soft linen.',
    narrative: 'Warm sourdough, cultured butter, soft poached eggs, and single-origin filter coffee roasted forty-eight hours ago.',
    meta: 'KITCHEN · 07:00 — 11:00',
    theme: 'light',
    menuItems: [
      {
        name: 'EGGS & TOAST',
        description: 'Two poached farm eggs · toasted wild yeast sourdough · cultured Normandy butter · sea salt',
        price: '€11.50',
      },
      {
        name: 'POUR-OVER COFFEE',
        description: 'Single-origin washed Ethiopian Yirgacheffe · notes of bergamot, peach blossom & jasmine',
        price: '€5.80',
      },
      {
        name: 'RICOTTA & BLOOD ORANGE',
        description: 'Whipped sheep ricotta · blood orange slices · raw lavender honey · toasted buckwheat',
        price: '€12.00',
      },
    ],
  },
  {
    id: 'work-study',
    index: 3,
    time: '10:27 AM',
    label: 'WORK / STUDY',
    titleLines: ['WORK.', 'STUDY.', 'MEET.'],
    subtitle: 'For the hours between everything else.',
    narrative: 'A laptop screen glowing softly against oak grain. Ceramic mugs refilled in quiet rhythm. Conversations held at a whisper.',
    meta: 'STUDY · 10:27 AM',
    theme: 'light',
  },
  {
    id: 'lunch',
    index: 4,
    time: '01:16 PM',
    label: 'LUNCH',
    titleLines: ['LUNCH.'],
    subtitle: 'The kitchen at full warmth.',
    narrative: 'Chef hands arranging charred greens, warm pulses, and reduced broths. Crisp glassware catching the high noon sunlight.',
    meta: 'KITCHEN · 12:00 — 15:30',
    theme: 'light',
    menuItems: [
      {
        name: 'CHARRED LEEKS & STRACCIATELLA',
        description: 'Wood-fired baby leeks · fresh stracciatella · toasted hazelnut emulsion · herb oil',
        price: '€15.00',
      },
      {
        name: 'ROASTED DELICATA SQUASH',
        description: 'Ancient farro grain · whipped goat curd · crisp sage · pickled shallot reduction',
        price: '€16.50',
      },
      {
        name: 'HOUSE HERBAL TONIC',
        description: 'Lemon verbena · white tea infusion · fresh ginger · elderflower sparkling reduction',
        price: '€6.50',
      },
    ],
  },
  {
    id: 'slow-hour',
    index: 5,
    time: '04:38 PM',
    label: 'THE SLOW HOUR',
    titleLines: ['SOME HOURS', 'ARE MEANT', 'TO BE SLOWER.'],
    subtitle: 'WHY WE EXIST',
    narrative: 'We wanted to make a place where coffee wasn’t something you rushed through. Where the light slants low across the floor and time softens its pace.',
    meta: 'PAUSE · 04:38 PM',
    theme: 'light',
  },
  {
    id: 'evening',
    index: 6,
    time: '07:12 PM',
    label: 'EVENING',
    titleLines: ['EVENING.'],
    subtitle: 'DRINKS & DESSERT',
    narrative: 'Warm amber brass fixtures illuminate murmuring tables. Low-intervention natural wines poured, espresso martinis shaken, and plates of fresh tiramisu shared.',
    meta: 'APÉRITIF · 18:00 — 22:00',
    theme: 'dark',
    menuItems: [
      {
        name: 'ESPRESSO TIRAMISU',
        description: 'Savoiardi soaked in house espresso & dark rum · mascarpone sabayon · Valrhona cocoa',
        price: '€9.50',
      },
      {
        name: 'NATURAL PET-NAT WINE',
        description: 'Organic ancestral method white · Loire Valley · notes of orchard pears & brioche',
        price: '€8.50',
      },
      {
        name: 'FIG LEAF INFUSED NEGRONI',
        description: 'Botanical gin · sweet vermouth · fig leaf amaro · charred orange peel',
        price: '€13.00',
      },
    ],
  },
  {
    id: 'closing',
    index: 7,
    time: '09:47 PM',
    label: 'AFTER THE LAST TABLE',
    titleLines: ['AFTER', 'THE LAST', 'TABLE.'],
    subtitle: 'The day comes to quiet rest.',
    narrative: 'Empty tables. One glass with an olive stone. A napkin folded on oak. Traces of laughter, solitude, and unhurried time.',
    meta: 'NIGHT · 09:47 PM',
    theme: 'dark',
  },
];

export const FULL_MENU = {
  breakfast: [
    { name: 'Poached Eggs & Wild Sourdough', desc: 'Herb oil · cultured sea-salt butter', price: '€11.50' },
    { name: 'Whipped Ricotta & Citrus', desc: 'Raw comb honey · toasted buckwheat · thyme', price: '€12.00' },
    { name: 'Stoneground Steel-Cut Oats', desc: 'Roasted hazelnuts · baked apples · date caramel', price: '€9.50' },
    { name: 'House Granola & Greek Curd', desc: 'Spiced pumpkin seeds · dried sour cherries', price: '€8.50' },
  ],
  lunch: [
    { name: 'Charred Leeks & Stracciatella', desc: 'Hazelnut emulsion · micro chervil', price: '€15.00' },
    { name: 'Roasted Delicata Squash', desc: 'Ancient farro · goat curd · crispy sage', price: '€16.50' },
    { name: 'Sourdough Tartine with Smoked Trout', desc: 'Pickled mustard seeds · dill crema', price: '€14.50' },
    { name: 'Braised Green Lentil Bowl', desc: 'Soft hen egg · charred greens · smoked chili butter', price: '€13.50' },
  ],
  coffee: [
    { name: 'Espresso', desc: 'Single origin · rotating monthly micro-lot', price: '€3.50' },
    { name: 'Filter / Batch Brew', desc: 'Clean, tea-like clarity · light roast', price: '€4.50' },
    { name: 'Pour-Over (V60)', desc: 'Hand-poured single estate release', price: '€5.80' },
    { name: 'Flat White / Oat Milk', desc: 'Micro-foamed whole or oat milk', price: '€4.50' },
    { name: 'Cold Extraction', desc: 'Brewed 18 hours · served on hand-cut ice', price: '€5.00' },
  ],
  evening: [
    { name: 'Espresso Tiramisu', desc: 'Single-origin espresso sabayon · Valrhona 70%', price: '€9.50' },
    { name: 'Almond & Olive Oil Cake', desc: 'Orange blossom cream · candied lemon peel', price: '€8.00' },
    { name: 'Natural Orange Wine', desc: 'Macerated pinot gris · Alsace · mineral finish', price: '€9.00' },
    { name: 'Botanical Amaro Spritz', desc: 'House bitter herbal liqueur · sparkling tonic', price: '€11.00' },
  ],
};
