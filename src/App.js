import React, { Suspense } from 'react';
import NavbarComponent from './components/ui/NavbarComponent';
import { Switch, Route } from 'react-router-dom';

const Post = React.lazy(() => import('./components/Post'), 'default');
const SignIn = React.lazy(() => import('./components/SignIn'), 'default');
const SignUp = React.lazy(() => import('./components/SignUp'), 'default');



export const App = () => {
	return (
		<div>
			
       		<NavbarComponent/>
			   
			<Suspense fallback={<div>Loading</div>}>
				<Switch>
					<Route exact path="/" component={Post}></Route>

					<Route exact path="/signin" component={SignIn} />
					<Route exact path="/signup" component={SignUp} />
				</Switch>
			</Suspense>
		</div>
	);
};
