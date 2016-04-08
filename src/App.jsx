import React             from 'react';
import Mozaik            from 'mozaik/browser';
import timeComponents    from 'mozaik-ext-time';
import weatherComponents from 'mozaik-ext-weather';
import jenkinsComponents from 'mozaik-ext-jenkins';
import jiraComponents    from 'mozaik-ext-jira';
import awsComponents     from 'mozaik-ext-aws';


const MozaikComponent = Mozaik.Component.Mozaik;
const ConfigActions   = Mozaik.Actions.Config;


Mozaik.Registry.addExtensions({
    time:    timeComponents,
    jenkins: jenkinsComponents,
    weather: weatherComponents,
    jira:    jiraComponents,
    aws:     awsComponents,
});

React.render(<MozaikComponent/>, document.getElementById('mozaik'));

ConfigActions.loadConfig();
