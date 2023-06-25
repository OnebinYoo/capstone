import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function RuleAdd() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading ? (
        <CircularProgress style={{ color: '#9e30f4' }} />
      ) : (
        <div>
          <h1>로딩이 완료되었습니다!</h1>
        </div>
      )}
    </div>
  );
}

export default RuleAdd;
