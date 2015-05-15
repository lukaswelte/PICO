var Application = React.createClass({
    render: function() {
        return (
            <div>
                <header>
                    <ul>
                        <li><Link to="test">Dashboard</Link></li>
                        <li><Link to="search">Inbox</Link></li>
                    </ul>
                    Logged in
                </header>

                {/* this is the important part */}
                <RouteHandler/>
            </div>
        );
    }
});
