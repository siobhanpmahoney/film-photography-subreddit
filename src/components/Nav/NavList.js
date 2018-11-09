import React from 'react';
import { Route, Link } from 'react-router-dom';
import ls from 'local-storage';

const NavListItem = ({ to, children }) => {
  return (
    <Route
      path={to}
      exact
      children={({ match }) => (
        <li className={`nav__list-item${match ? ' nav__list-item--active' : ''}`}>
          <Link className='nav__list-item__link' to={to}>
            {children}
          </Link>
        </li>
      )}
    />
  )
};

export default function NavList({ list }) {
  return (
    <ul className='nav__list'>
      {list.map(({ text, icon, to }) => (
        <NavListItem key={text} to={to}>
          <i className={`${icon} navIcon`} /> {text}
        </NavListItem>
      ))}
      <li className='nav__list-item'>

          <a className="nav__list-item__link" href="https://github.com/siobhanpmahoney/film-photography-subreddit" target="_blank">
            <i className="fab fa-github navIcon" /> Code
          </a>

      </li>
    </ul>
  );
}
