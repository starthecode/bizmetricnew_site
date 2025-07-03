import React from 'react';
import PageHead from '../../components/DashComponents/PageHead';
import PublishPanel from '../../components/DashComponents/PublishPanel';
import TextEditor from '../../components/TextEditor';
import BlogEditor from '../../components/DashComponents/Blogs/BlogEditor';
import SeoPanel from '../../components/DashComponents/SeoPanel';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { usePageTitle } from '../../utils/pathName';
import PostMetaFields from '../../components/DashComponents/PostMetaFields';
import ExcerptsField from '../../components/DashComponents/ExcerptsField';

export const Post = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [postid, setPostId] = React.useState('');
  const [actionType, setActionType] = React.useState('');
  const [postDate, setPostDate] = React.useState('');

  const [title, setTitle] = React.useState('');
  const [excerpts, setExcerpts] = React.useState('');

  const [editorContent, setEditorContent] = React.useState('{}'); // <-- empty JSON initially
  const [blogContent, setBlogContent] = React.useState([]);
  const [seoFields, setSeoFields] = React.useState({
    focusKeyphrase: '',
    seoTitle: '',
    seoDescription: '',
  });

  const [metaData, setMetaData] = React.useState({
    categories: [],
    tags: [],
    featuredImage: '',
  });

  const isEditing = !!searchParams.get('action');

  // URL param parsing
  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const postFromUrl = urlParams.get('post');
    const postAction = urlParams.get('action');

    if (postFromUrl) {
      setPostId(postFromUrl);
      setActionType(postAction);
    }
  }, [location]);

  React.useEffect(() => {
    if (!isEditing && actionType === 'edit') {
      setActionType('new');
      window.location.reload();
    }
  }, [isEditing, actionType]);

  // Fetch existing post data
  React.useEffect(() => {
    const fetchPost = async () => {
      if (!postid) return;

      const url = postid ? `/api/post/get/${postid}` : '';

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || 'Failed to fetch post');
          return;
        }

        setTitle(data.title);
        setExcerpts(data.excerpts);

        setPostDate(data.updatedAt);
        setSeoFields(data.seoFields || {});

        if (data.metaFields) {
          // Handle metaFields with proper defaults
          setMetaData({
            categories: data.metaFields?.categories || [],
            tags: data.metaFields?.tags || [],
            featuredImage: data.metaFields?.featuredImage || '',
          });
        }

        const contentArray = data.content || [];

        // Handle editorJs content separately
        const editorContentData = contentArray.find(
          (item) => item.type === 'editorJs'
        );
        if (editorContentData?.data) {
          setEditorContent(
            typeof editorContentData.data === 'string'
              ? editorContentData.data
              : JSON.stringify(editorContentData.data)
          );
        }

        // Handle blogEditor content separately
        const blogContentData = contentArray.find(
          (item) => item.type === 'blogEditor'
        );

        if (blogContentData?.data) {
          const blogData = blogContentData.data.map((item) => ({
            id: item.id || Math.random().toString(36).substr(2, 9), // Assign random ID if not available
            type: item.type,
            value: item.value || '',
          }));

          setBlogContent(blogData);
        }
      } catch (error) {
        toast.error(error.message || 'Error fetching post');
      }
    };

    fetchPost();
  }, [postid]);

  // Handle final submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmUpdate = window.confirm(
      'Are you sure you want to save this post?'
    );
    if (!confirmUpdate) return;

    const randomPostId = Math.floor(1000 + Math.random() * 9000);

    const payload = {
      title,
      excerpts,
      pageId: postid ? postid : randomPostId,
      template: 'default',
      parentPage: 'blogs',
      content: [
        {
          type: 'editorJs',
          data: JSON.parse(editorContent),
        },
        {
          type: 'blogEditor',
          data: blogContent,
        },
      ],
      metaFields: metaData,
      seoFields,
    };

    console.log('payload', payload);

    try {
      const url =
        postid || actionType === 'edit'
          ? `http://localhost:3000/api/post/update/${postid}`
          : 'http://localhost:3000/api/post/create';

      const method = postid || actionType === 'edit' ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Something went wrong');
        return;
      }

      if (data.success) {
        toast.success(
          postid ? 'Post updated successfully!' : 'Post created successfully!'
        );
        if (!postid) {
          setActionType('edit');
          navigate(`/dashboard/post-new?post=${randomPostId}&action=edit`);
        }
      }
    } catch (error) {
      toast.error(error.message || 'Failed to submit post');
    }
  };

  const pageName = usePageTitle(postid);

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <PageHead
            templateField={''}
            parentpageField={'blogs'}
            title={title}
            setTitle={setTitle}
            postId={postid}
          />
          <TextEditor
            editorContent={editorContent}
            setEditorContent={setEditorContent}
          />
          <BlogEditor
            setBlogContent={setBlogContent}
            blogContent={blogContent}
          />
          <div>
            <ExcerptsField excerpts={excerpts} setExcerpts={setExcerpts} />
          </div>
          <SeoPanel
            seoFields={seoFields}
            setSeoFields={setSeoFields}
            pageName={pageName}
          />
        </div>
        <div>
          <PublishPanel postid={postid} postDate={postDate} />
          <PostMetaFields
            setMetaData={setMetaData}
            initialMetaData={metaData}
          />
        </div>
      </div>
    </form>
  );
};
