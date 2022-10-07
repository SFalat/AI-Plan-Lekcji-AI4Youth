import React, { useEffect } from 'react';
// import Buttons from '~/components/StyledButtons/Buttons';
// import BackButton from '~/components/StyledButtons/BackButton';
// import ForwardButton from '~/components/StyledButtons/ForwardButton';
// import ConfirmButton from '~/components/StyledButtons/ConfirmButton';

function Result() {
  const [resultData, setResultData] = React.useState(null);

  const getResultData = async () => {
    let response = await eel.request_handler('get_result', {})();
    console.log(response);
    if (response.status === 'success') {
      setResultData(JSON.parse(response.data));
    } else {
      toast.error(response.message || 'Wystąpił błąd');
    }
  };

  useEffect(() => {
    getResultData();
  }, []);

  if (!resultData) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div>
      {Object.entries(resultData.data).map(val => {
        return (
          <div key={val}>
            {val[0].toString()}:{' '}
            {Object.entries(val[1]).map(attribute => {
              return (
                <p key={attribute} style={{ marginLeft: '1rem' }}>
                  {attribute[0].toString()}: {attribute[1].toString()}
                </p>
              );
            })}
          </div>
        );
      })}
      {/* <Buttons>
        <BackButton to="/teacher-info" />
        <ForwardButton to="/result" />
      </Buttons> */}
    </div>
  );
}

export default Result;
