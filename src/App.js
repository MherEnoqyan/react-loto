import React, {Component} from 'react';
import { connect } from 'react-redux';
import { sendResult } from './actions/loto';
import { defaultState } from './reducers/loto';
import './App.css';
import Cell from './Cell';

class App extends Component {
    state = {
        firstField: [],
        secondField: [],
        disabled: true,
        result: this.props.result,
        error: this.props.error,
        isLoading: this.props.isLoading
    };

    componentDidUpdate() {
        const { result, error } = this.state;

        if (result) {
            alert('Вы выиграли! Поздравляем!');
        } else if(error !== '') {
            alert(error);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.result !== this.props.result ||
            nextProps.error !== this.props.error ||
            nextProps.isLoading !== this.props.isLoading
        ) {
            this.setState({
                result: nextProps.result,
                error: nextProps.error,
                isLoading: nextProps.isLoading
            });
        }
    }

    selectHandler = (field, number) => {
        const { firstField, secondField } = this.state;

        if (field == 'first'){
            if (firstField.includes(number)) {
                this.setState({...defaultState, firstField: firstField.filter(item => item != number), disabled: true });
            } else if(firstField.length < 8){
                const disabled = firstField.length !== 7 || secondField.length < 1;
                this.setState({...defaultState, firstField: [...firstField, number], disabled });
            }
        } else {
            if (secondField.includes(number)) {
                const disabled = firstField.length !== 8 || secondField.length < 2;
                this.setState({...defaultState, secondField: secondField.filter(item => item != number), disabled });
            } else {
                const disabled = firstField.length !== 8;
                this.setState({...defaultState, secondField: [...secondField, number], disabled });
            }
        }

    };

    randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    randomFirstField = () => {
        const arr = [...[...Array(19)].keys()];
        const firstField = [];
        for( let i = 0; i < 8; i++){
            const randomInt = this.randomIntFromInterval(0, 18-i);
            firstField.push(arr[randomInt] + 1);
            arr.splice(randomInt, 1);
        }
        return firstField;
    };

    randomSecondField = () => {
        const arr = [...[...Array(2)].keys()];
        return [arr[this.randomIntFromInterval(0, 1)] + 1];
    };

    selectRandomHandler = () => {
        this.setState({...defaultState, firstField: this.randomFirstField(), secondField: this.randomSecondField(), disabled: false});
    };

    showResultHandler = () => {
        const { firstField, secondField } = this.state;
        const randomFirstField = this.randomFirstField();
        const randomSecondField = this.randomSecondField();
        let isTicketWon = false;
        let firstFieldMatches = 0;
        let secondFieldMatches = 0;

        firstField.forEach((item) => {
            if (randomFirstField.includes(item)){
                firstFieldMatches++;
            }
        });
        secondField.forEach((item) => {
            if (randomSecondField.includes(item)){
                secondFieldMatches++;
            }
        });

        if (firstFieldMatches === 4 || (firstFieldMatches >= 3 && secondFieldMatches >= 1)) {
            isTicketWon = true;
        }

        const result = {
            selectedNumber: {firstField, secondField},
            isTicketWon
        };

        this.props.sendResult(result);
    };

    render() {
        const { firstField, secondField, disabled, isLoading } = this.state;
        const cellProps = {
            selectHandler: this.selectHandler
        };

        return (
            <div className="container">
                <article>
                    <section>
                        <p>Билет 1</p>
                        <div className="magic-button" onClick={this.selectRandomHandler}></div>
                    </section>
                    <p className="first-field"><b>поле 1</b> Отметьте 8 чисел.</p>
                    <div className="first-field-numbers">
                        {[...Array(19)].map((x, i) =>
                            <Cell key={i} field='first' selected={firstField.includes(i + 1)} number={i + 1} {...cellProps} />
                        )}
                    </div>
                    <p className="second-field"><b>поле 2</b> Отметьте не менее 1 числа.</p>
                    <div className="second-field-numbers">
                        <Cell key='1' field='second' selected={secondField.includes(1)} number={1} {...cellProps} />
                        <Cell key='2' field='second' selected={secondField.includes(2)} number={2} {...cellProps} />
                    </div>
                    <div className="button">
                        {
                            isLoading ?
                                <img src="/small.gif"/>
                                :
                                <button className={`is-loading ${disabled && "disabled"}`} disabled={disabled}
                                        onClick={this.showResultHandler}>Показать результат</button>
                        }
                    </div>
                </article>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.loto.loading,
        result: state.loto.result,
        error: state.loto.error
    }
};

const mapDispatchToProps = {
    sendResult
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
