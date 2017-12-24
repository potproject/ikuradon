import React from "react";
import Mastolist from "../mastolist";

export default class Federal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Mastolist type={"federal"} />
    }
}