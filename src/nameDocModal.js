'use strict';


class NameDocModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        document.getElementById("docTitle").textContent = this.state.value;
        event.preventDefault();
    }

    render() {

        return (

            <div className="modal" id="renameModal" tabIndex="-1" role="dialog" aria-labelledby="renameModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="renameModalLabel">Rename Document</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                    <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick = {this.handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/*
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#renameModal">
                        Launch demo modal
                    </button>
                    */

let domContainer = document.querySelector('#nameDocModalContainer');
ReactDOM.render(<NameDocModal />, domContainer);