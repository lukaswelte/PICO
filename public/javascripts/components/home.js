var Home = React.createClass({
    mixins: [FluxMixin],

    render: function () {
        return (
            <div>
                <p>This is the home page</p>
                <LabelList />
            </div>
        );
    }
});
