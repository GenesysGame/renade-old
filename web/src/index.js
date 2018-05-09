import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';

class View extends React.Component {

    render() {
        return (
            <div>
                <Bg />
                <Page>
                    <Title>Coming soon...</Title>
                </Page>        
                <Footer />
            </div>
        );
    }

}

class Bg extends React.Component {

    render() {
        return (
            <div className="bg"></div>
        );
    }

}

class Page extends React.Component {

    render() {
        return (
            <div className="page">{this.props.children}</div>
        );
    }

}

class Title extends React.Component {

    render() {
        return (
            <div className="title">{this.props.children}</div>
        );
    }

}

class Footer extends React.Component {

    render() {
        return (
            <footer>
                <div className="logo">Renade RP</div>
                <div className="line"></div>
                <div className="legal">Rage MP | Grand Theft Auto V</div>
            </footer>
        );
    }

}

ReactDOM.render(
    <View />,
    document.getElementById('root')
);