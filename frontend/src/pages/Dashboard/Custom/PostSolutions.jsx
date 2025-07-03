import React from 'react';
import PageHead from '../../../components/DashComponents/PageHead';
import PublishPanel from '../../../components/DashComponents/PublishPanel';
import TextEditor from '../../../components/TextEditor';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SeoPanel from '../../../components/DashComponents/SeoPanel';
import { usePageTitle } from '../../../utils/pathName';
import { defaultThreeBoxesData, tabsSolutions } from '../../../lib/pageFields';

import PostMetaFields from '../../../components/DashComponents/PostMetaFields';
import ParentPageDropdown from '../../../components/DashComponents/ParentPageDropdown';
import SolutionsFields from '../../../components/DashComponents/Slider/SolutionsFields';
import ExcerptsField from '../../../components/DashComponents/ExcerptsField';
import SolutionLinkField from '../../../components/DashComponents/SolutionLinkField';

export const PostSolutions = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [postid, setPostId] = React.useState('');

  const [pageDate, setPageDate] = React.useState('');

  const [actionType, setActionType] = React.useState('');

  const [templateField, setTemplateField] = React.useState('solutions');
  const [parentpageField, setParentPageField] = React.useState([]);

  const [title, setTitle] = React.useState('');
  const [excerpts, setExcerpts] = React.useState('');

  const [editorContent, setEditorContent] = React.useState('{}');

  const [metaData, setMetaData] = React.useState({
    featuredImage: '',
  });

  //Services Page Fields State
  const [solutionsFields, setSolutionsFields] = React.useState({
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
    threeBoxesData3: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultThreeBoxesData],
    },
    threeBoxesData4: {
      title: '',
      subtitle: '',
      extratext: '',
      items: [defaultThreeBoxesData],
    },
    twoLinksData: {
      link1: '',
      link2: '',
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
    templateField === 'solutions' ? 'tab-solutionBox1' : null
  );

  React.useEffect(() => {
    if (templateField) {
      setActiveTab(templateField === 'solutions' ? 'tab-solutionBox1' : null);
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
        const res = await fetch(`/api/solutions/get/${postid}`, {
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

        const solutionTwoLinksContent = contentArray.find(
          (item) => item.type === 'linkboxes'
        );

        const solutionBox1Content = contentArray.find(
          (item) => item.type === 'threeboxes'
        );

        const solutionBox2Content = contentArray.find(
          (item) => item.type === 'threeboxes2'
        );

        const solutionBox3Content = contentArray.find(
          (item) => item.type === 'threeboxes3'
        );

        const solutionBox4Content = contentArray.find(
          (item) => item.type === 'threeboxes4'
        );

        if (solutionBox1Content?.data) {
          setSolutionsFields((prev) => ({
            ...prev,
            threeBoxesData: {
              title: solutionBox1Content?.data?.title || '',
              subtitle: solutionBox1Content?.data?.subtitle || '',
              extratext: solutionBox1Content?.data?.extratext || '',
              items: solutionBox1Content?.data?.items || [],
            },
            threeBoxesData2: {
              title: solutionBox2Content?.data?.title || '',
              subtitle: solutionBox2Content?.data?.subtitle || '',
              extratext: solutionBox2Content?.data?.extratext || '',
              items: solutionBox2Content?.data?.items || [],
            },
            threeBoxesData3: {
              title: solutionBox3Content?.data?.title || '',
              subtitle: solutionBox3Content?.data?.subtitle || '',
              extratext: solutionBox3Content?.data?.extratext || '',
              items: solutionBox3Content?.data?.items || [],
            },
            threeBoxesData4: {
              title: solutionBox4Content?.data?.title || '',
              subtitle: solutionBox4Content?.data?.subtitle || '',
              extratext: solutionBox4Content?.data?.extratext || '',
              items: solutionBox4Content?.data?.items || [],
            },

            twoLinksData: {
              link1: solutionTwoLinksContent?.data?.link1 || '',
              link2: solutionTwoLinksContent?.data?.link2 || '',
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
    ThreeBoxes: null,
    ThreeBoxes2: null,
    ThreeBoxes3: null,
    ThreeBoxes4: null,
    LinkBoxes: null,
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

    const currentTwoLinksBoxesData = sectionsRef.current.LinkBoxes?.getData?.();

    const currentThreeBoxesData =
      sectionsRef.current.ThreeBoxes?.getThreeBoxesData?.();

    const currentThreeBoxesData2 =
      sectionsRef.current.ThreeBoxes2?.getThreeBoxesData?.();

    const currentThreeBoxesData3 =
      sectionsRef.current.ThreeBoxes3?.getThreeBoxesData?.();

    const currentThreeBoxesData4 =
      sectionsRef.current.ThreeBoxes4?.getThreeBoxesData?.();

    const randomPageId = Math.floor(1000 + Math.random() * 9000); // 4-digit number

    // You can customize this part with a different structure for non-homepage templates
    const solutionTemplateContent = [
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
        type: 'threeboxes3',
        data: {
          title: currentThreeBoxesData3?.title || '',
          subtitle: currentThreeBoxesData3?.subtitle || '',
          extratext: currentThreeBoxesData3.extratext || '',
          items: currentThreeBoxesData3?.items || [],
        },
      },
      {
        type: 'threeboxes4',
        data: {
          title: currentThreeBoxesData4?.title || '',
          subtitle: currentThreeBoxesData4?.subtitle || '',
          extratext: currentThreeBoxesData4.extratext || '',
          items: currentThreeBoxesData4?.items || [],
        },
      },

      {
        type: 'linkboxes',
        data: {
          link1: currentTwoLinksBoxesData?.link1 || '',
          link2: currentTwoLinksBoxesData?.link2 || '',
        },
      },
    ];

    const payload = {
      title,
      excerpts,
      pageId: postid ? postid : randomPageId,
      template: 'solutions',
      parentPage: parentpageField,
      editorJs: JSON.parse(editorContent),
      content: solutionTemplateContent,
      seoFields: seoFields,
      metaFields: metaData,
      customMetaFields: customMetaFields,
    };

    if (postid || actionType === 'edit') {
      console.log('payload edit', payload);

      try {
        const res = await fetch(`/api/solutions/update/${postid}`, {
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
        const res = await fetch('/api/solutions/create', {
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
          navigate(`/dashboard/new-solution?page=${randomPageId}&action=edit`);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const pageName = usePageTitle(postid);

  const selectedTabs = tabsSolutions;

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

          {selectedTabs && (
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

              <SolutionsFields
                activeTab={activeTab}
                sectionsRef={sectionsRef}
                solutionsFields={solutionsFields}
                setSolutionsFields={setSolutionsFields}
              />
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
          <PublishPanel type="solutions" postid={postid} pageDate={pageDate} />
          <ParentPageDropdown
            parentpageField={parentpageField}
            setParentPageField={setParentPageField}
          />
          <PostMetaFields
            setMetaData={setMetaData}
            initialMetaData={metaData}
          />
          <SolutionLinkField
            ref={(el) => (sectionsRef.current.LinkBoxes = el)}
            twoLinksData={solutionsFields?.twoLinksData}
          />
        </div>
      </div>
    </form>
  );
};
