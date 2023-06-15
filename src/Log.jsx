import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Showlog from './components/Showlog';
import styled from 'styled-components';
//import Setting from './Setting';

const Log = () => {
  //const navigate = useNavigate();

  return (
    <Wrap>
      <Header>
        <Topbar />
      </Header>
      <Container>
        <Root>
          <ColumnLeft>
            <Sidebar />
          </ColumnLeft>
          <ColumnRight>
            <Showlog />
          </ColumnRight>
        </Root>
      </Container>
    </Wrap>
    
  );
};

const  Wrap = styled.div`
    min-width: 1340px;
`;

const Header = styled.div`
  width: 1280px;
  margin: 0 auto;
  padding: 0px 0px 50px 0px;
`;

const Container = styled.div`
  position: relative;
  width: 1280px;
  margin: 0 auto;
  padding-bottom: 60px;
`;

const Root = styled.div`

`;

const ColumnLeft = styled.div`
  float: left;
  width: 320px;
`;

const ColumnRight = styled.div`
  float: left;
  width: 860px;
  margin-left: 30px;
`;

export default Log;