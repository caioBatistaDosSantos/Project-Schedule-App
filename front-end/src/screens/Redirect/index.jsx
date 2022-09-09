import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    function redirect() {
      navigate('/login');
    }
    redirect();
  }, [navigate]);

  return true;
}
