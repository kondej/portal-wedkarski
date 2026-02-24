import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import '../css/styles.css';

const Layout = ({ children }) => {
  return (
    <div className='root'>
      <Header />
      <div className="content-container">
        <Nav />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;