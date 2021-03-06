import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import { ToastContainer, Slide } from 'react-toastify';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";
import HomePage from './components/home/HomePage';
import HomeworkPage from './components/homework/HomeworkPage';
import QuickLinksPage from './components/quicklinks/QuickLinksPage';
import SchedulePage from './components/schedule/SchedulePage';
import SettingsPage from './components/settings/SettingsPage';
import LoginPage from './components/login/LoginPage';
import { PoliciesPage } from './components/policies/PoliciesPage';
import { AboutPage } from './components/about/AboutPage';
import { NotFoundPage } from './components/404/NotFoundPage';
import PrivateRoute from './security/PrivateRoute';


function App() {
	return (
		<>
		<Auth0Provider
			domain="whsremote.us.auth0.com"
			clientId="PyU80nSaxxaGYtH8miA0jHV76hjBZ0ap"
			redirectUri={window.location.origin + "/home"}
			audience="whsremote"
		>

			<div className="h-100">
				<Router>
					<Switch>
						<PrivateRoute path="/homework" component={HomeworkPage} />

						<PrivateRoute path="/quicklinks" component={QuickLinksPage} />

						<PrivateRoute path="/schedule" component={SchedulePage} />

						<PrivateRoute path="/settings" component={SettingsPage} />
						
						<PrivateRoute path="/home" component={HomePage}/>
						
						<Route exact path="/">
							<LoginPage />
						</Route>

						<Route path="/policies">
							<PoliciesPage />
						</Route>

						<Route path="/about">
							<AboutPage />
						</Route>

						<Route path="*">
							<NotFoundPage />
						</Route>

						
					</Switch>
				</Router>
			</div>

  		</Auth0Provider>
		<ToastContainer
			position="top-right"
			autoClose={3000}
			hideProgressBar
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss={false}
			draggable
			pauseOnHover={false}
			transition={Slide}
			style={{
				marginTop: "1em"
			}}
		/>

		</>
		);
	}
	
	export default App;
	