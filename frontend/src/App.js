import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import Footer from '~/Layout/Footer';
import Header from '~/Layout/Header';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Content = (
                            <div>
                                <Page />
                                <Footer />
                            </div>
                        );
                        if (route.Header) {
                            Content = (
                                <div>
                                    <Header />
                                    <Page />
                                    <Footer />
                                </div>
                            );
                        }
                        return <Route key={index} path={route.path} element={Content} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
