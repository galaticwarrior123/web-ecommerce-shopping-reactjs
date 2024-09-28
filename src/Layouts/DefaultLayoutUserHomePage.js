import Footer from "../Pages/Common/Footer/Footer";
import Header from "../Components/Header/Header";
import SubHeader from "../Components/SubHeader/SubHeader";
import './DefaultLayoutUserHomePage.css';



const DefaultLayoutUserHomePage = ({ children }) => {
    return (
        <div>
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