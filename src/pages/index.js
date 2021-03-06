import React from 'react'
import { Persist } from "react-persist"
import Link from 'gatsby-link'
import Sidebar from '../components/Sidebar'
import Newsletter from '../components/Newsletter'
import { steps, roles } from '../data.js'
import meta from '../shared/meta.js'
import Arrow from '../images/arrow-bottom.svg'
import Footer from '../components/Footer'
import Disclaimer from '../components/Disclaimer'
import Scrollspy from 'react-scrollspy'
import CtaBanner from '../components/CtaBanner'

class Li extends React.Component {
  constructor() {
    super()
    this.state = {
      isChecked: false,
      isExpanded: false,
    }
  }

  handleExpand = () => {
    this.setState(prevState => ({
      ...prevState,
      isExpanded: !prevState.isExpanded
    }))
  }

  handleToggle = () => {
    this.setState(prevState => ({
      ...prevState,
      isChecked: !prevState.isChecked
    }))
  }

  render () {
    return (
      <li className={`seed ${this.state.isExpanded ? 'expand' : ''}`}>
        <div className="header">
          <div className={`check ${this.state.isChecked ? 'checked' : ''}`} onClick={this.handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
              <g fill="none" fillRule="evenodd" strokeWidth="3" transform="translate(2 2)">
                <path stroke="#057ee6" d="M6 11.402l2.874 2.934L16.06 7"></path>
                <circle cx="11" cy="11" r="11"></circle>
              </g>
            </svg>
          </div>
          <div className={`expand-bar ${this.state.isChecked ? 'checked' : ''}`} onClick={this.handleExpand}>
            <p>{this.props.title}</p>
            <ul className='roles'>
              {this.props.role.map(function(role, index){
                return <li className={`${role}`} key={ index }>{roles[role]}</li>;
              })}
            </ul>


          </div>
          <div className="btn">
            <img src={Arrow} alt="" className="arrow" onClick={this.handleExpand} />
          </div>
        </div>
        <div className='body' style={{ display: this.state.isExpanded ? 'block' : 'none' }} >
          {this.props.description.length > 0 &&
          <p>{this.props.description}<br/><br/>Reference:</p>
          }
          {this.props.description.length === 0 &&
          <p>Read More:</p>
          }
          <ul>
            {this.props.links.map((l, index) => <li key={index}><a href={l.href} target="_blank">{l.title}</a></li>)}
          </ul>
        </div>
        <Persist
          name={this.props.section + ":item-" + this.props.id}
          data={this.state}
          onMount={data => this.setState(data)}
        />
      </li>
    )
  }
}

class Section extends React.Component {

  render () {
    return (

        <div>
        {

        this.props.list.map(function(item, index){

            var filtered_list = [];
            item.items.map( function(l, index)
                          {
                            if( ( this.props.controllerSelected  && l.role.includes('controller')  ) ||
                                    ( this.props.processorSelected  && l.role.includes('processor')  ) ||
                                    ( this.props.subjectSelected  && l.role.includes('subject')  )  )

                            {
                                filtered_list.push( l );
                            }

                          }.bind(this)
              )

             if( filtered_list.length == 0)
             {
                return ;
             }
             return   <div className="scrollspy" id={[item.id]} key={index}>
                    <h3>{item.title}</h3>
                    <ul className="checklist">
                      { filtered_list.map( function(l, index)
                          {
                            if( ( this.props.controllerSelected  && l.role.includes('controller')  ) ||
                                    ( this.props.processorSelected  && l.role.includes('processor')  ) ||
                                    ( this.props.subjectSelected  && l.role.includes('subject')  )  )

                            {
                                return <Li {...l} key={index} top={index * 70} section={item.id} />
                            }

                          }.bind(this)
                      )}
                    </ul>
                  </div>

          }.bind(this) )}

        </div>
    )
  }

}

class IndexPage extends React.Component {

  constructor() {
    super()
    this.state = {
      processorSelected: true,
      controllerSelected: true,
      subjectSelected: true
    }
  }
  toggleController = () => {
     this.setState({ controllerSelected : !this.state.controllerSelected } );
  }

  toggleProcessor = () => {
     this.setState({ processorSelected : !this.state.processorSelected } );
  }

  toggleSubject = () => {
    this.setState({ subjectSelected : !this.state.subjectSelected } );
 }

  render () {
    return (
      <div>
        <div className='wrapper'>
          <div className='columns'>
            <Sidebar />
            <div className="col-9">
              <CtaBanner />
              <h1>The GDPR Compliance Checklist</h1>
              <h2 className="description first">Achieving GDPR Compliance shouldn't feel like a struggle.
              This is a basic checklist you can use to harden your GDPR compliancy.</h2>

              <div style={{ marginTop: '50px', textAlign: 'center', border: '1px solid #EEE', padding: '10px', marginBottom: '20px' }}>
                <a href="https://complianceboard.io/" target="_blank" style={{ color: '#777', textDecoration: 'none', fontSize: '14px', lineHeight: '28px' }}>
                  <span style={{ background: '#41b541', borderRadius: '2px', marginTop: '20px', color: 'white', padding: '4px 6px' }}>New</span> Boost customer trust with <b>ComplianceBoard</b>. Your trust center to share your compliance, privacy and security initiatives with your customers.
                </a>
              </div>

              <p className="small description">if your organisation is determining the purpose of the storage or processing of personal information, it is considered a <b>controller</b>. If your organisation stores or processes personal data on behalf of another organisation, it is considered a <b>processor</b>. It is possible for your organisation to have both roles. Use the filter below to view only the relevant checklist items for your organisation.</p>

              <p className="small description">
              This list is far from a legal exhaustive document, it merely tries to help you overcome the struggle.

              <br/><br/>Feel free to <a href="https://github.com/privacyradius/gdpr-checklist" target="_blank">contribute directly</a> on GitHub!
              </p>

              <div className="filter-bar">
                <h3>Select your role:</h3>
                <ul className="selected-three">
                  <li onClick={this.toggleController} className={this.state.controllerSelected ? 'controller' : ''}><h2>Data Controller: I determine why data is processed</h2></li>
                  <li onClick={this.toggleProcessor} className={this.state.processorSelected ? 'processor' : ''}><h2>Data Processor: I store or process data for someone else</h2></li>
                  <li onClick={this.toggleSubject} className={this.state.subjectSelected ? 'subject' : ''}><h2>Data Subject: My data is being stored or processed</h2></li>
                </ul>
              </div>
                { steps.map( (function(s)
                    {
                    return <Section key={s.id} list={[s]} controllerSelected={this.state.controllerSelected} processorSelected={this.state.processorSelected} subjectSelected={this.state.subjectSelected} />
                    }).bind(this)
                    ) }
              <Newsletter />
              <Footer />
              <Disclaimer />
            </div>
          </div>
        </div>
        <Persist
          name={"index-page"}
          data={this.state}
          onMount={data => this.setState(data)}
        />
      </div>
  )}
}

export default IndexPage
