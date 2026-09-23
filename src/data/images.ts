import imgDawn from '../assets/images/cafe_dawn_empty_1790141130133.jpg';
import imgMorning from '../assets/images/cafe_morning_table_1790141141907.jpg';
import imgBreakfast from '../assets/images/cafe_breakfast_spread_1790141151467.jpg';
import imgSlowHour from '../assets/images/cafe_slow_hour_1790141161867.jpg';
import imgEvening from '../assets/images/cafe_evening_gathering_1790141174881.jpg';

export interface ChapterPhotoAsset {
  src: string;
  alt: string;
  detailSrc?: string;
  detailAlt?: string;
}

export const IMAGES: Record<string, ChapterPhotoAsset> = {
  dawn: {
    src: imgDawn,
    alt: 'Empty architectural café with light oak tables and morning dawn light before opening',
  },
  'first-table': {
    src: imgMorning,
    alt: 'First customer quietly reading by steel-framed window with espresso at 07:03 AM',
  },
  breakfast: {
    src: imgBreakfast,
    alt: 'Artisanal sourdough toast with poached eggs, fresh butter, and pour-over coffee on light oak table',
  },
  'work-study': {
    src: imgMorning,
    alt: 'Quiet morning workspace near sunlit window with notebook, coffee cup, and calm light',
    detailSrc: imgBreakfast,
    detailAlt: 'Warm ceramic cup and fresh breakfast detail',
  },
  lunch: {
    src: imgBreakfast,
    alt: 'Tactile kitchen preparation with fresh organic ingredients and artisanal plates',
    detailSrc: imgSlowHour,
    detailAlt: 'Sunlit café table and lunch glassware',
  },
  'slow-hour': {
    src: imgSlowHour,
    alt: 'Late afternoon 04:38 PM golden hour with long shadows across empty oak tables and solitary cup',
  },
  evening: {
    src: imgEvening,
    alt: 'Intimate evening gathering with warm glowing pendant lights, natural wine, and lively conversation',
  },
  closing: {
    src: imgDawn,
    alt: 'Quiet café at night after closing, empty tables reflecting twilight in symmetrical stillness',
  },
};
