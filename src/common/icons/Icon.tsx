import { map } from 'lodash';

import { IIcon, IIconList } from './Icon.types';
import iconList from './iconList.json';

const Icon = ({
  name,
  size = 16,
  color = 'currentColor',
  className,
  ...props
}: IIcon) => {
  const icon = (iconList as IIconList)[name];

  if (!icon) return <></>;

  return (
    <svg
      className={className || name}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewbox}
      width={size}
      height={size}
      style={icon.style}
      {...props}
    >
      {icon.path
        ? map(icon.path, (path, i) => (
            <path key={i} fill={path?.fill || color} {...path}></path>
          ))
        : null}
      {icon.g ? (
        <g fill={icon.g.fill || 'currentColor'}>
          {icon.g.path
            ? map(icon.g.path, (gPath, i) => <path key={i} {...gPath}></path>)
            : null}
          {icon.g.circle
            ? map(icon.g.circle, (gCircle, i) => (
                <circle key={i} {...gCircle}></circle>
              ))
            : null}
        </g>
      ) : null}
    </svg>
  );
};

export default Icon;
