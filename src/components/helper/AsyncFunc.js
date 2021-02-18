import React, {Component} from 'react';
import Nprogress from 'nprogress';
import ReactPlaceholder from 'react-placeholder';
import 'nprogress/nprogress.css';
import 'react-placeholder/lib/reactPlaceholder.css';
import DataLoader from "../common/DataLoader";

function asyncComponent(importComponent) {
    class AsyncFunc extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            };
        }

        componentWillMount() {
            Nprogress.start();
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        async componentDidMount() {
            this.mounted = true;
            const {default: Component} = await importComponent();
            Nprogress.done();
            if (this.mounted) {
                this.setState({
                    component: <Component {...this.props} />
                });
            }
        }

        render() {
            const Component = this.state.component || <div/>;
            return (
                <ReactPlaceholder ready={Component !== null} customPlaceholder={<DataLoader/>}>
                    {Component}
                </ReactPlaceholder>
            );
        }
    }

    return AsyncFunc;
}

export {asyncComponent}