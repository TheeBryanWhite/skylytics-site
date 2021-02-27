import React, {Component} from 'preact'
import {
  EmailField,
  PhoneField,
  TextArea,
  TextField
} from './Slices'

export default class SliceZone extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    props.allSlices.forEach(prop => {
      this.state[prop.id] = { 
        'label': prop.primary.label, 
        'required': prop.primary.required,
        'value':'', 
        'valid': false 
      }
    });
    this.handleValChange = this.handleValChange.bind(this)
  }

  handleValChange(value) {
    this.setState({[value.id]: value})
    console.log(this.state)
  }

  render() {
    const { allSlices } = this.props

    const slice = allSlices.map(slice => {

      const fieldVal = this.state[slice.id].value
      
      switch (slice.slice_type) {
        // These are the API IDs of the slices
        case "text" :
          return <TextField key={slice.id} input={slice} fieldValue={fieldVal} onValChange={this.handleValChange} />
        case "email" :
          return <EmailField key={slice.id} input={slice} fieldValue={fieldVal} onValChange={this.handleValChange} />
        case "phone" :
          return <PhoneField key={slice.id} input={slice} fieldValue={fieldVal} onValChange={this.handleValChange} />
        case "text_area" :
          return <TextArea key={slice.id} input={slice} fieldValue={fieldVal} onValChange={this.handleValChange} />
        default:
        	return null
      }
    })
    return slice
  }
}