import { Link } from 'react-router-dom';
import './component.css';
import Navbar from './Nav';

function Home() {
    
    return (
        <>
            <Navbar />
            <div>
                <div className='head'>
                    <h1>เราไปดูบ้านเลขที่นำโชคของคุณกันเถอะ !!!</h1>
                </div>
                <div className='cal'>
                    <Link to='/เลขนำโชค'>
                        <button className="btn btn-neutral btn-sm">
                            ไปกันดูกันนน!!!!
                        </button>
                    </Link>
                </div>
            </div>

        </>
    )
}

export default Home
