import React, { Component } from 'react';
import axios from 'axios';

export default class ValorAtlas extends Component {
    _isMounted_A = true;

    constructor() {
        super();

        this.state = {
            atlasaccounts: [],
        };
    }

    async componentDidMount() {
        const res_p3 = await axios.post(
            'http://167.99.15.83:4000/api/budgetlines/atlas/findAtlasAccountsByProjAct/' +
            this.props.project_id +
            '/' +
            this.props.code_activity
        );
        this.setState({ atlasaccounts: res_p3.data.results });
        //this.setState({ atlasaccounts: res_p3.data.atlasaccounts });

        //console.log(this.state.atlasaccounts)
    }

    render() {
        return ( <
            > {
                this.state.atlasaccounts.map((atlas, index) => ( <
                    div key = { index } > { atlas.name } < /div>
                ))
            } <
            />
        );
    }
}