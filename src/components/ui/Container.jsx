/**
 * Container Component
 * Responsive container for consistent page width
 */

/**
 * Standard container with responsive padding
 */
export const Container = ({ children, className = "" }) => {
  return <div className={`container-custom ${className}`}>{children}</div>;
};

/**
 * Section wrapper with consistent vertical spacing
 */
export const Section = ({ children, className = "", id }) => {
  return (
    <section id={id} className={`py-12 sm:py-16 lg:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
};
