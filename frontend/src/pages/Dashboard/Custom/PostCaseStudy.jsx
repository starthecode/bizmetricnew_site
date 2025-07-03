import React from 'react';
import PageHead from '../../../components/DashComponents/PageHead';
import PublishPanel from '../../../components/DashComponents/PublishPanel';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SeoPanel from '../../../components/DashComponents/SeoPanel';
import { usePageTitle } from '../../../utils/pathName';
import { defaultThreeBoxesData, tabsByTemplate } from '../../../lib/pageFields';

import PostMetaFields from '../../../components/DashComponents/PostMetaFields';
import ParentPageDropdown from '../../../components/DashComponents/ParentPageDropdown';
import ExcerptsField from '../../../components/DashComponents/ExcerptsField';
import CaseStudiesFields from '../../../components/DashComponents/Slider/CaseStudiesFields';

export const PostCaseStudy = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [postid, setPostId] = React.useState('');

  const [pageDate, setPageDate] = React.useState('');

  const [actionType, setActionType] = React.useState('');

  const [templateField, setTemplateField] = React.useState('casestudies');
  const [parentpageField, setParentPageField] = React.useState([]);

  const [title, setTitle] = React.useState('');
  const [excerpts, setExcerpts] = React.useState('');

  const [metaData, setMetaData] = React.useState({
    featuredImage: '',
  });

  //Services Page Fields State
  const [casestudiesFields, setCaseStudiesFields] = React.useState({
    inputBoxesData: {
      title: '',
      subtitle: '',
      extratext: '',
      inputarea: '',
    },

    inputBoxesData2: {
      title: '',
      subtitle: '',
      extratext: '',
      inputarea: '',
    },

    inputBoxesData3: {
      title: '',
      subtitle: '',
      extratext: '',
      inputarea: '',
    },

    threeBoxesData: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultThreeBoxesData],
    },
    inputBoxesData4: {
      title: '',
      subtitle: '',
      extratext: '',
      inputarea: '',
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
  });

  const [activeTab, setActiveTab] = React.useState(
    templateField === 'casestudies' ? 'tab-casestudiesBox1' : null
  );

  React.useEffect(() => {
    if (templateField) {
      setActiveTab(
        templateField === 'casestudies' ? 'tab-casestudiesBox1' : null
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

      try {
        const res = await fetch(`/api/casestudies/get/${postid}`, {
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

        const casestudiesBox1Content = contentArray.find(
          (item) => item.type === 'inputboxes'
        );

        const casestudiesBox2Content = contentArray.find(
          (item) => item.type === 'inputboxes2'
        );

        const casestudiesBox3Content = contentArray.find(
          (item) => item.type === 'inputboxes3'
        );

        const casestudiesBox4Content = contentArray.find(
          (item) => item.type === 'threeboxes'
        );

        const casestudiesBox5Content = contentArray.find(
          (item) => item.type === 'inputboxes4'
        );

        if (casestudiesBox1Content?.data) {
          setCaseStudiesFields((prev) => ({
            ...prev,
            inputBoxesData: {
              title: casestudiesBox1Content?.data?.title || '',
              subtitle: casestudiesBox1Content?.data?.subtitle || '',
              extratext: casestudiesBox1Content?.data?.extratext || '',
              inputarea: casestudiesBox1Content?.data?.inputarea || '',
            },

            inputBoxesData2: {
              title: casestudiesBox2Content?.data?.title || '',
              subtitle: casestudiesBox2Content?.data?.subtitle || '',
              extratext: casestudiesBox2Content?.data?.extratext || '',
              inputarea: casestudiesBox2Content?.data?.inputarea || '',
            },

            inputBoxesData3: {
              title: casestudiesBox3Content?.data?.title || '',
              subtitle: casestudiesBox3Content?.data?.subtitle || '',
              extratext: casestudiesBox3Content?.data?.extratext || '',
              inputarea: casestudiesBox3Content?.data?.inputarea || '',
            },

            threeBoxesData: {
              title: casestudiesBox4Content?.data?.title || '',
              subtitle: casestudiesBox4Content?.data?.subtitle || '',
              extratext: casestudiesBox4Content?.data?.extratext || '',
              items: casestudiesBox4Content?.data?.items || [],
            },
            inputBoxesData4: {
              title: casestudiesBox5Content?.data?.title || '',
              subtitle: casestudiesBox5Content?.data?.subtitle || '',
              extratext: casestudiesBox5Content?.data?.extratext || '',
              inputarea: casestudiesBox5Content?.data?.inputarea || '',
            },
          }));
        }
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
      }
    };

    fetchPage();
  }, [postid]);

  const sectionsRef = React.useRef({
    InputBoxes: null,
    InputBoxes2: null,
    InputBoxes3: null,
    ThreeBoxes: null,
    InputBoxes4: null,
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
    }

    const currentInputBoxesData = sectionsRef.current.InputBoxes?.getData?.();

    const currentInputBoxesData2 = sectionsRef.current.InputBoxes2?.getData?.();

    const currentInputBoxesData3 = sectionsRef.current.InputBoxes3?.getData?.();

    const currentInputBoxesData4 =
      sectionsRef.current.ThreeBoxes?.getThreeBoxesData?.();

    const currentInputBoxesData5 = sectionsRef.current.InputBoxes4?.getData?.();

    const randomPageId = Math.floor(1000 + Math.random() * 9000); // 4-digit number

    // You can customize this part with a different structure for non-homepage templates
    const casestudiesTemplateContent = [
      {
        type: 'inputboxes',
        data: {
          title: currentInputBoxesData?.title || '',
          subtitle: currentInputBoxesData?.subtitle || '',
          extratext: currentInputBoxesData.extratext || '',
          inputarea: currentInputBoxesData?.inputarea || '',
        },
      },

      {
        type: 'inputboxes2',
        data: {
          title: currentInputBoxesData2?.title || '',
          subtitle: currentInputBoxesData2?.subtitle || '',
          extratext: currentInputBoxesData2.extratext || '',
          inputarea: currentInputBoxesData2?.inputarea || '',
        },
      },

      {
        type: 'inputboxes3',
        data: {
          title: currentInputBoxesData3?.title || '',
          subtitle: currentInputBoxesData3?.subtitle || '',
          extratext: currentInputBoxesData3.extratext || '',
          inputarea: currentInputBoxesData3?.inputarea || '',
        },
      },

      {
        type: 'threeboxes',
        data: {
          title: currentInputBoxesData4?.title || '',
          subtitle: currentInputBoxesData4?.subtitle || '',
          extratext: currentInputBoxesData4.extratext || '',
          items: currentInputBoxesData4?.items || [],
        },
      },

      {
        type: 'inputboxes4',
        data: {
          title: currentInputBoxesData5?.title || '',
          subtitle: currentInputBoxesData5?.subtitle || '',
          extratext: currentInputBoxesData5.extratext || '',
          inputarea: currentInputBoxesData5?.inputarea || '',
        },
      },
    ];

    const payload = {
      title,
      excerpts,
      pageId: postid ? postid : randomPageId,
      template: 'casestudies',
      parentPage: parentpageField,
      content: casestudiesTemplateContent,
      seoFields: seoFields,
      metaFields: metaData,
      customMetaFields: customMetaFields,
    };

    if (postid || actionType === 'edit') {
      console.log('payload edit', payload);

      try {
        const res = await fetch(`/api/casestudies/update/${postid}`, {
          method: 'PUT',
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
        const res = await fetch('/api/casestudies/create', {
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
          navigate(`/dashboard/new-casestudy?page=${randomPageId}&action=edit`);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const pageName = usePageTitle(postid);

  const selectedTabs = tabsByTemplate[templateField] || [];

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

          {selectedTabs && (
            <div className="border border-gray-300 rounded-md mt-10">
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

              {templateField === 'casestudies' ? (
                <CaseStudiesFields
                  activeTab={activeTab}
                  sectionsRef={sectionsRef}
                  casestudiesFields={casestudiesFields}
                />
              ) : (
                ''
              )}
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
          <PublishPanel
            type="casestudies"
            postid={postid}
            pageDate={pageDate}
          />
          <ParentPageDropdown
            parentpageField={parentpageField}
            setParentPageField={setParentPageField}
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
