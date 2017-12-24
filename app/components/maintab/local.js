import React from "react";
import Mastolist from "../mastolist";

export default class Local extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Mastolist type={"local"}/>
    }
}