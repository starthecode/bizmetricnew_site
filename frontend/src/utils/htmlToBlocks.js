const htmlToBlocks = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const blocks = [] as any;

  doc.body.childNodes.forEach((node) => {
    if (node.nodeName === 'P') {
      blocks.push({
        type: 'paragraph',
        data: {
          text: node.textContent || '',
        },
      });
    }
    // Handle other HTML tags (e.g., headings, lists) as needed
  });

  return blocks;
};

export default htmlToBlocks;
