import React, {useState} from 'react';

const Header = (props) => {
    const {clicked} = props;

    return (
        <div className="top-menu">
            <a className="menu-link" href="/">List Team</a>
            <a className="menu-link" href="/add-team">Add Team</a>
            <a className="menu-link" href="/add-match">Add Match</a>
        </div>
    );
};

export default Header;
