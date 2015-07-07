var DeleteEntry = React.createClass({

    render: function () {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 homepage-blue-area">
                        <h1>The selected entry is deleted now</h1>
                        <Link to="home" className="orange-color">Go to homepage <span className="glyphicon glyphicon-play" aria-hidden="true"></span></Link>
                    </div>
                </div>
            </div>
        );
    }
});
