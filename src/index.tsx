import React from 'react';
import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Store } from 'webext-redux';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/redux';
import { ThemeProvider } from 'styled-components';
import globalStyles from './global-styles/global-styles';
import { PersistGate } from 'redux-persist/integration/react';

const root = createRoot(document.getElementById('root') as HTMLElement);

if (process.env.NODE_ENV === 'development') {
	root.render(
		<React.StrictMode>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<BrowserRouter>
						<ThemeProvider theme={globalStyles}>
							<App />
						</ThemeProvider>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</React.StrictMode>
	);
} else {
	const proxyStore = new Store();

	proxyStore.ready().then(() => {
		render(
			<React.StrictMode>
				<Provider store={proxyStore}>
					<PersistGate persistor={persistor}>
						<BrowserRouter>
							<ThemeProvider theme={globalStyles}>
								<App />
							</ThemeProvider>
						</BrowserRouter>
					</PersistGate>
				</Provider>
			</React.StrictMode>,
			document.getElementById('root')
		);
	});
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
