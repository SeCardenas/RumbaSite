import React from 'react';
import { Sites } from '../../api/sites.js'
import PropTypes from 'prop-types';
import ReactStars from 'react-stars'
import { Header, Image } from 'semantic-ui-react'
import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

const role = Roles.userIsInRole(Meteor.user(), ['client'])

class AllSites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search : ''
    }
  }

  renderSites() {
    console.log(this.props.sites)
    let filteredSites= this.props.sites.filter(
      (site)=>{
        return site.name.toLowerCase().indexOf(
          this.state.search.toLowerCase())!== -1;
      }
    );

    return filteredSites.map((g, i) => (
      <div className="card" key={i}>
        <img className="card-img" src="http://wac.2f9ad.chicdn.net/802F9AD/u/joyent.wme/public/wme/assets/ec050984-7b81-11e6-96e0-8905cd656caf.jpg" alt="Norway" />
        <div className="card-text">
          <h2>{g.name}</h2>
        </div>
        <ReactStars
          className="card-starts"
          count={5}
          size={20}
          edit={false}
          value={g.raiting}
          color2={'#ffd700'} />
      </div>
    ));
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 20)
    });
  }

  render() {
    return (
      <div>
        <div className="search-bar">
          <input type="text"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)} 
            placeholder="Search site"/>
        </div>
        <div className="cards">
          {this.renderSites()}
        </div>
      </div>
    );
  }
}

AllSites.propTypes = {
  sites: PropTypes.array.isRequired,
};

export default withTracker(() => {
  Meteor.subscribe('sites');
  return {
    sites: Sites.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(AllSites);