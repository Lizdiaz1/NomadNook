import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AllSpots.css';
import { getSpots } from '../../store/spots.js';
import { NavLink } from 'react-router-dom';

function AllSpots  () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpots());
        console.log('Dispatched getSpots');
    }, [dispatch]);

    // const spots = useSelector((state) => {
    //     const allSpots = state.spots.list.map((spotId) => state.spots[spotId]);
    //     console.log('All spots:', allSpots);
    //     return allSpots;
    // });
    const spots = useSelector((state) => {
        return state.spots.list.map((spotId) => state.spots[spotId]);
    });

    console.log('Final spots:', spots);

    if (spots.length === 0) {
        return null; // Consider a possible loading indicator or a message
    }

    const getDecimal = (num) => {
        return num > 0 ? (Math.round(num * 100) / 100).toFixed(1) : 0;
    };

    return (
        <div className='outer-nav-container'>
            <nav>
                {[...spots].reverse().map((spot) => (
                    <div key={spot.id} className='all-spots'>
                        <NavLink to={`/spots/${spot.id}`}>
                            <div className='thumbnail-container'>
                                <img
                                    src={`${spot.previewImage}`}
                                    alt='Spot Preview Image'
                                    className='thumbnail-image'
                                    title={`${spot.name}`}
                                />
                                <div className='thumbnail-info'>
                                    <div className='secondary-text'>
                                        {spot.avgRating === 0 ? (
                                            <>
                                                <div className='address-text'>{`${spot.city}, ${spot.state}`}</div>
                                                <div className='star-text'>
                                                    <i className='fa-solid fa-star'></i> New
                                                </div>
                                                <div className='price-text'>
                                                    <b>${spot.price}</b> night
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className='address-text'>{`${spot.city}, ${spot.state}`}</div>
                                                <div className='star-text'>
                                                    <i className='fa-solid fa-star'></i> {getDecimal(spot.avgRating)}
                                                </div>
                                                <div className='price-text'>
                                                    <b>${spot.price}</b> night
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </nav>
        </div>
    );
}

export default AllSpots;
