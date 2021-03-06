import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import NavbarComponent from './components/ui/NavbarComponent';
import checkForToken from './helpers/checkForToken';
import PrivateRoute from './routes/PrivateRoute';
import store from './store/store';

import UserPost from './components/UserPosts';
import PostDetails from './components/PostDetails';
import NewPost from './components/NewPost';
const Posts = React.lazy(() => import('./components/Posts'), 'default');
const SignIn = React.lazy(() => import('./components/SignIn'), 'default');
const SignUp = React.lazy(() => import('./components/SignUp'), 'default');
import EditPost from './components/EditPost';

checkForToken(); //first time we check if there is a user logged in

export const App = () => {
	return (
		<>
			<Provider store={store}>
				<Router>
					<div className="mb-2">
						<NavbarComponent/>
					</div>
					<Container>
						<ToastContainer />
						<Suspense fallback={<div>Loading</div>}>
							<Switch>
								<Route exact path="/" component={Posts}></Route>
								<Route exact path="/signin" component={SignIn} />
								<Route exact path="/signup" component={SignUp} />
								<Route exact path="/post/:id" component={PostDetails} />
								<PrivateRoute exact path="/posts" component={UserPost}></PrivateRoute>
								<PrivateRoute exact path="/newpost" component={NewPost}></PrivateRoute>
								<PrivateRoute exact path="/editpost/:id" component={EditPost}></PrivateRoute>
							</Switch>
						</Suspense>
					</Container>
				</Router>
			</Provider>
		</>
	);
};
