import TextAreaLabel from '../Form_Fields/TextAreaLabel';

export default function EmbedContentField({ embedcontent, setEmbedContent }) {
  const handleEmbedContentChange = (e) => {
    setEmbedContent(e.target.value);
  };

  return (
    <div className="w-full px-4 border border-gray-300 rounded-md mt-5">
      <TextAreaLabel
        label="EmbedContent"
        name="embedcontent"
        placeholder="Add EmbedContent"
        value={embedcontent || ''}
        onChange={handleEmbedContentChange}
      />
    </div>
  );
}
