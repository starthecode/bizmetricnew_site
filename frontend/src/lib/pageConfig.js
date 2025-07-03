// pageConfig.js

import AboutComp from '../components/DashComponents/Slider/AboutComp';
import ServicesComp from '../components/DashComponents/Slider/ServicesComp';
import IndustryComp from '../components/DashComponents/Slider/IndustryComp';
import WhychooseComp from '../components/DashComponents/Slider/WhychooseComp';
import BlogComp from '../components/DashComponents/Slider/BlogComp';
import TestimonialsComp from '../components/DashComponents/Slider/TestimonialsComp';
import SliderForm from '../components/DashComponents/Slider/SliderComp';
import PartnerComp from '../components/DashComponents/Slider/PartnerComp';

export const SECTION_COMPONENTS = {
  SliderForm,
  PartnerComp,
  AboutComp,
  ServicesComp,
  IndustryComp,
  WhychooseComp,
  BlogComp,
  TestimonialsComp,
  // ... add all other components here
};

export const PAGE_CONFIG = {
  homepage: {
    title: 'Homepage',
    sections: [
      { type: 'slider', component: 'SliderForm' },
      { type: 'partner', component: 'PartnerComp' },
      { type: 'aboutus', component: 'AboutComp' },
      { type: 'services', component: 'ServicesComp' },
      { type: 'industry', component: 'IndustryComp' },
      { type: 'whychoose', component: 'WhychooseComp' },
      { type: 'blog', component: 'BlogComp' },
      { type: 'testimonials', component: 'TestimonialsComp' },
    ],
  },
  services: {
    title: 'Services',
    sections: [
      { type: 'services', component: 'ServicesComp' },
      { type: 'testimonials', component: 'TestimonialsComp' },
    ],
  },
  // ... add other page types as needed
};
