import auth from './routes/auth';
import conReport from './routes/conReport';
import friends from './routes/friends';
import main from './routes/main';
import profile from './routes/profile';
import remainders from './routes/remainders';
import reports from './routes/reports';

const api = {
  auth,
  main,
  profile,
  friends,
  remainders,
  reports,
  conReport,
};

export default api;
