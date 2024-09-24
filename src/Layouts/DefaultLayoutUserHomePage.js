import Footer from "../Pages/Common/Footer/Footer";
import Header from "../Pages/Common/Header/Header";




const DefaultLayoutUserHomePage = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default DefaultLayoutUserHomePage;