import React from 'react';
import './App.css';
import HeaderNavigation from './Components/HeaderNavigation/HeaderNavigation';
import HomePage from './Pages/HomePage/HomePage';
import MenuPage from './Pages/MenuPage/MenuPage';

type Props = {}
type State = {
    currency: string;
    page: string;
}

export class App extends React.Component<Props, State> {
    state: State = {
        currency: 'euro',
        page: 'menu',
    };

    render() {
        return (
            <div className="App">
                <HeaderNavigation
                    currency={this.state.currency}
                    setCurrency={(c) => this.setState({ currency: c })}
                    page={this.state.page}
                    setPage={(p) => this.setState({ page: p })}
                />
                {this.state.page === 'home' && <HomePage />}
                {this.state.page === 'menu' && <MenuPage currency={this.state.currency} />}
            </div>
        );
    }
}

export default App;
