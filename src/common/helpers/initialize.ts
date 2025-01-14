import { getProtected } from '@common/api/auth';

const initialize = () => {
  getProtected();
};

export default initialize;
