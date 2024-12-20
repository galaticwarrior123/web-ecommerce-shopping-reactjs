import Footer from "../Pages/Common/Footer/Footer";
import Header from "../Components/Header/Header";
import SubHeader from "../Components/SubHeader/SubHeader";
import './DefaultLayoutUserHomePage.css';
import Top10_BanChayNhat from '../Components/Top10_BanChayNhat/Top10_BanChayNhat';




const DefaultLayoutUserHomePage = ({ children }) => {
    return (
        <div id="resultMessage">
            <Header />
            <SubHeader/>
            <div className="col-md-12">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default DefaultLayoutUserHomePage;