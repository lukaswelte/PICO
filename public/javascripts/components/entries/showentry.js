var ShowEntry = React.createClass ({
    mixins: [FluxMixin],

    render: function () {
        return (
            <div>
                <p>Das ist die Show Entry Seite.</p>
                {/* Fetches the details of an entry */}
                <EntryDetail/>
            </div>
        );
    }


});