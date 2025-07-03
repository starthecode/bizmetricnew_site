import React from 'react';
import PageHead from '../../../components/DashComponents/PageHead';
import PublishPanel from '../../../components/DashComponents/PublishPanel';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SeoPanel from '../../../components/DashComponents/SeoPanel';
import { usePageTitle } from '../../../utils/pathName';
import PostMetaFields from '../../../components/DashComponents/PostMetaFields';
import ParentPageDropdown from '../../../components/DashComponents/ParentPageDropdown';
import ExcerptsField from '../../../components/DashComponents/ExcerptsField';
import EmbedContentField from '../../../components/DashComponents/EmbedContentField';
import ExtraInputFields from '../../../components/DashComponents/ExtraInputFields';

export const PostNewsletters = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [postid, setPostId] = React.useState('');

  const [pageDate, setPageDate] = React.useState('');

  const [actionType, setActionType] = React.useState('');

  const [templateField, setTemplateField] = React.useState('newsletters');
  const [parentpageField, setParentPageField] = React.useState([]);

  const [title, setTitle] = React.useState('');
  const [excerpts, setExcerpts] = React.useState('');

  const [embedcontent, setEmbedContent] = React.useState('');

  const [extraInputFields, setExtraInputFields] = React.useState({
    inputfield1: '',
    inputfield2: '',
  });

  const [metaData, setMetaData] = React.useState({
    featuredImage: '',
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
        const res = await fetch(`/api/newsletters/get/${postid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();

        if (!res.ok) {
          if (data.message === 'Unauthorized') return navigate(`/signin`);
          toast.error(data.message || 'Failed to fetch page data');
          return;
        }

        setTitle(data.title);

        setExcerpts(data.excerpts);

        setEmbedContent(data.embedcontent);

        setTemplateField(data.template);

        setParentPageField(data.parentPage);

        setPageDate(data.updatedAt);

        setSeoFields(data?.seo);

        setCustomMetaFields(data?.customMetaFields);

        setCustomMetaFields(data?.customMetaFields);

        if (data?.extraInputFields) {
          setExtraInputFields({
            inputfield1: data.extraInputFields.inputfield1 || '',
            inputfield2: data.extraInputFields.inputfield2 || '',
          });
        }

        if (data.metaFields) {
          // Handle metaFields with proper defaults
          setMetaData({
            featuredImage: data.metaFields?.featuredImage || '',
          });
        }
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
      }
    };

    fetchPage();
  }, [postid]);

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

    const extraInputData = extraInputRef.current?.getData?.();

    const randomPageId = Math.floor(1000 + Math.random() * 9000); // 4-digit number

    const payload = {
      title,
      excerpts,
      embedcontent,
      pageId: postid ? postid : randomPageId,
      template: 'newsletters',
      parentPage: parentpageField,
      seoFields: seoFields,
      metaFields: metaData,
      customMetaFields: customMetaFields,
      extraInputFields: extraInputData,
      publishDate: pageDate,
    };

    if (postid || actionType === 'edit') {
      console.log('payload edit', payload);

      try {
        const res = await fetch(`/api/newsletters/update/${postid}`, {
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
        const res = await fetch('/api/newsletters/create', {
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
          navigate(
            `/dashboard/new-newsletter?page=${randomPageId}&action=edit`
          );
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const extraInputRef = React.useRef();

  const pageName = usePageTitle(postid);

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

          <div>
            <EmbedContentField
              embedcontent={embedcontent}
              setEmbedContent={setEmbedContent}
            />
          </div>

          <ExtraInputFields
            ref={extraInputRef}
            initialData={extraInputFields}
          />
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
            type="newsletters"
            postid={postid}
            pageDate={pageDate}
            onDateChange={(newDate) => setPageDate(newDate)}
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
