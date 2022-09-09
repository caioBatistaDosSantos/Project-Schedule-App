import { useEffect } from 'react';
import { redirectRoute } from '../../utils/functions';

export default function Redirect() {
  useEffect(() => {
    redirectRoute('/login');
  }, []);

  return true;
}
