const images = [
  {
    src: 'https://bizsiteuploads.blob.core.windows.net/uploads/career-grid-img06.jpg',
    alt: 'Team collaboration meeting',
  },
  {
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    alt: 'Professional woman walking in office',
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    alt: 'Team working on computers',
  },
  {
    src: 'https://bizsiteuploads.blob.core.windows.net/uploads/career-grid-img04.jpg',
    alt: 'Man working on laptop in cafe',
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    alt: 'Team meeting around table',
  },
  {
    src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    alt: 'Women collaborating in modern office',
  },
];

export const MasonryLayout = () => {
  const firstColumn = images.filter((_, index) => index % 3 === 0);

  const secondColumn = images.filter((_, index) => index % 3 === 1);

  const thirdColumn = images.filter((_, index) => index % 3 === 2);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-20">
      <div className="grid gap-4">
        {firstColumn.map((image, index) => (
          <div key={index} className="">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="grid gap-4">
        {secondColumn.map((image, index) => (
          <div key={index} className="">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="grid gap-4">
        {thirdColumn.map((image, index) => (
          <div key={index} className="">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
