import { useLocation } from 'react-router-dom';
import Menu from '../Menu/Menu';

export default function User() {

    const location = useLocation();

    return (
        <>
            <Menu />
            <div className='container'>
                <div className='d-flex justify-content-center mt-3'>
                    <h4 style={{ fontWeight: "bold" }}>{location.state[1]}</h4>
                </div>
                
                {location.state[0].map(val => {
                    return (
                        <div className='d-flex justify-content-center mt-3' key={val.loginId}>
                            <div style={{ zIndex: 5, right: 0, bottom: 0, width: "60%" }}>
                                <div id="liveToast" className="toast show" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000" style={{ maxWidth: "100%" }}>
                                    <div className="toast-header">
                                        <img src="..." className="rounded mr-2" alt="..." />
                                        <strong className="mr-auto">{val.loginId}</strong>

                                    </div>
                                    <div className="toast-body">
                                        <h5> Name : {val.firstName} {val.lastName}</h5>
                                        <h6>Email Id : {val.emailId}</h6>
                                        <h6>Mobile No. : {val.contactNumber}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
