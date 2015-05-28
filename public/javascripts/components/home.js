var Home = React.createClass({
    mixins: [FluxMixin],

    render: function () {
        return (
            <div>
                <EntryDetail/>
                <p>This is the home page</p>
                <LabelItem name="test"></LabelItem>
                <LabelItem name="test2"></LabelItem>
                <LabelList/>
            </div>
        );
    }
});
