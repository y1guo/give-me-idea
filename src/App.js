import React from "react";
import "./App.css";

function InputForm(props) {
    return (
        <div className="container">
            <div className="labelbar">
                <label>Keywords:</label>
            </div>
            <div>
                <form onSubmit={props.onSubmit}>
                    <textarea
                        value={props.valueInput}
                        placeholder="Copy your keywords here. Seperate with spaces."
                        onChange={props.onChangeInput}
                        id="input-area"
                    />
                    <div className="container">
                        <textarea
                            value={props.valueSettings}
                            onChange={props.onChangeSettings}
                            id="settings-area"
                        />
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}

function OutputField(props) {
    return (
        <div className="container">
            <div className="labelbar">
                <label>Your new ideas:</label>
            </div>
            <div>
                <ol>{props.value}</ol>
            </div>
        </div>
    );
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            keywords: [],
            ideas: [],
            numCombine: 5,
        };
    }

    render() {
        return (
            <div className="App">
                <InputForm
                    valueInput={this.state.input}
                    onChangeInput={(event) => {
                        this.setState({ input: event.target.value });
                    }}
                    onSubmit={(event) => {
                        this.updateOutput();
                        event.preventDefault();
                    }}
                    valueSettings={this.state.numCombine}
                    onChangeSettings={(event) => {
                        this.setState({ numCombine: event.target.value });
                    }}
                />
                <OutputField
                    value={this.state.ideas.map((idea, i) => (
                        <ul key={i}>
                            {idea.map((keyword, j) => (
                                <li key={j}>{keyword}</li>
                            ))}
                        </ul>
                    ))}
                />
            </div>
        );
    }

    updateOutput() {
        const input = this.state.input;
        const keywords = input.split(" ");
        const ideas = [];
        for (let i = 0; i < 20; i++) {
            const idea = [];
            for (let j = 0; j < this.state.numCombine; j++) {
                if (j === keywords.length) {
                    break;
                }
                let repick = true;
                let index;
                while (repick) {
                    repick = false;
                    index = Math.floor(Math.random() * keywords.length);
                    for (let k = 0; k < idea.length; k++) {
                        if (keywords[index] === idea[k]) {
                            repick = true;
                        }
                    }
                }
                idea.push(keywords[index]);
            }
            ideas.push(idea);
        }
        console.log(keywords, ideas);
        this.setState({
            keywords: keywords,
            ideas: ideas,
        });
    }
}
