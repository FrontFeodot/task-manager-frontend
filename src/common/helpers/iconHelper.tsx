import ReactDOMServer from 'react-dom/server';

export const svgToDataUri = (component: JSX.Element) => {
  const svgString = ReactDOMServer.renderToStaticMarkup(component);

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;
};
