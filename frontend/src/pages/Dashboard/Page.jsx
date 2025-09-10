import React from 'react';
import PageHead from '../../components/DashComponents/PageHead';
import PublishPanel from '../../components/DashComponents/PublishPanel';
import TextEditor from '../../components/TextEditor';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import FooterCtaComp from '../../components/DashComponents/FooterCtaComp';
import SeoPanel from '../../components/DashComponents/SeoPanel';
import { usePageTitle } from '../../utils/pathName';
import {
  defaultAboutData,
  defaultIndustryData,
  defaultOtherServicesData,
  defaultSliderData,
  defaultTestimonialsData,
  defaultThreeBoxesData,
  defaultWhyChooseData,
  ThreeInputs,
  TwoInputs,
  tabsByTemplate,
  defaultGalleryBoxesData,
  defaultFiveBoxesData,
} from '../../lib/pageFields';
import HomeFields from '../../components/DashComponents/Slider/HomeFields';
import ServicesFields from '../../components/DashComponents/Slider/ServicesFields';
import TemplateDropdown from '../../components/DashComponents/TemplateDropdown';
import IndustryFields from '../../components/DashComponents/Slider/IndustryFields';
import ParentPageDropdown from '../../components/DashComponents/ParentPageDropdown';
import CustomMeta from '../../components/DashComponents/CustomMeta';
import PostMetaFields from '../../components/DashComponents/PostMetaFields';
import AboutUsFields from '../../components/DashComponents/Slider/AboutUsFields';
import { generateRandomPageId } from '../../utils/utils';
import LifeAtFields from '../../components/DashComponents/Slider/LifeAtFields';
import ExcerptsField from '../../components/DashComponents/ExcerptsField';

