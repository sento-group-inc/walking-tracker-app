const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Cumulative Layout Shift
      getCLS(onPerfEntry);
      // First Input Delay
      getFID(onPerfEntry);
      // First Contentful Paint
      getFCP(onPerfEntry);
      // Largest Contentful Paint
      getLCP(onPerfEntry);
      // Time to First Byte
      getTTFB(onPerfEntry);
    }).catch(error => {
      console.error('Failed to load web-vitals:', error);
    });
  }
};

export default reportWebVitals;