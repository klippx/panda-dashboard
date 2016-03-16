import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';
const  { Pie }                         = Mozaik.Component;


class SprintHealth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total:  0,
            labels: []
        };
    }

    getApiRequest() {
        let { jql } = this.props;

        return {
            id:     `jira.filter.${ jql }`,
            params: {
                jql: jql
            }
        };
    }

    getColor(priority) {
        if(priority.id == "1") {
            return "0000ff"; //open
        } else if (priority.id == "5" || priority.id == "6") {
            return "00ff00"; //resolved or closed
        } else if (priority.id == "3") {
            return "ffff00"; //in progress
        } else if (priority.id == "10011") {
            return "ff0000"; //blocked
        } else {
            return "551a8b"
        }
    }

    onApiData(issues) {
        var labels = {},
            total = 0;
        issues.issues.forEach(issue => {
            if (!labels[issue.fields.status.name]) {
                labels[issue.fields.status.name] = issue.fields.status;
                labels[issue.fields.status.name].color = this.getColor(issue.fields.status);
                labels[issue.fields.status.name].count = 0;
            }
            labels[issue.fields.status.name].count += issue.fields.customfield_11703;
            total += issue.fields.customfield_11703;
        });

        this.setState({
            labels: labels,
            total:  total
        });
    }

    render() {
        let { labels, total }     = this.state;
        let { title, repository } = this.props;

        let flatLabels = _.values(labels);
        let data       = flatLabels.map(label => {
            label.color = `#${ label.color }`;
            label.id    = label.name;
            label.label = label.name;

            return label;
        });

        let titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{repository}</span> sprint health
            </span>
        ) : title;

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <i className="fa fa-github" />
                </div>
                <div className="widget__body">
                    <Pie data={data} count={total} countLabel={total > 1 ? 'Story Points' : 'Story Point'} innerRadius={0.7}/>
                </div>
            </div>
        );
    }
}

SprintHealth.propTypes = {
    repository: PropTypes.string.isRequired,
    title:      PropTypes.string
};

reactMixin(SprintHealth.prototype, ListenerMixin);
reactMixin(SprintHealth.prototype, Mozaik.Mixin.ApiConsumer);

export { SprintHealth as default };