export const Page = () => {
  const navigate = useNavigate();

  const randomPageId = generateRandomPageId();

  const location = useLocation();

  const [postid, setPostId] = React.useState('');

  const [pageDate, setPageDate] = React.useState('');

  const [actionType, setActionType] = React.useState('');

  const [ctaField, setCtaField] = React.useState(false);

  const [templateField, setTemplateField] = React.useState('default');

  const [parentpageField, setParentPageField] = React.useState('');

  const [title, setTitle] = React.useState('');
  const [excerpts, setExcerpts] = React.useState('');

  const [editorContent, setEditorContent] = React.useState('{}');

  const [isLoading, setIsLoading] = React.useState(false);

  const [metaData, setMetaData] = React.useState({
    featuredImage: '',
  });

  const [homepageFields, setHomepageFields] = React.useState({
    slidersData: [defaultSliderData],
    aboutFields: [defaultAboutData],
    partnersLogoData: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [{ logoUrl: '', caseStudyUrl: '' }],
    },
    fiveBoxesData: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultFiveBoxesData],
    },
    industryTitle: '',
    industryData: [defaultIndustryData],
    whychooseTitle: '',
    whychooseData: [defaultWhyChooseData],
    testimonialsTitle: '',
    testimonialsData: [defaultTestimonialsData],
    blogTitle: '',
    threeBoxesData: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultThreeBoxesData],
    },
  });

  //Services Page Fields State
  const [servicesFields, setServicesFields] = React.useState({
    threeBoxesData: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultThreeBoxesData],
    },
    fiveBoxesData: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultFiveBoxesData],
    },

    threeBoxesData3: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultThreeBoxesData],
    },

    fiveinputsData: [defaultFiveBoxesData],
    otherservicesData: [defaultOtherServicesData],
  });

  //Industry Page Fields State
  const [industryState, setIndustryState] = React.useState({
    industryBox1Fields: [TwoInputs],
    industryBox2Fields: [ThreeInputs],
    industryBox3Fields: [ThreeInputs],
    industryBox4Fields: [ThreeInputs],
    industryBox5Fields: [ThreeInputs],
    industryBox6Fields: [ThreeInputs],
  });

  //Aboutus Page Fields State
  const [aboutusState, setAboutusState] = React.useState({
    partnersLogoData: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [{ logoUrl: '', caseStudyUrl: '' }],
    },
    threeBoxesData: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultThreeBoxesData],
    },
    fiveBoxesData: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultFiveBoxesData],
    },
    fiveBoxesData2: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultFiveBoxesData],
    },
    fiveBoxesData3: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultFiveBoxesData],
    },
  });

  //Lifeatbiz Page Fields State
  const [lifeatState, setLifeatState] = React.useState({
    threeBoxesData: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultThreeBoxesData],
    },
    threeBoxesData2: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultThreeBoxesData],
    },
    galleryBoxesData: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultGalleryBoxesData],
    },
    threeBoxesData3: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultThreeBoxesData],
    },
  });

  const [seoFields, setSeoFields] = React.useState({
    focusKeyphrase: '',
    seoTitle: '',
    seoDescription: '',
  });

  const [customMetaFields, setCustomMetaFields] = React.useState({
    customMetaTitle: '',
    customMetaDesc: '',
    customMetaLink: '',
    customMetaLinkText: '',
    customMetaLinkTwo: '',
    customMetaLinkTwoText: '',
    customMetaExtra: '',
    customMetaExtra2: '',
  });

  const [activeTab, setActiveTab] = React.useState(
    templateField === 'services'
      ? 'tab-servicesBox1'
      : templateField == 'homepage'
      ? 'tab-homeBox1'
      : templateField == 'industries'
      ? 'tab-industryBox1'
      : templateField == 'aboutus'
      ? 'tab-aboutusBox1'
      : templateField == 'lifeatbiz'
      ? 'tab-lifeatbizBox1'
      : ''
  );

  React.useEffect(() => {
    if (templateField) {
      setActiveTab(
        templateField === 'services'
          ? 'tab-servicesBox1'
          : templateField == 'homepage'
          ? 'tab-homeBox1'
          : templateField == 'industries'
          ? 'tab-industryBox1'
          : templateField == 'aboutus'
          ? 'tab-aboutusBox1'
          : templateField == 'lifeatbiz'
          ? 'tab-lifeatbizBox1'
          : ''
      );
    }
  }, [templateField]);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pageFromUrl = urlParams.get('page'); // fix here
    const pageAction = urlParams.get('action'); // fix here

    if (pageFromUrl) {
      setPostId(pageFromUrl);
      setActionType(pageAction);
    }
  }, [location]);

  const [searchParams] = useSearchParams();
  const isEditing = !!searchParams.get('action'); // or check both `page` and `action`

  React.useEffect(() => {
    if (!isEditing && actionType === 'edit') {
      setActionType('new');
      window.location.reload();
      // optional safety
    }
  }, [isEditing, actionType]);

  React.useEffect(() => {
    const fetchPage = async () => {
      if (!postid) return;
      setIsLoading(true);
      try {
        const res = await fetch(`/api/page/get/${postid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || 'Failed to fetch page data');
          return;
        }
        setIsLoading(false);

        setTitle(data.title);
        setExcerpts(data.excerpts);

        setTemplateField(data.template);

        setParentPageField(data.parentPage);

        setPageDate(data.updatedAt);

        const contentArray = data.content || [];

        setSeoFields(data?.seo);

        setCustomMetaFields(data?.customMetaFields);

        if (data.metaFields) {
          // Handle metaFields with proper defaults
          setMetaData({
            featuredImage: data.metaFields?.featuredImage || '',
          });
        }

        if (data?.editorJs) {
          try {
            const content =
              typeof data.editorJs === 'string'
                ? JSON.parse(data.editorJs) // safely parse stringified data
                : data.editorJs; // already parsed object

            setEditorContent(JSON.stringify(content));
          } catch (err) {
            console.error('Invalid editorJs format', err);
            setEditorContent(JSON.stringify({ blocks: [] })); // fallback to empty content
          }
        }

        //Industry
        const industryBox1Content = contentArray.find(
          (item) => item.type === 'industrybox1'
        );

        if (industryBox1Content?.data) {
          setIndustryState((prev) => ({
            ...prev,
            industryBox1Fields: industryBox1Content.data,
          }));
        }

        const industryBox2Content = contentArray.find(
          (item) => item.type === 'industrybox2'
        );

        if (industryBox2Content?.data) {
          setIndustryState((prev) => ({
            ...prev,
            industryBox2Fields: industryBox2Content.data,
          }));
        }

        const industryBox3Content = contentArray.find(
          (item) => item.type === 'industrybox3'
        );

        if (industryBox3Content?.data) {
          setIndustryState((prev) => ({
            ...prev,
            industryBox3Fields: industryBox3Content.data,
          }));
        }

        const industryBox4Content = contentArray.find(
          (item) => item.type === 'industrybox4'
        );

        if (industryBox4Content?.data) {
          setIndustryState((prev) => ({
            ...prev,
            industryBox4Fields: industryBox4Content.data,
          }));
        }

        const industryBox5Content = contentArray.find(
          (item) => item.type === 'industrybox5'
        );

        if (industryBox5Content?.data) {
          setIndustryState((prev) => ({
            ...prev,
            industryBox5Fields: industryBox5Content.data,
          }));
        }

        const industryBox6Content = contentArray.find(
          (item) => item.type === 'industrybox6'
        );

        if (industryBox6Content?.data) {
          setIndustryState((prev) => ({
            ...prev,
            industryBox6Fields: industryBox6Content.data,
          }));
        }

        //services
        const threeBoxesContent = contentArray.find(
          (item) => item.type === 'threeboxes'
        );

        const threeBoxes2Content = contentArray.find(
          (item) => item.type === 'threeboxes2'
        );

        const galleryBoxesContent = contentArray.find(
          (item) => item.type === 'galleryboxes'
        );

        const threeBoxes3Content = contentArray.find(
          (item) => item.type === 'threeboxes3'
        );

        const fiveinputsContent = contentArray.find(
          (item) => item.type === 'fiveinputs'
        );

        const otherServicesContent = contentArray.find(
          (item) => item.type === 'otherservices'
        );

        if (threeBoxesContent?.data) {
          setServicesFields((prev) => ({
            ...prev,
            threeBoxesData: {
              title: threeBoxesContent?.data?.title || '',
              subtitle: threeBoxesContent?.data?.subtitle || '',
              extratext: threeBoxesContent?.data?.extratext || '',
              items: threeBoxesContent?.data?.items || [],
            },
            fiveBoxesData: {
              title: fiveBoxesContent?.data?.title || '',
              subtitle: fiveBoxesContent?.data?.subtitle || '',
              extratext: fiveBoxesContent?.data?.extratext || '',
              items: fiveBoxesContent?.data?.items || [],
            },
            threeBoxesData3: {
              title: threeBoxes3Content?.data?.title || '',
              subtitle: threeBoxes3Content?.data?.subtitle || '',
              extratext: threeBoxes3Content?.data?.extratext || '',
              items: threeBoxes3Content?.data?.items || [],
            },
            fiveinputsData: fiveinputsContent?.data || [],
          }));

          setLifeatState((prev) => ({
            ...prev,
            threeBoxesData: {
              title: threeBoxesContent?.data?.title || '',
              subtitle: threeBoxesContent?.data?.subtitle || '',
              extratext: threeBoxesContent?.data?.extratext || '',
              items: threeBoxesContent?.data?.items || [],
            },
            threeBoxesData2: {
              title: threeBoxes2Content?.data?.title || '',
              subtitle: threeBoxes2Content?.data?.subtitle || '',
              extratext: threeBoxes2Content?.data?.extratext || '',
              items: threeBoxes2Content?.data?.items || [],
            },
            galleryBoxesData: {
              title: galleryBoxesContent?.data?.title || '',
              subtitle: galleryBoxesContent?.data?.subtitle || '',
              extratext: galleryBoxesContent?.data?.extratext || '',
              items: galleryBoxesContent?.data?.items || [],
            },
            threeBoxesData3: {
              title: threeBoxes3Content?.data?.title || '',
              subtitle: threeBoxes3Content?.data?.subtitle || '',
              extratext: threeBoxes3Content?.data?.extratext || '',
              items: threeBoxes3Content?.data?.items || [],
            },
          }));
        }

        //Aboutus
        const partnerslogoContent = contentArray.find(
          (item) => item.type === 'partnerslogo'
        );

        const fiveBoxesContent = contentArray.find(
          (item) => item.type === 'fiveboxes'
        );

        const fiveBoxesContent2 = contentArray.find(
          (item) => item.type === 'fiveboxes2'
        );

        const fiveBoxesContent3 = contentArray.find(
          (item) => item.type === 'fiveboxes3'
        );

        if (partnerslogoContent?.data) {
          setAboutusState((prev) => ({
            ...prev,
            partnersLogoData: {
              title: partnerslogoContent?.data?.title || '',
              subtitle: partnerslogoContent?.data?.subtitle || '',
              extratext: partnerslogoContent?.data?.extratext || '',
              items: partnerslogoContent?.data?.items || [],
            },
            threeBoxesData: {
              title: threeBoxesContent?.data?.title || '',
              subtitle: threeBoxesContent?.data?.subtitle || '',
              extratext: threeBoxesContent?.data?.extratext || '',
              items: threeBoxesContent?.data?.items || [],
            },
            fiveBoxesData: {
              title: fiveBoxesContent?.data?.title || '',
              subtitle: fiveBoxesContent?.data?.subtitle || '',
              extratext: fiveBoxesContent?.data?.extratext || '',
              items: fiveBoxesContent?.data?.items || [],
            },

            fiveBoxesData2: {
              title: fiveBoxesContent2?.data?.title || '',
              subtitle: fiveBoxesContent2?.data?.subtitle || '',
              extratext: fiveBoxesContent2?.data?.extratext || '',
              items: fiveBoxesContent2?.data?.items || [],
            },

            fiveBoxesData3: {
              title: fiveBoxesContent3?.data?.title || '',
              subtitle: fiveBoxesContent3?.data?.subtitle || '',
              extratext: fiveBoxesContent3?.data?.extratext || '',
              items: fiveBoxesContent3?.data?.items || [],
            },
          }));
        }

        if (otherServicesContent?.data) {
          setServicesFields((prev) => ({
            ...prev,
            otherservicesData: otherServicesContent.data,
          }));
        }

        //homepage
        const sliderContent = contentArray.find(
          (item) => item.type === 'slider'
        );

        const industryContent = contentArray.find(
          (item) => item.type === 'industry'
        );

        const whychooseContent = contentArray.find(
          (item) => item.type === 'whychoose'
        );

        const testimonialsContent = contentArray.find(
          (item) => item.type === 'testimonials'
        );

        if (sliderContent?.data) {
          setHomepageFields((prev) => ({
            ...prev,
            slidersData: sliderContent.data,

            partnersLogoData: {
              title: partnerslogoContent?.data?.title || '',
              subtitle: partnerslogoContent?.data?.subtitle || '',
              extratext: partnerslogoContent?.data?.extratext || '',
              items: partnerslogoContent?.data?.items || [],
            },
            fiveBoxesData: {
              title: fiveBoxesContent?.data?.title || '',
              subtitle: fiveBoxesContent?.data?.subtitle || '',
              extratext: fiveBoxesContent?.data?.extratext || '',
              items: fiveBoxesContent?.data?.items || [],
            },
            threeBoxesData: {
              title: threeBoxesContent?.data?.title || '',
              subtitle: threeBoxesContent?.data?.subtitle || '',
              extratext: threeBoxesContent?.data?.extratext || '',
              items: threeBoxesContent?.data?.items || [],
            },
          }));
        }

        if (industryContent?.data) {
          setHomepageFields((prev) => ({
            ...prev,
            industryTitle: industryContent.data.title || '',
            industryData: industryContent.data.items || [],
          }));
        }

        if (whychooseContent?.data) {
          setHomepageFields((prev) => ({
            ...prev,
            whychooseTitle: whychooseContent.data.title || '',
            whychooseData: whychooseContent.data.items || [],
          }));
        }

        if (testimonialsContent?.data) {
          setHomepageFields((prev) => ({
            ...prev,
            testimonialsTitle: testimonialsContent.data.title || '',
            testimonialsData: testimonialsContent.data.items || [],
          }));
        }

        const aboutContent = contentArray.find(
          (item) => item.type === 'aboutus'
        );
        if (aboutContent?.data) {
          setHomepageFields((prev) => ({
            ...prev,
            aboutFields: aboutContent.data,
          }));
        }

        const blogContent = contentArray.find((item) => item.type === 'blog');
        if (blogContent?.data) {
          setHomepageFields((prev) => ({
            ...prev,
            blogTitle: blogContent.data,
          }));
        }
        if (data?.footercta) {
          setCtaField(data?.footercta);
        }
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
      }
    };

    fetchPage();
  }, [postid]);

  const sectionsRef = React.useRef({
    slider: null,
    services: null,
    industry: null,
    whychoose: null,
    testimonials: null,
    ThreeBoxes: null,
    ThreeBoxes2: null,
    FiveBoxes: null,
    FiveBoxes2: null,
    FiveBoxes3: null,
    GalleryBoxes: null,
    ThreeBoxes3: null,
    fiveinputs: null,
    otherservices: null,
    industrybox2: null,
    industrybox3: null,
    industrybox4: null,
    industrybox6: null,
    partnersLogo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmUpdate = window.confirm(
      'Are you sure you want to update this page.'
    );
    if (!confirmUpdate) return;

    if (!title) {
      toast.error('Enter Page Title');
      return;
    } else if (!templateField) {
      toast.error('Select template');
      return;
    }

    //industries page
    const currentIndustryBox2Data =
      sectionsRef.current.industrybox2?.getIndustryBox2Data?.();
    const currentIndustryBox3Data =
      sectionsRef.current.industrybox3?.getIndustryBox3Data?.();

    const currentIndustryBox4Data =
      sectionsRef.current.industrybox4?.getIndustryBox4Data?.();

    const currentIndustryBox6Data =
      sectionsRef.current.industrybox6?.getIndustryBox6Data?.();

    //homepage
    const currentSliderData = sectionsRef.current.slider?.getSlidersData?.();
    const currentIndustryData =
      sectionsRef.current.industry?.getIndustryData?.();
    const currentWhychooseData =
      sectionsRef.current.whychoose?.getWhychooseData?.();
    const currentTestimonialsData =
      sectionsRef.current.testimonials?.getTestimonialsData?.();

    //services page
    const currentThreeBoxesData =
      sectionsRef.current.ThreeBoxes?.getThreeBoxesData?.();

    const currentThreeBoxesData2 =
      sectionsRef.current.ThreeBoxes2?.getThreeBoxesData?.();

    const currentGalleryBoxesData =
      sectionsRef.current.GalleryBoxes?.getGalleryBoxesData?.();

    const currentThreeBoxesData3 =
      sectionsRef.current.ThreeBoxes3?.getThreeBoxesData?.();

    const currentFiveInputsData = sectionsRef.current.fiveinputs?.getData?.();

    const currentOtherServicesData =
      sectionsRef.current.otherservices?.getOtherServicesData?.();

    //aboutus page
    const currentPartnersLogoData =
      sectionsRef.current.partnersLogo?.getData?.();

    const currentFiveBoxesData = sectionsRef.current.FiveBoxes?.getData?.();
    const currentFiveBoxesData2 = sectionsRef.current.FiveBoxes2?.getData?.();

    const currentFiveBoxesData3 = sectionsRef.current.FiveBoxes3?.getData?.();

    //select content as per template
    const getTemplateContent = () => {
      switch (templateField) {
        case 'homepage':
          return [
            {
              type: 'slider',
              data: currentSliderData,
            },
            {
              type: 'partnerslogo',
              data: {
                title: currentPartnersLogoData?.title || '',
                subtitle: currentPartnersLogoData?.subtitle || '',
                extratext: currentPartnersLogoData.extratext || '',
                items: currentPartnersLogoData?.items || [],
              },
            },
            {
              type: 'fiveboxes',
              data: {
                title: currentFiveBoxesData?.title || '',
                subtitle: currentFiveBoxesData?.subtitle || '',
                extratext: currentFiveBoxesData.extratext || '',
                items: currentFiveBoxesData?.items || [],
              },
            },
            {
              type: 'aboutus',
              data: homepageFields.aboutFields,
            },
            {
              type: 'industry',
              data: {
                title: homepageFields.industryTitle,
                items: currentIndustryData,
              },
            },
            {
              type: 'whychoose',
              data: {
                title: homepageFields.whychooseTitle,
                items: currentWhychooseData,
              },
            },
            {
              type: 'testimonials',
              data: {
                title: homepageFields.testimonialsTitle,
                items: currentTestimonialsData,
              },
            },
            {
              type: 'blog',
              data: homepageFields.blogTitle,
            },
            {
              type: 'threeboxes',
              data: {
                title: currentThreeBoxesData?.title || '',
                subtitle: currentThreeBoxesData?.subtitle || '',
                extratext: currentThreeBoxesData.extratext || '',
                items: currentThreeBoxesData?.items || [],
              },
            },
          ];

        case 'services':
          return [
            {
              type: 'threeboxes',
              data: {
                title: currentThreeBoxesData?.title || '',
                subtitle: currentThreeBoxesData?.subtitle || '',
                extratext: currentThreeBoxesData.extratext || '',
                items: currentThreeBoxesData?.items || [],
              },
            },
            {
              type: 'fiveboxes',
              data: {
                title: currentFiveBoxesData?.title || '',
                subtitle: currentFiveBoxesData?.subtitle || '',
                extratext: currentFiveBoxesData.extratext || '',
                items: currentFiveBoxesData?.items || [],
              },
            },

            {
              type: 'threeboxes3',
              data: {
                title: currentThreeBoxesData3?.title || '',
                subtitle: currentThreeBoxesData3?.subtitle || '',
                extratext: currentThreeBoxesData3.extratext || '',
                items: currentThreeBoxesData3?.items || [],
              },
            },

            {
              type: 'fiveinputs',
              data: currentFiveInputsData,
            },

            {
              type: 'otherservices',
              data: currentOtherServicesData,
            },
          ];

        case 'industries':
          return [
            {
              type: 'industrybox1',
              data: industryState.industryBox1Fields,
            },
            {
              type: 'industrybox2',
              data: currentIndustryBox2Data,
            },
            {
              type: 'industrybox3',
              data: currentIndustryBox3Data,
            },
            {
              type: 'industrybox4',
              data: currentIndustryBox4Data,
            },
            {
              type: 'industrybox5',
              data: industryState.industryBox5Fields,
            },
            {
              type: 'industrybox6',
              data: currentIndustryBox6Data,
            },
          ];

        case 'aboutus':
          return [
            {
              type: 'partnerslogo',
              data: {
                title: currentPartnersLogoData?.title || '',
                subtitle: currentPartnersLogoData?.subtitle || '',
                extratext: currentPartnersLogoData.extratext || '',
                items: currentPartnersLogoData?.items || [],
              },
            },
            {
              type: 'threeboxes',
              data: {
                title: currentThreeBoxesData?.title || '',
                subtitle: currentThreeBoxesData?.subtitle || '',
                extratext: currentThreeBoxesData.extratext || '',
                items: currentThreeBoxesData?.items || [],
              },
            },
            {
              type: 'fiveboxes',
              data: {
                title: currentFiveBoxesData?.title || '',
                subtitle: currentFiveBoxesData?.subtitle || '',
                extratext: currentFiveBoxesData.extratext || '',
                items: currentFiveBoxesData?.items || [],
              },
            },
            {
              type: 'fiveboxes2',
              data: {
                title: currentFiveBoxesData2?.title || '',
                subtitle: currentFiveBoxesData2?.subtitle || '',
                extratext: currentFiveBoxesData2.extratext || '',
                items: currentFiveBoxesData2?.items || [],
              },
            },
            {
              type: 'fiveboxes3',
              data: {
                title: currentFiveBoxesData3?.title || '',
                subtitle: currentFiveBoxesData3?.subtitle || '',
                extratext: currentFiveBoxesData3.extratext || '',
                items: currentFiveBoxesData3?.items || [],
              },
            },
          ];

        case 'lifeatbiz':
          return [
            {
              type: 'threeboxes',
              data: {
                title: currentThreeBoxesData?.title || '',
                subtitle: currentThreeBoxesData?.subtitle || '',
                extratext: currentThreeBoxesData.extratext || '',
                items: currentThreeBoxesData?.items || [],
              },
            },
            {
              type: 'threeboxes2',
              data: {
                title: currentThreeBoxesData2?.title || '',
                subtitle: currentThreeBoxesData2?.subtitle || '',
                extratext: currentThreeBoxesData2.extratext || '',
                items: currentThreeBoxesData2?.items || [],
              },
            },
            {
              type: 'galleryboxes',
              data: {
                title: currentGalleryBoxesData?.title || '',
                subtitle: currentGalleryBoxesData?.subtitle || '',
                extratext: currentGalleryBoxesData?.extratext || '',
                items: currentGalleryBoxesData?.items || [],
              },
            },
            {
              type: 'threeboxes3',
              data: {
                title: currentThreeBoxesData3?.title || '',
                subtitle: currentThreeBoxesData3?.subtitle || '',
                extratext: currentThreeBoxesData3.extratext || '',
                items: currentThreeBoxesData3?.items || [],
              },
            },
          ];

        default:
          return [];
      }
    };

    const payload = {
      title,
      excerpts,
      pageId: postid ? postid : randomPageId,
      template: templateField,
      parentPage: parentpageField,
      editorJs: JSON.parse(editorContent),
      footercta: ctaField,
      content: getTemplateContent(),
      seoFields: seoFields,
      metaFields: metaData,
      customMetaFields: customMetaFields,
    };

    if (postid || actionType === 'edit') {
      console.log('payload edit', payload);
      try {
        const res = await fetch(`/api/page/update/${postid}`, {
          method: 'PUT',
          cache: 'force-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        if (data.success) {
          toast.success('Page Updated');
          // navigate(`/dashboard/page-new?page=${postid}&action=edit`);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      // CREATE POST
      try {
        const res = await fetch('/api/page/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        if (data.success) {
          toast.success('Page Created');
          setActionType('edit');
          navigate(`/dashboard/new-page?page=${randomPageId}&action=edit`);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const pageName = usePageTitle(postid);
  const selectedTabs = tabsByTemplate[templateField] || [];
  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <PageHead
            parentpageField={parentpageField}
            templateField={templateField}
            title={title}
            setTitle={setTitle}
            postId={postid}
          />
          <TextEditor
            editorContent={editorContent}
            setEditorContent={setEditorContent}
          />
          {selectedTabs.length > 0 && (
            <div className="border border-gray-300 rounded-md">
              <div className="border-b border-gray-200 flex text-xs">
                {selectedTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 w-full text-left ${
                      activeTab === tab.id
                        ? 'bg-flamingo-500 text-white font-bold'
                        : 'font-normal'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {templateField === 'homepage' ? (
                <HomeFields
                  activeTab={activeTab}
                  sectionsRef={sectionsRef}
                  homepageFields={homepageFields}
                  setHomepageFields={setHomepageFields}
                />
              ) : templateField === 'services' ? (
                <ServicesFields
                  activeTab={activeTab}
                  sectionsRef={sectionsRef}
                  servicesFields={servicesFields}
                  setServicesFields={setServicesFields}
                />
              ) : templateField === 'industries' ? (
                <IndustryFields
                  activeTab={activeTab}
                  sectionsRef={sectionsRef}
                  industryState={industryState}
                  setIndustryState={setIndustryState}
                />
              ) : templateField === 'aboutus' ? (
                <AboutUsFields
                  activeTab={activeTab}
                  sectionsRef={sectionsRef}
                  aboutusState={aboutusState}
                  setAboutusState={setAboutusState}
                />
              ) : templateField === 'lifeatbiz' ? (
                <LifeAtFields
                  activeTab={activeTab}
                  sectionsRef={sectionsRef}
                  lifeatState={lifeatState}
                  setLifeatState={setLifeatState}
                />
              ) : null}
            </div>
          )}

          <div>
            <ExcerptsField excerpts={excerpts} setExcerpts={setExcerpts} />
          </div>

          <div>
            <SeoPanel
              seoFields={seoFields}
              setSeoFields={setSeoFields}
              pageName={pageName}
            />{' '}
          </div>
        </div>
        <div>
          <PublishPanel postid={postid} pageDate={pageDate} />
          <ParentPageDropdown
            parentpageField={parentpageField}
            setParentPageField={setParentPageField}
          />
          <FooterCtaComp ctaField={ctaField} setCtaField={setCtaField} />
          <TemplateDropdown
            templateField={templateField}
            setTemplateField={setTemplateField}
          />
          <CustomMeta
            customMetaFields={customMetaFields}
            setCustomMetaFields={setCustomMetaFields}
          />
          <PostMetaFields
            setMetaData={setMetaData}
            initialMetaData={metaData}
          />
        </div>
      </div>
    </form>
  );
};
