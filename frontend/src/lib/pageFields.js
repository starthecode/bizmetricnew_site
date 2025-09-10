// pageFields.js

//Industry Page Fields
export const TwoInputs = {
  textInput1: '',
  textInput2: '',
};

export const ThreeInputs = {
  textInput1: '',
  textInput2: '',
  textInput3: '',
};

//services page fields

export const defaultThreeBoxesData = {
  threeboxesinput1: '',
  threeboxesinput2: '',
  threeboxesinput3: '',
};

export const defaultFiveBoxesData = {
  fiveboxesinput1: '',
  fiveboxesinput2: '',
  fiveboxesinput3: '',
  fiveboxesinput4: '',
  fiveboxesinput5: '',
};

export const defaultGalleryBoxesData = {
  galleryboxesinput1: '',
  galleryboxesinput2: '',
  galleryboxesfile: [
    {
      imageLink: '',
      imageName: '',
    },
  ],
};

export const defaultOtherServicesData = {
  otherservicesInput1: '',
  otherservicesInput2: '',
  otherservicesInput3: '',
  otherservicesInput4: '',
};

//services page fields end
export const defaultSliderData = {
  sliderImage: null,
  smallText: '',
  titleText: '',
  subText: '',
  subTextTwo: '',
  subTextThree: '',
  buttonText: '',
  buttonUrl: '',
  buttonTextTwo: '',
  buttonUrlTwo: '',
  customClass: '',
  customClassTwo: '',
  isCustom: '',
};

export const defaultAboutData = {
  smallTitle: '',
  aboutTitle: '',
  embedField: '',
  descField: '',
  buttonText: '',
  buttonUrl: '',
  moreField: '',
};

export const defaultIndustryData = {
  industryIcon: '',
  industryName: '',
  industryId: '',
};

export const defaultWhyChooseData = {
  whychooseIcon: '',
  whychooseName: '',
  whychooseSubName: '',
  whychooseBtnName: '',
  whychooseBtnUrl: '',
  whychooseImage: '',
};

export const defaultTestimonialsData = {
  testimonialsImage: '',
  testimonialsName: '',
  testimonialsSubName: '',
  testimonialsSubText: '',
};

export const getContentByTemplate = (
  template,
  {
    currentSliderData = [],
    partnerTitle = '',
    currentPartnerData = [],
    servicesTitle = '',
    currentServicesData = [],
    aboutFields = {},
    industryTitle = '',
    currentIndustryData = [],
    whychooseTitle = '',
    currentWhychooseData = [],
    testimonialsTitle = '',
    currentTestimonialsData = [],
    blogTitle = '',
  } = {}
) => {
  switch (template) {
    case 'homepage':
      return [
        { type: 'slider', data: currentSliderData },
        {
          type: 'partner',
          data: { title: partnerTitle, items: currentPartnerData },
        },
        {
          type: 'services',
          data: { title: servicesTitle, items: currentServicesData },
        },
        { type: 'aboutus', data: aboutFields },
        {
          type: 'industry',
          data: { title: industryTitle, items: currentIndustryData },
        },
        {
          type: 'whychoose',
          data: { title: whychooseTitle, items: currentWhychooseData },
        },
        {
          type: 'testimonials',
          data: { title: testimonialsTitle, items: currentTestimonialsData },
        },
        { type: 'blog', data: blogTitle },
      ];

    case 'services':
      return [
        {
          type: 'services',
          data: { title: servicesTitle, items: currentServicesData },
        },
        { type: 'aboutus', data: aboutFields },
      ];

    case 'subservices':
      return [
        {
          type: 'services',
          data: { title: servicesTitle, items: currentServicesData },
        },
        {
          type: 'testimonials',
          data: { title: testimonialsTitle, items: currentTestimonialsData },
        },
      ];

    default:
      return [];
  }
};

export const tabsSolutions = [
  { id: 'tab-solutionBox1', label: 'Solution Section One' },
  { id: 'tab-solutionBox2', label: 'Solution Section TWo' },
  { id: 'tab-solutionBox3', label: 'Solution Section Three' },
  { id: 'tab-solutionBox4', label: 'Solution Section Four' },
];

// Dynamic tab generator for dashboard pages
const generateTabs = (prefix, labelBase, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: `tab-${prefix}${i + 1}`,
    label: `${labelBase} ${i + 1}`,
  }));

export const tabsByTemplate = {
  homepage: generateTabs('homeBox', 'Home Box', 9),
  services: generateTabs('servicesBox', 'Services Box', 5),
  industries: generateTabs('industryBox', 'Industry Box', 6),
  aboutus: generateTabs('aboutusBox', 'Aboutus Box', 8),
  lifeatbiz: generateTabs('lifeatbizBox', 'Life At Box', 4),
  casestudies: generateTabs('casestudiesBox', 'Case Studies Box', 5),
};
