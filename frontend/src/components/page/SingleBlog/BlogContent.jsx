import PostTags from './PostTags';
import SharePost from './SharePost';
import PostCategories from './PostCategories';

export default function BlogContent({ content, metaFields }) {
  const content1 = content.find((c) => c.type === 'editorJs')?.data || '';

  const content2 = content.find((c) => c.type === 'blogEditor')?.data || '';

  return (
    <div className="blog__content px-40">
      <PostCategories catItems={metaFields?.categories || ''} />
      <div className="space-y-4">
        {content1.blocks?.map((block) => {
          switch (block.type) {
            case 'paragraph':
              return (
                <p key={block.id} className="text-gray-800 leading-relaxed">
                  {block.data.text}
                </p>
              );
            // You can add more block types here (e.g., header, list, image, etc.)
            default:
              return null;
          }
        })}
      </div>

      <div className="space-y-4">
        {content2?.map((block) => {
          switch (block.type) {
            case 'text':
              return (
                <div key={block.id} className="text-gray-800 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: block.value }} />
                </div>
              );

            case 'image':
              return (
                <div key={block.id} className="text-gray-800 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: block.value }} />
                </div>
              );
            // You can add more block types here (e.g., header, list, image, etc.)
            default:
              return null;
          }
        })}
      </div>

      <div className="flex justify-between">
        <PostTags tagItems={metaFields?.tags || ''} />
        <SharePost />
      </div>
    </div>
  );
}
