export default function BackgroundSection({
  children,
  className = '',
  style = {},
}) {
  const url = import.meta.env.VITE_BACKEND_PUBLIC_URL;
  return (
    <section
      className={`relative py-20 sm:py-24 md:py-24 lg:py-20 z-10 ${className}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${url}/uploads/background-colour-gradient-667564.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        ...style,
      }}
    >
      {children}
    </section>
  );
}
