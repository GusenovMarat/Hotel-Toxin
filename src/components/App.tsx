import React, { useState } from 'react';
import classes from './App.module.scss';
import {Link, Outlet} from 'react-router-dom';
import About from '@/pages/about/About';
import avatarPng from '@/assets/avatar.png';
import avatarJpg from '@/assets/avatar.jpg';
import Calendar from '@/assets/calendar.svg';

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(prev => prev + 1)

	if(__PLATFORM__ === "desktop") {
		return <div>ISDESKTOPPLATFORM</div>
	}

	if(__PLATFORM__ === "mobile") {
		return <div>ISMOBILEPLATFORM</div>
	}

  return (
    <div>
			<h1>PLATFORM= {__PLATFORM__}</h1>
			<div>
				<img width={100} height={100} src={avatarPng} alt="" />
				<img width={100} height={100} src={avatarJpg} alt="" />
			</div>
			<div>
				<Calendar className={classes.icon} width={505} height={505}/>
			</div>
			<Link to={'/about'}>about</Link>
			<br/>
			<Link to={'/shop'}>shop</Link>
			<h1 className={classes.value}>{count}</h1>
			<button className={classes.button} onClick={increment}>
				<span>
					asfasf
				</span></button>
			<About />
			<Outlet/>
		</div>
  );
};

