import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PiSidebar } from 'react-icons/pi';
import { IoIosCloseCircleOutline } from 'react-icons/io'
import Search from './Search';
import SavedLocations from './SavedLocations';
import classes from './Sidebar.module.css';

const Sidebar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const portalEl = document.getElementById('overlays');

    useEffect(() => {
        const handleEsc = (event) => event.key === 'Escape' && setIsNavOpen(false);

        window.addEventListener('keydown', handleEsc);

        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <>
            {
                !isNavOpen ?
                    <button data-testid='open-sidebar' className={classes.button} onClick={() => setIsNavOpen(true)}>
                        <PiSidebar style={{ color: '#fff' }} />
                    </button>
                    : <>
                        { 
                            createPortal(<div onClick={() => setIsNavOpen(false)} className={classes.backdrop} />, portalEl)
                        }
                        {
                            createPortal(
                                <nav className={classes.sidebar}>
                                    <button data-testid='close-sidebar' className={classes.button} onClick={() => setIsNavOpen(false)}>
                                        <IoIosCloseCircleOutline />
                                    </button>
                                    <h4 className={classes.title}>Weather</h4>
                                    <Search setNavIsOpen={setIsNavOpen} />
                                    <SavedLocations setNavIsOpen={setIsNavOpen} />
                                </nav>, portalEl)
                        }
                    </>
            }
        </>
    );
}
export default Sidebar;