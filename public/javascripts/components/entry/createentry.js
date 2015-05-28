var CreateEntry = React.createClass({
    mixins: [FluxMixin],

    render: function() {
        return (
            <div>
                <EntryForm />
            </div>
        );
    }
});
