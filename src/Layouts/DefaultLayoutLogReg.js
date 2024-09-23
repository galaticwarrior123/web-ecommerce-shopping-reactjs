import './DefaultLayoutLogReg.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const DefaultLayoutLogReg = ({ children }) => {
    return (
        <div className="default-layout-log-reg d-flex justify-content-center align-items-center vh-100">
            
            {children}
        
        </div>
    )
}

export default DefaultLayoutLogReg;