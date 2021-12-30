import React from 'react';
import { Car } from './types/Types';
import SelectCar from './Components/SelectCar';
import PrintCar from './Components/PrintCar';
import './App.css';

type Props = {};
type State = {
    isSelected: boolean;
    selectedCar: {
        brand: string;
        model: string;
        color: string;
    };
};

const cars: Car[] = [
    {
        brand: 'Audi',
        models: [
            { model: 'e-tron', colors: ['white', 'red'] },
            { model: 'A1', colors: ['white', 'red', 'black', 'silver'] },
            { model: 'A3', colors: ['white', 'red', 'black', 'silver'] },
            { model: 'Q2', colors: ['white', 'red'] },
        ],
    },
    {
        brand: 'Toyota',
        models: [
            { model: 'Aygo', colors: ['white', 'red', 'black'] },
            { model: 'C-HR', colors: ['white', 'red', 'black'] },
            { model: 'Camry', colors: ['white', 'red'] },
            { model: 'Corolla', colors: ['white', 'red'] },
        ],
    },
    {
        brand: 'Volkswagen',
        models: [
            { model: 'Polo', colors: ['white', 'red', 'black', 'silver'] },
            { model: 'T-Cross', colors: ['white', 'red', 'yellow', 'silver'] },
            { model: 'T-Roc', colors: ['white', 'red', 'yellow', 'silver'] },
            { model: 'Touran', colors: ['white', 'red', 'black'] },
            { model: 'Golf', colors: ['white', 'red', 'black'] },
        ],
    },
];

export class App extends React.Component<Props, State> {
    state: State = {
        isSelected: false,
        selectedCar: {
            brand: '',
            model: '',
            color: '',
        },
    };

    handleSelection = (brand: string, model: string, color: string) => {
        if (brand === '') {
            this.setState({ isSelected: false });
        } else {
            this.setState({ isSelected: true });
        }
        this.setState({ selectedCar: { brand, model, color } });
    };

    render() {
        return (
            <div className="App">
                <SelectCar cars={cars} selectCar={this.handleSelection} />
                {this.state.isSelected && <PrintCar selectedCar={this.state.selectedCar} />}
            </div>
        );
    }
}

export default App;
