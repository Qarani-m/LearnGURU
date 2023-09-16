
import React from 'react';
import HomeBio from './HomeBio';
import './Homepage.css';

function Homepage() {
    return (
        <div>

            <div>
                <h1>Welcome to LearnGuru!</h1>
                {/* renders information about LearnGuru */}
                <HomeBio />


            </div>
        </div>


    );
}

export default Homepage;