import React from "react";
import Mastolist from "../mastolist";

export default class Notifications extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Mastolist type={"notifications"}/>
    }
}