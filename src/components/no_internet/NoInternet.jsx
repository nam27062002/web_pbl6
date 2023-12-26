
import groovyWalkAnimation from '../../lotti/no_internet.json';
import Lottie from "lottie-react";
import './style.css'

const NoInternet = () => {
    const handleReloadClick = () => {
        window.location.reload();
      };
    return (
        <div className="container_no_internet">
            <div className="container_popup shadow ">
                <Lottie animationData={groovyWalkAnimation} loop={true} className='lottie' />
                <h3>Ooops!</h3>
                <p className='text-muted lh-1'>No internet connection</p>
                <p className='text-muted lh-1'>Check your connection</p>
                <button type="button" class="btn btn-danger try_again" onClick={handleReloadClick}>Try again</button>
            </div>
        </div>
    );
}

export default NoInternet;