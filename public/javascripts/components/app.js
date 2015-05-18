var Application = React.createClass({
    mixins: [FluxMixin],

    render: function() {
        return (
            <div>
                <header>
                    <ul>
                        <li><Link to="test">Dashboard</Link></li>
                        <li><Link to="search">Inbox</Link></li>
                        <li><Link to="todo">Todo List</Link></li>
                    </ul>
                    Logged in
                </header>

                {/* this is the important part */}
                <RouteHandler/>
            </div>
        );
    }
});
