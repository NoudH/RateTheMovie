import React, {Component} from 'react';

class PageControls extends Component {

    render() {
        return (
            <div className={"page_controls"}>
                <button className={(this.props.page === 1 ? "d-none" : "") + " btn btn-default"} onClick={() => {this.props.onChange(1)}}>&#x3C;&#x3C; First</button>
                <button className={(this.props.page === 1 ? "d-none" : "") + " btn btn-default"} onClick={() => {this.props.onChange(this.props.page - 1)}}>&#x3C; Prev</button>
                <button className={"btn btn-link"}>{this.props.page}</button>
                <button className={(this.props.page === this.props.lastPage ? "d-none" : "") + " btn btn-default"} onClick={() => {this.props.onChange(this.props.page + 1)}}>Next &#x3E;</button>
                <button className={(this.props.page === this.props.lastPage ? "d-none" : "") + " btn btn-default"} onClick={() => {this.props.onChange(this.props.lastPage)}}>Last &#x3E;&#x3E;</button>
            </div>
        );
    }
}

export default PageControls;